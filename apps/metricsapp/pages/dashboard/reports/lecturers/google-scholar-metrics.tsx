import { NextPage } from 'next';
import React, { useEffect } from 'react';
import AppDrawer from '../../../../serverlets/AppDrawer';
import AdminLayout from '../../../../components/AdminLayout';
import { compose } from 'redux';

import AppHeader from '../../../../serverlets/AppHeader';
import Copyright from '../../../../serverlets/Copyright';
import { withAuth } from '@metricsai/metrics-hocs';

import { authSchoolId } from '@metricsai/metrics-hocs';
import {
  hindexByWeight,
  i10indexByWeight,
  loadLecturers,
  loadLecturersRanking,
  loadLecturersStats,
} from '@metricsai/metrics-utils';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
const AuthUserTable = dynamic(
  () => import('../../../../components/DataTables/AuthUserTable'),
  {
    ssr: false,
  }
);

import {
  AuthUserInfo,
  SchoolRank,
  SchoolSettingsType,
  USERGSIRanking,
} from '@metricsai/metrics-interfaces';

import { citationByWeight, getSchoolSettings } from '@metricsai/metrics-utils';

const Dashboard: NextPage = () => {
  const schoolId = authSchoolId();

  const {
    data: lecturers,
    isLoading: isLoadingLecturers,
    isValidating: isValidatingLecturers,
  } = useSWR<AuthUserInfo[]>(
    `/api/lecturers/${schoolId}/list`,
    async () => await loadLecturers(schoolId),
    {
      revalidateOnFocus: true,
    }
  );

  const {
    data: statistics_lecturers,
    isLoading: isLoadingStatistics,
    isValidating: isValidatingStatistics,
  } = useSWR<SchoolRank>(
    `/api/lecturers/${schoolId}/stats`,
    async () => await loadLecturersStats(schoolId),
    {
      revalidateOnFocus: true,
    }
  );

  const {
    data: settings,
    isLoading: isLoadingSettings,
    isValidating: isValidatingSettings,
  } = useSWR<SchoolSettingsType>(
    `/api/schools/${schoolId}/settings`,
    async () => await getSchoolSettings(schoolId),
    {
      revalidateOnFocus: true,
    }
  );

  // filter to recompute the ranking of the lecturers based on the settings of the school usign reduce

  const columns = [
    {
      title: 'ID',
      field: 'id',
      cellStyle: {
        color: 'blue',
        fontWeight: 'bold',
      },
    },
    {
      title: 'Lecturer Name',
      field: 'name',
    },
    {
      title: 'Citations',
      field: 'citations',
      sortable: true,
    },
    {
      title: 'H-Index',
      field: 'hindex',
      sortable: true,
    },
    {
      title: 'i10-H-Index',
      field: 'i10hindex',
      sortable: true,
    },

    {
      title: 'Total',
      field: 'total',
      sortable: true,
    },
  ];

  const [lecturersList, setLecturersList] = React.useState<USERGSIRanking[]>(
    []
  );

  useEffect(() => {
    if (lecturers && settings && statistics_lecturers) {
      setLecturersList(
        lecturers.map((lecturer: AuthUserInfo) => {
          return {
            id: lecturer.username,
            name: `${lecturer.firstname} ${lecturer.lastname}`,
            citations:
              citationByWeight(
                lecturer.citations || 0,
                statistics_lecturers.citations || 0,
                statistics_lecturers.highestCitations || 0,
                settings.citationsWeight
              ) || 0,
            hindex:
              hindexByWeight(
                lecturer.hindex,
                statistics_lecturers.hindex,
                statistics_lecturers.firstPublicationYear,
                settings.hindexWeight
              ) || 0,
            i10hindex:
              i10indexByWeight(
                lecturer.i10hindex,
                statistics_lecturers.i10hindex || 0,
                statistics_lecturers.firstPublicationYear || 0,
                settings.i10hindexWeight || 0
              ) || 0,
            total: lecturer.citations + lecturer.hindex + lecturer.i10hindex,
          };
        })
      );
    }
  }, [lecturers, statistics_lecturers, settings]);

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="wallet-footer flex w-full border-t-0 border-0">
                  <div className="item">
                    <div>
                      <span className="h1">
                        {statistics_lecturers?.citations}
                      </span>
                      <strong>Citations</strong>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <span className="h1">{statistics_lecturers?.hindex}</span>
                      <strong>H-Index</strong>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <span className="h1">
                        {statistics_lecturers?.i10hindex}
                      </span>
                      <strong>i10-H-Index</strong>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <span className="h1">{0}</span>
                      <strong>Total</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wallet-footer"></div>
            </div>
          </div>

          <div className="section pt-1">
            <div className="row ">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="card-box border-1 p-0">
                  <AuthUserTable
                    title="Lecturers Google Scholar Metrics"
                    columns={columns}
                    data={lecturersList}
                    loading={
                      isLoadingStatistics ||
                      isValidatingStatistics ||
                      isLoadingSettings ||
                      isValidatingSettings ||
                      isLoadingLecturers ||
                      isValidatingLecturers
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Dashboard);

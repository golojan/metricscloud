import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import AppDrawer from '../../../../serverlets/AppDrawer';

import AppHeader from '../../../../serverlets/AppHeader';
import Copyright from '../../../../serverlets/Copyright';

import { withAuth } from '@metricsai/metrics-hocs';
import { compose } from 'redux';

import {
  AuthUserInfo,
  GSRanking,
  SchoolSettingsType,
} from '@metricsai/metrics-interfaces';

import { authSchoolId } from '@metricsai/metrics-hocs';
import {
  getSchoolSettings,
  loadLecturers,
  loadLecturersStats,
  citationByWeight,
  hindexByWeight,
  i10indexByWeight,
  totalRanking
} from '@metricsai/metrics-utils';

import useSWR from 'swr';
import AppDashBoardTopMenuScores from '../../../../serverlets/AppDashBoardTopMenuScores';
import AppDashboardTopMenu from '../../../../serverlets/AppDashboardTopMenu';
import { useAtom } from 'jotai';
import {
  schoolSettingsAtom,
  statistLecturersAtom,
} from '@metricsai/metrics-store';
import AuthUserTable from '../../../../components/DataTables/AuthUserTable';

type lFilters = {
  male: boolean;
  female: boolean;
  withPhd: boolean;
  isProfessor: boolean;
};

const ReportPublications: NextPage = () => {

  const schoolId = authSchoolId();
  const [working, setWorking] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const [list, setList] = useState<AuthUserInfo[]>([]);
  const [listScholar, setListScholar] = useState<AuthUserInfo[]>([]);

  const [schoolSettings, setSchoolSettings] = useAtom(schoolSettingsAtom);
  const [statistLecturers, setStatistLecturers] = useAtom(statistLecturersAtom);

  // use SWR to fetch data from the API
  const { data: lecturers, isLoading } = useSWR(
    `/api/lecturers/${schoolId}/ranking`,
    async () => await loadLecturers(schoolId)
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

  const busy = working || isLoadingSettings ||
    isValidatingSettings || isLoading;

  const [filter, setFilter] = useState<lFilters>({
    male: false,
    female: false,
    withPhd: false,
    isProfessor: false,
  });

  useEffect(() => {
    if (lecturers && !busy) {
      setList(lecturers);
      setSchoolSettings(settings);
      if (list) {
        setWorking(true);
        setListScholar(lecturers.map((user) => ({
          firstname: user.firstname,
          lastname: user.lastname,
          citations: citationByWeight(
            user.citations,
            user.totalPublications,
            lecturers,
            settings.citationsWeight
          ).rWeight,
          hindex: hindexByWeight(
            user.hindex,
            user.firstPublicationYear,
            lecturers,
            settings.hindexWeight
          ).rWeight,
          i10hindex: i10indexByWeight(
            user.i10hindex,
            user.firstPublicationYear,
            lecturers,
            settings.i10hindexWeight
          ).rWeight,
          total: totalRanking(
            Number(citationByWeight(
              user.citations,
              user.totalPublications,
              lecturers,
              settings.citationsWeight
            ).rWeight),
            Number(hindexByWeight(
              user.hindex,
              user.firstPublicationYear,
              lecturers,
              settings.hindexWeight
            ).rWeight),
            Number(i10indexByWeight(
              user.i10hindex,
              user.firstPublicationYear,
              lecturers,
              settings.i10hindexWeight
            ).rWeight)
          )
        })));
        setWorking(false);
      }
    }
  }, [lecturers, busy]);


  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <AppDashBoardTopMenuScores />
              <AppDashboardTopMenu />
            </div>
          </div>
          <div className="section pt-1">
            <div className="row ">

              <div className={`col-12 col-md-12 col-lg-12 min-h-screen`}>
                {!busy ? (
                  <AuthUserTable title='Lecturers' data={listScholar} loading={isLoading} />
                ) : (
                  <h1>Loading...</h1>
                )}
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="lecturers" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(ReportPublications);

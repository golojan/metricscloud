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
  totalRanking,
  loadLecturersRanking
} from '@metricsai/metrics-utils';

import useSWR from 'swr';
import AppDashBoardTopMenuScores from '../../../../serverlets/AppDashBoardTopMenuScores';
import AppDashboardTopMenu from '../../../../serverlets/AppDashboardTopMenu';
import { useAtom } from 'jotai';
import {
  schoolSettingsAtom,
  statistLecturersAtom,
} from '@metricsai/metrics-store';
import AuthUserPublication from '../../../../components/DataTables/AuthUserPublication';

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

  // use SWR to fetch data from the API
  const { data: lecturers, isLoading } = useSWR(
    `/api/lecturers/${schoolId}/ranking`,
    async () => await loadLecturersRanking(schoolId)
  );

  const busy = working || isLoading;

  const [filter, setFilter] = useState<lFilters>({
    male: false,
    female: false,
    withPhd: false,
    isProfessor: false,
  });

  useEffect(() => {
    if (lecturers && !busy) {
      setList(lecturers);
      if (list) {
        setWorking(true);
        setListScholar(lecturers.map((user) => ({
          firstname: user.firstname,
          lastname: user.lastname,
          totalPublications: user.totalPublications,
          firstPublicationYear: user.firstPublicationYear,
          lastPublicationYear: user.lastPublicationYear,
          coAuthors: () => {
            const { articles } = user.publications;
            const authors = articles?.author?.name.flatMap(obj => obj.authors.split(','));
            return authors[0];
          }
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
                  <AuthUserPublication title='Lecturers' data={listScholar} loading={isLoading} />
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

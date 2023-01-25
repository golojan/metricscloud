import { NextPage } from 'next';
import React, { useEffect } from 'react';
import AppDrawer from '../../serverlets/AppDrawer';
import AdminLayout from '../../components/AdminLayout';

import {
  faAddressBook,
  faArrowsSpin,
  faBookReader,
  faRainbow,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';

import Link from 'next/link';
import AppHeader from '../../serverlets/AppHeader';
import Copyright from '../../serverlets/Copyright';
import { withAuth } from '@metricsai/metrics-hocs';
import { authSchoolId } from '@metricsai/metrics-hocs';
import SchoolRanking from '../../components/SchoolRanking';
import { SchoolStats } from '@metricsai/metrics-interfaces';
import {
  loadSchoolsStats,
  loadLecturersStats,
  loadStudentsStats,
} from '@metricsai/metrics-utils';

import { Dispatch } from '@metricsai/metrics-store';
import { useDispatch } from 'react-redux';
import AppDashboardTopMenu from '../../serverlets/AppDashboardTopMenu';
import AppDashBoardTopMenuScores from '../../serverlets/AppDashBoardTopMenuScores';

const Dashboard: NextPage = () => {
  const schoolId = authSchoolId();
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    loadLecturersStats(schoolId).then((stats) => {
      dispatch.settings.setRank(stats);
    });
    loadLecturersStats(schoolId).then((stats) => {
      dispatch.lecturers.setStatistics(stats);
    });
    loadStudentsStats(schoolId).then((stats) => {
      dispatch.students.setStatistics(stats);
    });
  }, [
    schoolId,
    dispatch.settings,
    dispatch.lecturers,
    dispatch.students,
  ]);

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <AppDashBoardTopMenuScores />
              <AppDashboardTopMenu />
            </div>
          </div>
          <SchoolRanking schoolId={schoolId} />
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Dashboard);

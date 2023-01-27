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
import { authToken, authlogout } from '@metricsai/metrics-hocs';
import SchoolRanking from '../../components/SchoolRanking';
import AppDashboardTopMenu from '../../serverlets/AppDashboardTopMenu';
import AppDashBoardTopMenuScores from '../../serverlets/AppDashBoardTopMenuScores';

const Dashboard: NextPage = () => {
  const token = authToken();
  useEffect(() => {
    if (!token) {
      authlogout('/auth')
    }
  }, [token])
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
          <SchoolRanking />
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Dashboard);

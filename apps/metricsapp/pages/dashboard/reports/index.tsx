import { NextPage } from 'next';
import React from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { compose } from 'redux';

import {
  faHome,
  faPlus,
  faSchool,
  faSchoolCircleCheck,
  faUserGear,
  faUsersBetweenLines,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import AppAnalytics from '../../../serverlets/AppAnalytics';
import AppSummary from '../../../serverlets/AppSummary';
import { withAuth } from '@metricsai/metrics-hocs';
import AppDrawer from '../../../serverlets/AppDrawer';
import { noAction } from '@metricsai/metrics-utils';

const Reports: NextPage = () => {
  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Ranking Reports & Statistics</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faHome} /> Reports
                  </h1>
                </div>
                <div className="right flex">
                  <Link href="#" className="button" onClick={noAction}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>{' '}
          <AppAnalytics />
          <AppSummary />
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Reports);

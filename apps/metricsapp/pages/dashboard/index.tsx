import { NextPage } from 'next';
import React from 'react';
import AppDrawer from '../../serverlets/AppDrawer';
import AdminLayout from '../../components/AdminLayout';

import { faBriefcase, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';

import Link from 'next/link';
import AppHeader from '../../serverlets/AppHeader';
import Copyright from '../../serverlets/Copyright';
import { withAuthSync } from '../../utils/withAuthSync';
import { useSelector } from 'react-redux';
import { RootState } from '@metricsai/metrics-store';

import SchoolRanking from '../../components/SchoolRanking';
import { withIndicators } from '../../hocs/withIndicators';

const ISchoolRanking = withIndicators(SchoolRanking);

const Dashboard: NextPage = () => {
  const { total, school, busy } = useSelector(
    (state: RootState) => state.settings
  );
  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Total University Ranking</span>
                  <h1 className="total">
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faBriefcase}
                    />{' '}
                    {total}
                  </h1>
                </div>
                <div className="right flex">
                  <Link href="/dashboard/todos" className="button">
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ISchoolRanking schoolId={school._id} isLoading={busy} />
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuthSync)(Dashboard);

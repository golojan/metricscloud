import { NextPage } from 'next';
import React, { useEffect } from 'react';
import AppDrawer from '../../serverlets/AppDrawer';
import { compose } from 'redux';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../serverlets/AppHeader';
import Copyright from '../../serverlets/Copyright';
import { withAuthSync } from '../../utils/withAuthSync';

import AdminLayout from '../../components/AdminLayout';
import DashboardMenu from '../../components/DashboardMenu';

import { Dispatch, RootState } from '@metricsai/metrics-store';
import { useDispatch, useSelector } from 'react-redux';

const ToDos: NextPage = () => {
  const { students, loaded } = useSelector(
    (state: RootState) => state.students
  );
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    if (!loaded) {
    }
  }, [loaded, dispatch.students]);

  return (
    <>
      <AdminLayout>
        <AppHeader isroot={true} />
        <div id="appCapsule">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Cloud Functions</span>
                  <h1 className="total">Prime Intakes: App</h1>
                </div>
                <div className="right flex">
                  <Link href="/dashboard" legacyBehavior>
                    <a className="button">
                      <FontAwesomeIcon icon={faHome} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="row mt-2">
              <DashboardMenu />
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuthSync)(ToDos);

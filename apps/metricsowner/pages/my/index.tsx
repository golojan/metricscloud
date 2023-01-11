import { NextPage } from 'next';
import React, { useState } from 'react';
import AppDrawer from '../../serverlets/AppDrawer';
import OwnerLayout from '../../components/OwnerLayout';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../serverlets/AppHeader';
import Copyright from '../../serverlets/Copyright';
import { withLogon } from './../../utils/withLogon';
import useSWR from 'swr';

import { IndicatorCount } from '@metricsai/metrics-interfaces';
import {
  AccountsMenu,
  IndicatorsMenu,
  SchoolsMenu,
} from '../../components/MyMenu';

const Dashboard: NextPage = () => {
  const { data, isLoading } = useSWR<IndicatorCount>('/api/statistics', (url) =>
    fetch(url).then((r) => r.json())
  );
  return (
    <>
      <OwnerLayout>
        <AppHeader isroot={true} />
        <div id="appCapsule">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">University AI Ranking Engine</span>
                  <h1 className="total">AI Engine</h1>
                </div>
                <div className="right flex">
                  <Link href="#" legacyBehavior>
                    <a className="button">
                      <FontAwesomeIcon icon={faPlus} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section pt-1">
            <div className="row mt-2">
              <div className="col-6 col-sm-12 col-xs-12 col-md-3 col-xl-3 mb-1">
                <div className="stat-box">
                  <div className="title">Schools & Domains</div>
                  <div className="value">
                    <span className="text-primary">{data?.schoolsCount}</span>{' '}
                    Schools
                  </div>
                  <hr className="my-2" />
                  <SchoolsMenu />
                </div>
              </div>
              <div className="col-6 col-sm-12 col-xs-12 col-md-3 col-xl-3 mb-1">
                <div className="stat-box">
                  <div className="title">Ranking Indicators</div>
                  <div className="value">
                    <span className="text-primary">
                      {data?.indicatorsCount}
                    </span>{' '}
                    Indicators
                  </div>
                  <hr className="my-2" />
                  <IndicatorsMenu />
                </div>
              </div>

              <div className="col-6 col-sm-12 col-xs-12 col-md-3 col-xl-3 mb-1">
                <div className="stat-box">
                  <div className="title">Accounts & Admins</div>
                  <div className="value">
                    <span className="text-primary">{data?.accountsCount}</span>{' '}
                    Accounts
                  </div>
                  <hr className="my-2" />
                  <AccountsMenu />
                </div>
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </OwnerLayout>
    </>
  );
};

export default withLogon(Dashboard);

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import OwnerLayout from '../../../components/OwnerLayout';
import AppDrawer from '../../../serverlets/AppDrawer';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { NextPage } from 'next';
import { withLogon } from './../../../utils/withLogon';

import useSWR from 'swr';
import { getIndicators } from '../../../utils/queries';
import { IndicatorInfo } from '@metricsai/metrics-interfaces';
import { IndicatorsMenu } from '../../../components/MyMenu';

const Index: NextPage = () => {
  const { data, isLoading } = useSWR<IndicatorInfo[]>(
    '/api/indicators/list',
    getIndicators
  );

  return (
    <OwnerLayout>
      <AppHeader isroot={false} />
      <div id="appCapsule">
        <div className="section wallet-card-section pt-1">
          <div className="wallet-card">
            <div className="balance">
              <div className="left">
                <div className="title">Rankings and Indicators</div>
                <h1 className="total h1">
                  <span className="text-primary">{data?.length}</span>{' '}
                  Indicators
                </h1>
              </div>
              <div className="right flex">
                <Link href={'/my/indicators/add'} className="button">
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="section pt-1">
          <div className="row mt-2">
            <div className="col-4">
              <div className="stat-box">
                <IndicatorsMenu />
              </div>
            </div>
            <div className="col-8 row">
              <table className="table table-striped table-inverse table-responsive stat-box">
                <thead className="thead-inverse">
                  <tr>
                    <td>SHORTNAME</td>
                    <td>INDICATORS</td>
                    <td>CRITERIA</td>
                    <td>WEIGHT</td>
                    <td>MULITPLIER</td>
                    <td>-</td>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((indicator, idx) => (
                    <tr className="text-[18px]" key={idx}>
                      <td scope="row">{indicator.shortname}</td>
                      <td>{indicator.indicator}</td>
                      <td>{indicator.criteria}</td>
                      <td>{indicator.weight}</td>
                      <td>{indicator.multiplier}</td>
                      <td>
                        <Link
                          href={`/my/indicators/${indicator._id}/edit`}
                          className="text-success mx-2"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/my/indicators/${indicator._id}/delete`}
                          className="text-danger mx-2"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
      <AppDrawer onchat={false} menuitem="dashboard" />
    </OwnerLayout>
  );
};

export default withLogon(Index);

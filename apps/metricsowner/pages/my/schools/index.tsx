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
import { getSchools } from '../../../utils/queries';
import { SchoolInfo } from '@metricsai/metrics-interfaces';
import { SchoolsMenu } from '../../../components/MyMenu';

const Index: NextPage = () => {
  const { data, isLoading } = useSWR<SchoolInfo[]>(
    '/api/schools/list',
    getSchools
  );

  return (
    <OwnerLayout>
      <AppHeader isroot={false} />
      <div id="appCapsule">
        <div className="section wallet-card-section pt-1">
          <div className="wallet-card">
            <div className="balance">
              <div className="left">
                <div className="title">Schools & Domains</div>
                <h1 className="total h1">
                  <span className="text-primary">{data?.length}</span> Schools
                </h1>
              </div>
              <div className="right flex">
                <Link href={'/my/schools/add'} legacyBehavior>
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
            <div className="col-4">
              <div className="stat-box">
                <SchoolsMenu />
              </div>{' '}
            </div>
            <div className="col-8 row">
              <table className="table table-striped table-inverse table-responsive stat-box">
                <thead className="thead-inverse">
                  <tr>
                    <td>SHORT NAME</td>
                    <td>DOMAIN</td>
                    <td>NAME</td>
                    <td>-</td>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((school, idx) => (
                    <tr className="text-[18px]" key={idx}>
                      <td scope="row">{school.shortname}</td>
                      <td>{school.domain}</td>
                      <td>{school.name}</td>
                      <td>
                        <Link
                          href={`/my/schools/${school._id}/edit`}
                          className="text-success mx-2"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/my/schools/${school._id}/delete`}
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

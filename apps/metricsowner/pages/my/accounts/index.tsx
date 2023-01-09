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
import { getAccounts, getDataLists } from '../../../utils/queries';
import { AccountInfo, DataLists } from '@metricsai/metrics-interfaces';
import { AccountsMenu } from '../../../components/MyMenu';

const Index: NextPage = () => {
  const { data: datalist } = useSWR<DataLists>('/api/list', getDataLists);
  const schools = datalist?.schools ? datalist?.schools : [];

  const getSchool = (schoolId: any) => {
    return schools.find((school) => school._id === schoolId)?.shortname;
  };

  const { data, isLoading } = useSWR<AccountInfo[]>(
    '/api/accounts/list',
    getAccounts
  );

  return (
    <OwnerLayout>
      <AppHeader isroot={false} />
      <div id="appCapsule">
        <div className="section wallet-card-section pt-1">
          <div className="wallet-card">
            <div className="balance">
              <div className="left">
                <div className="title">Accounts & Admin</div>
                <h1 className="total h1">
                  <span className="text-primary">{data?.length}</span> Accounts
                </h1>
              </div>
              <div className="right flex">
                <Link href={'/my/ACCOUNTS/add'} className="button">
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="section pt-1">
          <div className="row mt-2">
            <div className="col-3">
              <div className="stat-box">
                <AccountsMenu />
              </div>
            </div>
            <div className="col-9 row">
              {isLoading ? (
                <div className="text-center p-10">
                  <h1>Loading...</h1>
                </div>
              ) : (
                <table className="table table-striped table-inverse table-responsive stat-box">
                  <thead className="thead-inverse">
                    <tr>
                      <td>LASTNAME</td>
                      <td>FIRSTNAME</td>
                      <td>EMAIL</td>
                      <td>SCH</td>
                      <td>KEY</td>
                      <td>-</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((account, idx) => (
                      <tr className="text-[18px]" key={idx}>
                        <td scope="row">{account.lastname}</td>
                        <td>{account.firstname}</td>
                        <td>{account.email}</td>
                        <td>{getSchool(account.schoolid)}</td>
                        <td>{account.passwordKey}</td>
                        <td>
                          <Link
                            href={`/my/accounts/${account._id}/edit`}
                            className="text-success mx-2"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/my/accounts/${account._id}/delete`}
                            className="text-danger mx-2"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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

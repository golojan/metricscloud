import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import OwnerLayout from '../../../components/OwnerLayout';
import AppDrawer from '../../../serverlets/AppDrawer';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { NextPage } from 'next';
import { withLogon } from '../../../utils/withLogon';
import useSWR from 'swr';

import {
  AccountInfo,
  DataLists,
  SchoolInfo,
} from '@metricsai/metrics-interfaces';
import { Dispatch } from '@metricsai/metrics-store';
import { useDispatch } from 'react-redux';
import { AccountsMenu } from '../../../components/MyMenu';
import { genPassword } from '@metricsai/metrics-utils';

const AddIndicator: NextPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const [account, setAccount] = useState<AccountInfo>({
    schoolId: '',
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    mobile: '',
    membership: '',
    role: '',
    passwordKey: genPassword(5),
  });

  const { data, isLoading } = useSWR<DataLists>('/api/list', (url) =>
    fetch(url).then((res) => res.json())
  );

  const addAccount = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.settings.setBusy(true);
    const response = await fetch('/api/accounts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    });
    const _data = await response.json();
    alert(JSON.stringify(_data));
    dispatch.settings.setBusy(false);
  };

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
                  <span className="text-primary">{data?.accounts?.length}</span>{' '}
                  Accounts
                </h1>
              </div>
              <div className="right flex">
                <Link href={'/my/accounts/add'} className="button">
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
                <AccountsMenu />
              </div>
            </div>
            <div className="col-8">
              <form onSubmit={addAccount} className="stat-box">
                <div className="row form-group ">
                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Last Name (Surname)</label>
                    <input
                      type={'text'}
                      className="form-control"
                      placeholder={'Last Name'}
                      value={`${account.lastname}`}
                      required={true}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          lastname: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>First Name</label>
                    <input
                      type={'text'}
                      className="form-control"
                      placeholder={'First Name'}
                      value={`${account.firstname}`}
                      required={true}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          firstname: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Middle Name</label>
                    <input
                      type={'text'}
                      className="form-control"
                      placeholder={'Middle Name'}
                      value={`${account.middlename}`}
                      required={true}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          middlename: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Email Address</label>
                    <input
                      type={'email'}
                      className="form-control"
                      placeholder={'Email Address'}
                      value={`${account.email}`}
                      required={true}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Telephone</label>
                    <input
                      type={'tel'}
                      className="form-control"
                      placeholder={'Telephone'}
                      value={`${account.mobile}`}
                      required={true}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          mobile: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Password</label>
                    <input
                      type={'text'}
                      className="form-control"
                      placeholder={'Password'}
                      value={`${account.passwordKey}`}
                      required={true}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          passwordKey: e.target.value,
                        })
                      }
                    />
                  </div>
                  <hr className="my-2 border border-green-500" />

                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Select School</label>
                    <select
                      className="form-control"
                      required={true}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          schoolId: e.target.value,
                        })
                      }
                    >
                      <option value=""> - Select School - </option>
                      {data?.schools?.map((school, index) => (
                        <option key={index} value={school._id}>
                          {school.name} ({school.shortname})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Account Type</label>
                    <select
                      className="form-control"
                      required={true}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          membership: e.target.value,
                        })
                      }
                    >
                      <option value=""> - Membership Type - </option>
                      {data?.memberships?.map((membership, index) => (
                        <option key={index} value={membership._id}>
                          {membership.membership}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Account Role</label>
                    <select
                      className="form-control"
                      required={true}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value=""> - Membership Type - </option>
                      {data?.roles?.map((role, index) => (
                        <option key={index} value={role._id}>
                          {role.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="my-2 col-12">
                    <button type="submit" className="btn btn-primary">
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
      <AppDrawer onchat={false} menuitem="dashboard" />
    </OwnerLayout>
  );
};

export default withLogon(AddIndicator);

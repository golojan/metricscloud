import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import OwnerLayout from '../../../../components/OwnerLayout';
import AppDrawer from '../../../../serverlets/AppDrawer';
import AppHeader from '../../../../serverlets/AppHeader';
import Copyright from '../../../../serverlets/Copyright';
import { NextPage } from 'next';
import { withLogon } from '../../../../utils/withLogon';
import useSWR from 'swr';

import { AccountInfo, DataLists } from '@metricsai/metrics-interfaces';
import { Dispatch } from '@metricsai/metrics-store';
import { useDispatch } from 'react-redux';
import { AccountsMenu } from '../../../../components/MyMenu';
import { getAccountInfo, getDataLists } from '../../../../utils/queries';
import { genPassword } from '../../../../utils/queries';
import { useRouter } from 'next/router';

const AddIndicator: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const dispatch = useDispatch<Dispatch>();

  const [account, setAccount] = useState<AccountInfo>({
    schoolid: '',
    school: {},
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    mobile: '',
    membership: '',
    role: '',
    passwordKey: genPassword(5),
  });

  useEffect(() => {
    getAccountInfo(token as string)
      .then((thisAccount) => {
        setAccount(thisAccount);
      })
      .catch();
  }, [token]);

  const { data, isLoading } = useSWR<DataLists>('/api/list', getDataLists);

  const editAccount = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.settings.setBusy(true);
    const response = await fetch(`/api/accounts/${token}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    });
    const _data = await response.json();
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
                <div className="title">Rankings and Indicators</div>
                <h1 className="total h1">
                  <span className="text-primary">{data?.accounts?.length}</span>{' '}
                  Indicators
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
              <form onSubmit={editAccount} className="stat-box">
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
                      value={account.schoolid}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          schoolid: e.target.value,
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
                      value={account.accountType}
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
                      value={account.role}
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

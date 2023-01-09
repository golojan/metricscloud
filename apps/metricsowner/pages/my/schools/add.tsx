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

import { SchoolInfo } from '@metricsai/metrics-interfaces';
import { Dispatch } from '@metricsai/metrics-store';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import { getSchools } from '../../../utils/queries';
import { SchoolsMenu } from '../../../components/MyMenu';
import { toast } from 'react-toastify';

const AddSchool: NextPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const [school, setSchool] = useState<SchoolInfo>({
    shortname: '',
    domain: '',
    name: '',
  });

  const { data, isLoading } = useSWR<SchoolInfo[]>(
    '/api/schools/list',
    getSchools
  );

  const addSchool = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.settings.setBusy(true);
    const response = await fetch('/api/schools/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(school),
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
              </div>
            </div>
            <div className="col-8">
              <form onSubmit={addSchool} className="stat-box">
                <div className="row form-group">
                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Short Name</label>
                    <input
                      type={'text'}
                      className="form-control"
                      placeholder={'shortname:(ESUT)'}
                      value={`${school.shortname}`}
                      required={true}
                      onChange={(e) =>
                        setSchool({
                          ...school,
                          shortname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Unique Domain</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={'domain.metrics.ng'}
                      value={`${school.domain}`}
                      required={true}
                      onChange={(e) =>
                        setSchool({ ...school, domain: e.target.value })
                      }
                    />
                  </div>
                  <div className="my-2 col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={'Full Name'}
                      required={true}
                      value={`${school.name}`}
                      onChange={(e) =>
                        setSchool({ ...school, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="my-2 col-12">
                    <button type="submit" className="btn btn-primary">
                      Create School
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

export default withLogon(AddSchool);

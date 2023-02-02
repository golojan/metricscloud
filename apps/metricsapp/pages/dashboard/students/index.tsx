import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import AppDrawer from '../../../serverlets/AppDrawer';
import { faPlus, faUsersBetweenLines, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuth } from '@metricsai/metrics-hocs';
import { compose } from 'redux';
import { authSchoolId } from '@metricsai/metrics-hocs';
import AuthStudentsTable from '../../../components/DataTables/AuthStudentsTable';
import useSWR from 'swr';
import { AuthUserInfo, GSIRanking } from '@metricsai/metrics-interfaces';

type lFilters = {
  male: boolean;
  female: boolean;
  withPhd: boolean;
  isProfessor: boolean;
};

const Lecturers: NextPage = () => {
  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  const schoolId = authSchoolId();
  const { data: students, error, isLoading, isValidating } = useSWR<{ status: boolean, data: AuthUserInfo[] }>(`${apiUri}students/${schoolId}/ranking`, () => fetch(`${apiUri}students/${schoolId}/ranking`).then((res) => res.json()));
  const loading = isValidating || isLoading || error || !students;
  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Manage Students</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faUsersBetweenLines} /> Students
                  </h1>
                </div>
                <div className="right flex">
                  <Link href="#" className="button">
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section pt-1">
            <div className="row ">
              {/* <div className="col-12 col-md-12 col-lg-3 fa-border d-none">
                <div className="card-box border-0">
                  <h2 className="pl-1">
                    Advanced filter
                  </h2><hr />
                  <ul className="listview image-listview text border-0  no-line">
                    <li className="flex-auto">
                      <div className="item">
                        <div className="in">
                          <div className="text-lg">Males</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="maleSwitch"
                              checked={filter.male}
                              onChange={(e) =>
                                setFilter({
                                  ...filter,
                                  male: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="maleSwitch"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="flex-auto">
                      <div className="item">
                        <div className="in">
                          <div className="text-lg">Female</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="femaleSwitch"
                              checked={filter.female}
                              onChange={(e) =>
                                setFilter({
                                  ...filter,
                                  female: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="femaleSwitch"
                            />
                          </div>
                        </div>
                      </div>

                    </li>
                  </ul>
                  <ul className="listview image-listview text no-line">
                    <li className="flex-auto">
                      <div className="item">
                        <div className="in">
                          <div className="text-lg">Professors</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="professorSwitch"
                              checked={filter.isProfessor}
                              onChange={(e) =>
                                setFilter({
                                  ...filter,
                                  isProfessor: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="professorSwitch"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="flex-auto">
                      <div className="item">
                        <div className="in">
                          <div className="text-lg">PHD Holders</div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="withPhdSwitch"
                              checked={filter.withPhd}
                              onChange={(e) =>
                                setFilter({
                                  ...filter,
                                  withPhd: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="withPhdSwitch"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className={`col-12 col-md-12 col-lg-12 min-h-screen`}>
                <AuthStudentsTable title='Manage Students' data={loading ? [] : students.data} loading={loading} />
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="students" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Lecturers);

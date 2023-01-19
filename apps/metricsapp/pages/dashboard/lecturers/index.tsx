import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import AppDrawer from '../../../serverlets/AppDrawer';

import { faPlus, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuth } from '@metricsai/metrics-hocs';
import { compose } from 'redux';
import cookie from 'js-cookie';

import LecturersListBox from '../../../components/LecturersListBox';
import { LecturerInfo } from '@metricsai/metrics-interfaces';
import { Gender } from '@metricsai/metrics-interfaces';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@metricsai/metrics-store';

import useSWR from 'swr';

type lFilters = {
  male: boolean;
  female: boolean;
  withPhd: boolean;
  isProfessor: boolean;
};

const Lecturers: NextPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const [query, setQuery] = useState<string>('');

  const schoolId = cookie.get('schoolId');

  const loadLecturers = async (schoolId: string) => {
    const response = await fetch(`/api/lecturers/${schoolId}/list`);
    const lecturers = await response.json();
    return lecturers.data;
  };

  const {
    data: lecturers,
    error: lError,
    isValidating: lValidation,
  } = useSWR<LecturerInfo[]>(`/api/lecturers/${schoolId}/list`, () =>
    loadLecturers(schoolId)
  );

  const { lecturersCount, list, lecturerId } = useSelector(
    (state: RootState) => state.lecturers
  );

  const [filter, setFilter] = useState<lFilters>({
    male: false,
    female: false,
    withPhd: false,
    isProfessor: false,
  });

  useEffect(() => {
    dispatch.lecturers.setList(lecturers);
  }, [dispatch.lecturers, lecturers]);

  const searchFilter = (q: string) => {
    setQuery(q);
    const newData = lecturers.filter((lecturer: LecturerInfo) => {
      return (
        lecturer.firstname?.toLowerCase().startsWith(q.toLowerCase()) ||
        lecturer.lastname?.toLowerCase().startsWith(q.toLowerCase()) ||
        lecturer.middlename?.toLowerCase().startsWith(q.toLowerCase()) ||
        lecturer.staffNumber?.toString().startsWith(q.toLowerCase())
      );
    });
    dispatch.lecturers.setList(newData);
  };

  const doFilter = (_list: LecturerInfo[], _filter: lFilters) => {
    const newData = _list.filter((_list: LecturerInfo) => {
      return _list.gender?.startsWith(Gender.MALE);
    });
    dispatch.lecturers.setList(newData);
  };

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Manage Lecturers</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faUsersCog} /> Lecturers
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
              <div className="col-12 col-md-12 col-lg-4 fa-border">
                <div className="card-box border-0">
                  <div className="flex justify-center">
                    <div className="w-full">
                      <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                        <input
                          type="search"
                          className="form-control form-control-lg relative flex-auto min-w-0 block w-full p-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder={`Search [${lecturersCount}] records...`}
                          aria-label="Search"
                          aria-describedby="button-addon2"
                          onChange={(e) => searchFilter(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="pl-1">
                    Found {list.length} record for {query}...
                  </h4>
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
              </div>
              <div className={`col-12 col-md-12 col-lg-8 min-h-screen`}>
                {/* <LecturersListBox lecturers={list} /> */}
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="lecturers" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Lecturers);

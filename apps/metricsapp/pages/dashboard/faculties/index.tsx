import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import AppDrawer from '../../../serverlets/AppDrawer';

import { faPlus, faUsersBetweenLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuthSync } from '../../../utils/withAuthSync';
import { compose } from 'redux';

import { FacultiesInfo } from '@metricsai/metrics-interfaces';

//Get all faculties from the faculties collection api
const getFaculties = async () => {
  const result = await fetch('/api/faculties/list');
  const { status, data } = await result.json();
  if (status) {
    return data;
  } else {
    return {};
  }
};


const Faculties: NextPage = () => {
  const [query, setQuery] = useState<string>('');
  const [list, setList] = useState<FacultiesInfo[]>([]);

  const [faculties, setFaculties] = useState<FacultiesInfo[]>([]);
  // const [facultyId, setFacultyId] = useState<string>('');

  useEffect(() => {
    getFaculties().then((res) => {
      setFaculties(res);
      setList(res);
    });
  }, []);

  const searchFilter = (q: string) => {
    setQuery(q);
    const newData = faculties.filter((faculty: FacultiesInfo) => {
      return (
        faculty.name?.toLowerCase().includes(q.toLowerCase()) ||
        faculty.description?.toLowerCase().includes(q.toLowerCase())
      );
    });
    setList(newData);
  };

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Manage Faculties</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faUsersBetweenLines} /> Faculties
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
                          placeholder={`Search [${faculties.length}] records...`}
                          aria-label="Search"
                          aria-describedby="button-addon2"
                          onChange={(e) => searchFilter(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="pl-1">
                    Found {list.length} faculties in record for{' '}
                    {query ? query : 'all records'}
                  </h4>
                  <hr />
                  {list.map((faculty)=><>
                  <h1>eieee</h1>
                  </>)}
                </div>
              </div>
              <div className={`col-12 col-md-12 col-lg-4 fa-border`}>
                <div className="card-box border-0">{faculties.length}</div>
              </div>
              <div className={`col-12 col-md-12 col-lg-4 min-h-screen`}>
                <div className="card-box border-0"></div>
                {/* <StudentsListBox students={list} /> */}
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="faculties" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuthSync)(Faculties);

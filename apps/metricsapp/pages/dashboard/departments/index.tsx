import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import AppDrawer from '../../../serverlets/AppDrawer';

import {
  faCheck,
  faDeleteLeft,
  faEdit,
  faPlus,
  faSchoolCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { authSchoolId, withAuth } from '@metricsai/metrics-hocs';
import { compose } from 'redux';

// use virtuozzo api to get faculties and departments
import { Virtuoso } from 'react-virtuoso';

import {
  DepartmentsInfo,
  SCHDepartment,
  SCHFaculty,
} from '@metricsai/metrics-interfaces';
import {
  loadFaculties,
  listDepartments,
  loadFacultyDepartments,
} from '@metricsai/metrics-utils';

const Departments: NextPage = () => {
  const [done, setDone] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [list, setList] = useState<DepartmentsInfo[]>([]);
  const [departments, setDepartments] = useState<DepartmentsInfo[]>([]);

  const [schoolFaculties, setSchoolFaculties] = useState<SCHFaculty[]>([]);
  const [schoolDepartments, setSchoolDepartments] = useState<SCHDepartment[]>(
    []
  );

  const schoolId = authSchoolId();

  const [department, setDepartment] = useState<SCHDepartment>({
    schoolId: schoolId,
  });

  // to hold selected faculty info
  const [facultyId, setFacultyId] = useState<string>('');
  const [departmentId, setDepartmentId] = useState<string>('');

  useEffect(() => {
    loadFaculties(schoolId).then((fres) => {
      setSchoolFaculties(fres);
    });
    listDepartments().then((res) => {
      setDepartments(res);
      setList(res);
    });
    loadFacultyDepartments(schoolId, facultyId).then((fres) => {
      setSchoolDepartments(fres);
    });
  }, [done, schoolId, facultyId]);

  const getSchoolFacultyInfo = (facultyId: string) => {
    const faculty = schoolFaculties.find(
      (faculty) => faculty.facultyId === facultyId
    );
    return faculty;
  };

  const getDepartmentInfo = (departmentId: string) => {
    const department = departments.find(
      (department) => department._id === departmentId
    );
    return department;
  };

  const getSchoolDepartmentInfo = (departmentId: string) => {
    const department = schoolDepartments.find(
      (department) => department.departmentId === departmentId
    );
    return department;
  };

  const searchFilter = (q: string) => {
    setQuery(q);
    const newData = departments.filter((department: DepartmentsInfo) => {
      return (
        department.name?.toLowerCase().includes(q.toLowerCase()) ||
        department.description?.toLowerCase().includes(q.toLowerCase())
      );
    });
    setList(newData);
  };

  const doSetFaculty = (e: React.SyntheticEvent, facultyId: string) => {
    e.preventDefault();
    setFacultyId(facultyId);
  };

  // add to school faculties//
  const removeFromSchoolDepartments = async (
    e: React.SyntheticEvent,
    facultyId: string,
    departmentId: string
  ) => {
    e.preventDefault();
    setDone(true);
    const result = await fetch(
      `/api/departments/${schoolId}/faculties/${facultyId}/departments/${departmentId}/removeDepartment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          departmentId: departmentId,
        }),
      }
    );
    const { status, data } = await result.json();
    if (status) {
      console.log(data);
    } else {
      console.log(data);
    }
    setDone(false);
  };

  // add to school departments//
  const addToSchoolDepartments = async (
    e: React.SyntheticEvent,
    departmentId: string
  ) => {
    e.preventDefault();
    setDone(true);
    const result = await fetch(`/api/departments/${schoolId}/addDepartment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        facultyId: facultyId,
        departmentId: departmentId,
        departmentName: getDepartmentInfo(departmentId).name,
        departmentCode: getDepartmentInfo(departmentId)?.shortname,
        departmentDescription: getDepartmentInfo(departmentId)?.description,
      }),
    });
    const { status, data } = await result.json();
    if (status) {
      console.log(data);
    } else {
      console.log(data);
    }
    setDone(false);
  };

  const isDepartmentInSchool = (departmentId: string) => {
    const department = schoolDepartments.find(
      (department) => department.departmentId === departmentId
    );
    return department ? true : false;
  };

  const updateDepartment = (e: React.SyntheticEvent, departmentId: string) => {
    e.preventDefault();
    setDepartmentId(departmentId);
    const xdepartment = getSchoolDepartmentInfo(departmentId);
    setDepartment({
      _id: xdepartment?._id,
      facultyId: facultyId,
      schoolId: schoolId,
      departmentId: xdepartment?.departmentId,
      departmentName: xdepartment?.departmentName,
      departmentCode: xdepartment?.departmentCode,
      departmentDescription: xdepartment?.departmentDescription
        ? xdepartment?.departmentDescription
        : '',
    });
  };

  const saveDepartment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDone(true);
    if (department._id) {
      const result = await fetch(
        `/api/departments/${schoolId}/updateDepartment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...department,
          }),
        }
      );
      const { status, data } = await result.json();
      if (status) {
        console.log(data);
      } else {
        console.log(data);
      }
    } else {
      const result = await fetch(`/api/departments/${schoolId}/addDepartment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...department,
        }),
      });
      const { status, data } = await result.json();
      if (status) {
        console.log(data);
      } else {
        console.log(data);
      }
    }
    setDone(false);
  };

  const doNewDepartment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDepartment({
      schoolId: schoolId,
      facultyId: facultyId,
      departmentId: '',
      departmentName: '',
      departmentCode: '',
      departmentDescription: '',
    });
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
                  <span className="title">Manage Departments</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faSchoolCircleCheck} /> Departments
                  </h1>
                </div>
                <div className="right flex">
                  <Link
                    href="#"
                    className="button"
                    onClick={(e) => doNewDepartment(e)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="section pt-1">
            <div className="row ">
              <div className="col-12 col-md-12 col-lg-3 fa-border">
                <div className="card-box border-1">
                  <h1 className="mb-2">
                    School Faculties <br />
                    <small>All registered faculties.</small>
                  </h1>

                  <Virtuoso
                    style={{ height: '400px' }}
                    totalCount={schoolFaculties.length}
                    data={schoolFaculties}
                    itemContent={(index, schFaculty) => (
                      <>
                        <div
                          className="w-full my-1 p-1 bg-gray-300"
                          key={index}
                        >
                          <Link
                            className="float-right mx-2 btn btn-primary"
                            href={`#`}
                            onClick={(e) =>
                              doSetFaculty(e, schFaculty?.facultyId)
                            }
                          >
                            <FontAwesomeIcon className="" icon={faCheck} />
                          </Link>
                          <div className="flex justify-between">
                            <div className="flex">
                              <div className="flex flex-col">
                                <h4 className="text-lg font-bold">
                                  {schFaculty?.facultyName} <span>({0})</span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className={`col-12 col-md-12 col-lg-3 fa-border`}>
                <div className="card-box border-0">
                  {facultyId ? (
                    <>
                      <h1 className="mb-2">
                        <span className="text-red-500">|</span>{' '}
                        {getSchoolFacultyInfo(facultyId).facultyName}
                        <hr className="my-2" />
                      </h1>
                    </>
                  ) : (
                    <>
                      <h1 className="mb-2">
                        <span className="text-red-500">|</span>{' '}
                        <small> .... select a faculty</small>
                        <hr className="my-2" />
                      </h1>
                    </>
                  )}
                  <div className="flex justify-center">
                    <div className="w-full">
                      <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                        <input
                          type="search"
                          className="form-control form-control-lg mb-1 relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder={`Search [${list.length}] records...`}
                          aria-label="Search"
                          aria-describedby="button-addon2"
                          onChange={(e) => searchFilter(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="pl-1">
                    Found {list.length} departments in record for{' '}
                    {query ? query : 'all.'}
                  </h4>
                  <hr className="my-2" />
                  <Virtuoso
                    style={{ height: '400px' }}
                    totalCount={list.length}
                    data={list}
                    itemContent={(index, department) => (
                      <>
                        {!isDepartmentInSchool(department._id) && facultyId ? (
                          <>
                            <div
                              className="w-full my-1 p-1 bg-gray-300 rounded-1"
                              key={index}
                            >
                              <Link
                                className="float-right btn btn-primary"
                                href={`#`}
                                onClick={(e) =>
                                  addToSchoolDepartments(e, department._id)
                                }
                              >
                                <FontAwesomeIcon className="" icon={faPlus} />
                              </Link>
                              <div className="flex justify-between">
                                <div className="flex">
                                  <div className="flex flex-col">
                                    <h4 className="text-lg font-bold">
                                      {department.name}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-3 fa-border">
                <div className="card-box border-1">
                  <h1 className="mb-2">
                    School Departments <br />
                    <small>Registered departments.</small>
                  </h1>

                  <Virtuoso
                    style={{ height: '400px' }}
                    totalCount={schoolDepartments.length}
                    data={schoolDepartments}
                    itemContent={(index, schDepartment) => (
                      <>
                        <div
                          className="w-full my-1 p-1 bg-gray-300"
                          key={index}
                        >
                          <Link
                            className="float-right mx-2  btn btn-danger"
                            href={`#`}
                            onClick={(e) =>
                              removeFromSchoolDepartments(
                                e,
                                schDepartment.facultyId,
                                schDepartment.departmentId
                              )
                            }
                          >
                            <FontAwesomeIcon className="" icon={faDeleteLeft} />
                          </Link>
                          <Link
                            className="float-right mx-2 btn btn-primary"
                            href={`#`}
                            onClick={(e) =>
                              updateDepartment(e, schDepartment?.departmentId)
                            }
                          >
                            <FontAwesomeIcon className="" icon={faEdit} />
                          </Link>
                          <div className="flex justify-between">
                            <div className="flex">
                              <div className="flex flex-col">
                                <h4 className="text-lg font-bold">
                                  {schDepartment?.departmentName}{' '}
                                  <span>({0})</span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className={`col-12 col-md-12 col-lg-3 min-h-screen`}>
                <form onSubmit={saveDepartment}>
                  <div className="card-box border-0">
                    {department._id ? (
                      <>
                        <h1 className="mb-2">
                          Edit Department <br />
                          <small>
                            Department details.
                            <hr className="my-2" />
                          </small>
                        </h1>
                      </>
                    ) : (
                      <>
                        <h1 className="mb-2">
                          Create Department <br />
                          <small>
                            Department details.
                            <hr className="my-2" />
                          </small>
                        </h1>
                      </>
                    )}
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="text-xl" htmlFor="departmentName">
                          Name
                        </label>
                        <textarea
                          className="form-control form-control-lg"
                          value={department.departmentName}
                          disabled={facultyId ? false : true}
                          onChange={(e) =>
                            setDepartment({
                              ...department,
                              departmentName: e.target.value,
                            })
                          }
                        />
                        <i className="clear-input show d-block">
                          <FontAwesomeIcon className="" icon={faEdit} />
                        </i>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="text-xl" htmlFor="departmentCode">
                          Code/Short Name
                        </label>
                        <input
                          type="text"
                          disabled={facultyId ? false : true}
                          className="form-control form-control-lg"
                          value={department.departmentCode}
                          onChange={(e) =>
                            setDepartment({
                              ...department,
                              departmentCode: e.target.value,
                            })
                          }
                        />
                        <i className="clear-input show d-block">
                          <FontAwesomeIcon className="" icon={faEdit} />
                        </i>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label
                          className="text-xl"
                          htmlFor="departmentDescription"
                        >
                          Description
                        </label>
                        <textarea
                          className="form-control form-control-lg"
                          disabled={facultyId ? false : true}
                          value={department.departmentDescription}
                          onChange={(e) =>
                            setDepartment({
                              ...department,
                              departmentDescription: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <button
                          className="btn btn-primary btn-block btn-lg"
                          disabled={facultyId ? false : true}
                        >
                          {department._id ? (
                            <>
                              <FontAwesomeIcon className="mr-2" icon={faEdit} />{' '}
                              Update Department
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon className="mr-2" icon={faPlus} />{' '}
                              Create Department
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {/* <StudentsListBox students={list} /> */}
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="departments" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Departments);

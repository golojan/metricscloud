import React from 'react';
import { RootState } from '@metricsai/metrics-store';

import { useSelector } from 'react-redux';

function AppAnalytics() {
  const { studentsCount, students } = useSelector(
    (state: RootState) => state.students
  );
  const { lecturersCount, lecturers } = useSelector(
    (state: RootState) => state.lecturers
  );
  const { facultiesCount, faculties } = useSelector(
    (state: RootState) => state.faculties
  );
  const { departmentsCount, departments } = useSelector(
    (state: RootState) => state.departments
  );

  return (
    <>
      <div className="section">
        <div className="row mt-1">
          <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 my-1">
            <div className="stat-box">
              <div className="title">
                <div className="float-right absolute top-2 text-center right-4  px-3 text-gray-600">
                  <strong className="h6 font-extrabold">
                    {facultiesCount}
                  </strong>{' '}
                  <span className="hidden xl:inline xxl:inline lg:inline md:inline">
                    Faculties
                  </span>
                </div>
                <strong className="text-black h5">FACULTIES</strong> - Analytics
                <div className="row mt-2 relative max-h-[150px] overflow-y-scroll border p-2 rounded bg-gray-100">
                  <table className="table table-striped table-inverse table-responsive table-condensed">
                    <thead className="thead-inverse">
                      <tr>
                        <th>FACULTIES</th>
                        <th>G.S PRESENCE.</th>
                        <th>CITATION.</th>
                        <th>H-INDEX.</th>
                        <th>I10-INDEX.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faculties.map((faculty, index) => (
                        <>
                          <tr>
                            <td scope="row">{faculty.name}</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 my-1">
            <div className="stat-box">
              <div className="title">
                <div className="float-right absolute top-2 text-center right-4  px-3 text-gray-600">
                  <strong className="h6 font-extrabold">
                    {departmentsCount}
                  </strong>{' '}
                  <span className="hidden xl:inline xxl:inline lg:inline md:inline">
                    Departments
                  </span>
                </div>
                <strong className="text-black h5">DEPARTMENTS</strong> -
                Analytics
                <div className="row mt-2 relative max-h-[150px] overflow-y-scroll border p-2 rounded bg-gray-100">
                  <table className="table table-striped table-inverse table-responsive table-condensed">
                    <thead className="thead-inverse">
                      <tr>
                        <th>DEPARTMENTS</th>
                        <th>G.S PRESENCE.</th>
                        <th>CITATION.</th>
                        <th>H-INDEX.</th>
                        <th>I10-INDEX.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((department, index) => (
                        <>
                          <tr>
                            <td scope="row">{department.name}</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 my-1">
            <div className="stat-box">
              <div className="title">
                <div className="float-right absolute top-2 text-center right-4  px-3 text-gray-600">
                  <strong className="h6 font-extrabold">
                    {lecturersCount}
                  </strong>{' '}
                  <span className="hidden xl:inline xxl:inline lg:inline md:inline">
                    Lecturers
                  </span>
                </div>
                <strong className="text-black h5">LECTURERS</strong> - Analytics
                <div className="row mt-2 relative max-h-[150px] overflow-y-scroll border p-2 rounded bg-gray-100">
                  <table className="table table-striped table-inverse text-black table-responsive table-condensed">
                    <thead className="thead-inverse">
                      <tr>
                        <th>LECTURERS (NAME)</th>
                        <th>G.S PRESENCE.</th>
                        <th>CITATION.</th>
                        <th>H-INDEX.</th>
                        <th>I10-INDEX.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lecturers.map((lecturer, index) => (
                        <>
                          <tr>
                            <td scope="row text-black font-bold">
                              <span className="text-md text-black">
                                {lecturer.lastname}
                              </span>
                              , {lecturer.firstname}
                            </td>
                            <td>{lecturer.googlePresence}</td>
                            <td>{lecturer.citations}</td>
                            <td>{lecturer.hindex}</td>
                            <td>{lecturer.i10hindex}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>{' '}
              </div>
            </div>
          </div>
          <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 my-1">
            <div className="stat-box">
              <div className="title">
                <div className="float-right absolute top-2 text-center right-4  px-3 text-gray-600">
                  <strong className="h6 font-extrabold">{studentsCount}</strong>{' '}
                  <span className="hidden xl:inline xxl:inline lg:inline md:inline">
                    Students
                  </span>
                </div>
                <strong className="text-black h5">STUDENTS</strong> - Analytics
                <div className="row mt-2 relative max-h-[150px] overflow-y-scroll border p-2 rounded bg-gray-100">
                  <table className="table table-striped table-inverse table-responsive table-condensed">
                    <thead className="thead-inverse">
                      <tr>
                        <th className=" text-black font-extrabold">STUDENTS</th>
                        <th>G.S PRESENCE.</th>
                        <th>CITATION.</th>
                        <th>H-INDEX.</th>
                        <th>I10-INDEX.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index}>
                          <td scope="row text-black font-bold">
                            <span className="text-md text-black">
                              {student.lastname}
                            </span>
                            , {student.firstname}
                          </td>
                          <td>{student.googlePresence}</td>
                          <td>{student.citations}</td>
                          <td>{student.hindex}</td>
                          <td>{student.i10hindex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>{' '}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 my-1">
            <div className="stat-box">
              <div className="title">
                <div className="float-right absolute top-2 text-center right-4  px-3 text-gray-600">
                  <strong className="h6 font-extrabold">{0}</strong>{' '}
                  <span className="hidden xl:inline xxl:inline lg:inline md:inline">
                    Regular Staff
                  </span>
                </div>
                <strong className="text-black h5">NON-ACADEMIC STAFF</strong> -
                Analytics
                <div className="row mt-2"></div>
              </div>
            </div>
          </div>
          <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 my-1">
            <div className="stat-box">
              <div className="title">
                <strong className="text-black h5">WEBSITE & PORTALS</strong> -
                Analytics
                <div className="row mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppAnalytics;

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dispatch, RootState } from '@metricsai/metrics-store';
import { useDispatch, useSelector } from 'react-redux';
import Busy from './Busy';
import {
  DepartmentsInfo,
  FacultiesInfo,
  FakerLecturer,
  FakerStudent,Gender, LecturerType, StudentType
} from "@metricsai/metrics-interfaces";

import CounterTick from './CounterTick';

const DashboardMenu = () => {
  const { domain } = useSelector((state: RootState) => state.settings);
  // [+] //
  const [newDepartment, setNewDepartment] = useState<DepartmentsInfo>({
    domain: domain,
    name: '',
    accredited: false,
  });
  const [newFaculty, setNewFaculty] = useState<FacultiesInfo>({
    domain: domain,
    name: '',
  });
  const { sBusy, studentsCount } = useSelector(
    (state: RootState) => state.students
  );
  const { lBusy, lecturersCount } = useSelector(
    (state: RootState) => state.lecturers
  );
  const { fBusy, facultiesCount, faculties } = useSelector(
    (state: RootState) => state.faculties
  );
  const { dBusy, departmentsCount, departments } = useSelector(
    (state: RootState) => state.departments
  );
  // [+] //

  const [newStudentDepart, setNewStudentDepart] = useState<string>('');
  const [newLecturerDepart, setNewLecturerDepart] = useState<string>('');

  const dispatch = useDispatch<Dispatch>();
  const addStudent = async ({
    sex = Gender.NONE,
    type = StudentType.LOCAL,
    challanged = false,
  }: FakerStudent) => {
    if (!newStudentDepart) {
      alert('No department selected');
      return false;
    }
    await dispatch.students.addFakeStudent({
      sex: sex,
      type: type,
      challanged: challanged,
      departmentId: newStudentDepart,
    });
  };
  const addLecturer = async ({
    sex = Gender.NONE,
    type = LecturerType.LOCAL,
    isprofessor = false,
    isfullprofessor = false,
    adjunct = false,
  }: FakerLecturer) => {
    if (!newLecturerDepart) {
      alert('No department selected');
      return false;
    }
    await dispatch.lecturers.addFakeLecturer({
      sex: sex,
      type: type,
      isprofessor: isprofessor,
      isfullprofessor: isfullprofessor,
      adjunct: adjunct,
      departmentId: newStudentDepart,
    });
  };

  const facultyRef = useRef(null);
  const departmentRef = useRef(null);

  const createNewFaculty = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.faculties.addFaculty(newFaculty);
    setNewFaculty({ ...newFaculty, name: '' });
  };

  const createNewDepartment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.departments.addDepartment(newDepartment);
    setNewDepartment({ ...newDepartment, name: '' });
  };

  return (
    <>
      <div className="col-12 col-md-4 col-sm-12 col-lg-4 mb-2">
        <div className="stat-box">
          {sBusy ? <Busy /> : <CounterTick count={studentsCount} />}
          <div className="title">
            <strong className="text-black">STUDENTS</strong> (Male & Female)
          </div>
          <hr className="my-1" />

          <div className="form-group basic">
            <div className="input-wrapper">
              <label className="my-0">Choose Department</label>
              <select
                required={true}
                className="form-control"
                onChange={(e) => setNewStudentDepart(e.target.value)}
              >
                {departments.map((dep, index) => (
                  <option key={index} value={dep._id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Link
            href="#"
            onClick={() =>
              addStudent({
                sex: Gender.MALE,
                type: StudentType.LOCAL,
                challanged: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> Local Student (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addStudent({
                sex: Gender.FEMALE,
                type: StudentType.LOCAL,
                challanged: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> Local Student (Female)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addStudent({
                sex: Gender.MALE,
                type: StudentType.INTERNATIONAL,
                challanged: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> International Student (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addStudent({
                sex: Gender.FEMALE,
                type: StudentType.INTERNATIONAL,
                challanged: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> International Student (Female)
            </div>
          </Link>
          <hr className="my-1" />
          <Link
            href="#"
            onClick={() =>
              addStudent({
                sex: Gender.MALE,
                type: StudentType.INTERNATIONAL,
                challanged: true,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> Physically Challanged Student
              (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addStudent({
                sex: Gender.FEMALE,
                type: StudentType.LOCAL,
                challanged: true,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> Physically Challanged Student
              (Female)
            </div>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-4 col-sm-12 col-lg-4 mb-2">
        <div className="stat-box">
          {lBusy ? <Busy /> : <CounterTick count={lecturersCount} />}
          <div className="title">
            <strong className="text-black">LECTURERS</strong> (Male & Female)
          </div>
          <hr className="my-1" />
          <div className="form-group basic">
            <div className="input-wrapper">
              <label className="my-0">Choose Department</label>
              <select
                required={true}
                className="form-control"
                onChange={(e) => setNewLecturerDepart(e.target.value)}
              >
                {departments.map((dep, index) => (
                  <option key={index} value={dep._id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
          </div>{' '}
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.LOCAL,
                isprofessor: false,
                isfullprofessor: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> Local Lecturer (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.LOCAL,
                isprofessor: false,
                isfullprofessor: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> Local Lecturer (Female)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.INTERNATIONAL,
                isprofessor: false,
                isfullprofessor: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> International Lecturer (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.INTERNATIONAL,
                isprofessor: false,
                isfullprofessor: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> International Lecturer (Female)
            </div>
          </Link>
          <hr className="my-1" />
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.LOCAL,
                adjunct: true,
              })
            }
          >
            <div className="text-green-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Adjunct Local Lecturer (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.LOCAL,
                adjunct: true,
              })
            }
          >
            <div className="text-green-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Adjunct Local Lecturer (Female)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.INTERNATIONAL,
                adjunct: true,
              })
            }
          >
            <div className="text-green-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Adjunct International Lecturer
              (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.INTERNATIONAL,
                adjunct: true,
              })
            }
          >
            <div className="text-green-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Adjunct International Lecturer
              (Female)
            </div>
          </Link>
          <hr className="my-1" />
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.LOCAL,
                isprofessor: true,
                isfullprofessor: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> Local Professor (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.LOCAL,
                isprofessor: true,
                isfullprofessor: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> Local Professor (Female)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.INTERNATIONAL,
                isprofessor: true,
                isfullprofessor: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> International Professor (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.INTERNATIONAL,
                isprofessor: true,
                isfullprofessor: false,
              })
            }
          >
            <div className="w-full">
              <FontAwesomeIcon icon={faPlus} /> International Professor (Female)
            </div>
          </Link>
          <hr className="my-1" />
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.LOCAL,
                isprofessor: true,
                isfullprofessor: true,
              })
            }
          >
            <div className="text-red-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Full Local Professor (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.LOCAL,
                isprofessor: true,
                isfullprofessor: true,
              })
            }
          >
            <div className="text-red-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Full Local Professor (Female)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.INTERNATIONAL,
                isprofessor: true,
                isfullprofessor: true,
              })
            }
          >
            <div className="text-red-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Full International Professor
              (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.INTERNATIONAL,
                isprofessor: true,
                isfullprofessor: true,
              })
            }
          >
            <div className="text-red-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Full International Professor
              (Female)
            </div>
          </Link>
          <hr className="my-1" />
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.LOCAL,
                isprofessor: true,
                isfullprofessor: true,
                adjunct: true,
              })
            }
          >
            <div className="text-green-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Adjunct Local Professor (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.LOCAL,
                isprofessor: true,
                isfullprofessor: true,
                adjunct: true,
              })
            }
          >
            <div className="text-green-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Adjunct Local Professor (Female)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.MALE,
                type: LecturerType.INTERNATIONAL,
                isprofessor: true,
                isfullprofessor: true,
                adjunct: true,
              })
            }
          >
            <div className="text-green-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Adjunct International Professor
              (Male)
            </div>
          </Link>
          <Link
            href="#"
            onClick={() =>
              addLecturer({
                sex: Gender.FEMALE,
                type: LecturerType.INTERNATIONAL,
                isprofessor: true,
                isfullprofessor: true,
                adjunct: true,
              })
            }
          >
            <div className="text-green-700 w-full">
              <FontAwesomeIcon icon={faPlus} /> Adjunct International Professor
              (Female)
            </div>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-4 col-sm-12 col-lg-4 mb-2">
        <div className="stat-box mb-2">
          {dBusy ? <Busy /> : <CounterTick count={departmentsCount} />}
          <div className="title">
            <strong className="text-black">DEPARTMENTS</strong> (Accredited &
            Non-Accredited)
          </div>
          <hr />

          <div className="form-group basic">
            <form onSubmit={createNewDepartment}>
              <div className="input-wrapper">
                <label className="my-0">Choose Faculty</label>
                <select
                  required={true}
                  className="form-control"
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      facultyId: e.target.value,
                    })
                  }
                >
                  {faculties.map((fac, index) => (
                    <option key={index} value={fac._id}>
                      {fac.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control"
                  ref={facultyRef}
                  required={true}
                  autoComplete={'off'}
                  placeholder="Name of Department"
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      name: e.target.value,
                    })
                  }
                />
                <div className="form-check form-switch ms-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        accredited: e.target.checked,
                      })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="SwitchCheckDefault3"
                  >
                    This department is Accredited
                  </label>
                </div>

                <button type="submit" className="btn btn-primary mt-2">
                  <FontAwesomeIcon icon={faPlus} /> Add Department
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="stat-box">
          {fBusy ? <Busy /> : <CounterTick count={facultiesCount} />}
          <div className="title">
            <strong className="text-black">FACULTIES</strong>
          </div>
          <hr />

          <div className="form-group basic">
            <form onSubmit={createNewFaculty}>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-control"
                  ref={departmentRef}
                  required={true}
                  autoComplete={'off'}
                  placeholder=" Name of Faculty"
                  onChange={(e) =>
                    setNewFaculty({ ...newFaculty, name: e.target.value })
                  }
                />
                <button type="submit" className="btn btn-primary mt-2">
                  <FontAwesomeIcon icon={faPlus} /> Add Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardMenu;

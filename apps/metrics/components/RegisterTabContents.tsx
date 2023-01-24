import React, { useRef, RefObject, useState, useEffect } from 'react';
import { cloudLogin } from '@metricsai/metrics-hocs';
import {
  AccountTypes,
  DepartmentsInfo,
  FacultiesInfo,
  Gender,
  SchoolInfo,
} from '@metricsai/metrics-interfaces';
import validator from 'validator';
import { hasSpacialChars } from '@metricsai/metrics-utils';
import Select from 'react-select';
import { toast } from 'react-toastify';
import useSWR from 'swr';

function RegisterTabContents() {
  //
  const [, setUnState] = useState(false);
  const [, setEmState] = useState(false);

  const [unError, setUnError] = useState<string>('');
  const [emError, setEmError] = useState<string>('');
  //

  const { data: schoolData } = useSWR('/api/schools/list', (url) =>
    fetch(url).then((res) => res.json())
  );

  // Schools options for react-select
  const schools: SchoolInfo[] = schoolData?.schools ? schoolData.schools : [];
  const schoolOptions = schools.map((school: SchoolInfo) => ({
    value: school._id,
    label: school.name,
  }));

  const usernameRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const buttonRef: RefObject<HTMLButtonElement> =
    useRef<HTMLButtonElement>(null);

  const emailRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const minUsernameLength = process.env.NEXT_PUBLIC_MIN_USERNAME_LENGTH || 5;

  const [register, setRegister] = React.useState({
    username: '',
    accountType: AccountTypes.ALUMNI as string,
    firstname: '',
    lastname: '',
    gender: '',
    birthday: '',
    email: '',
    password: '',
    confirmpassword: '',
    schoolId: '',
    facultyId: '',
    departmentId: '',
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/accounts/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(register),
    });
    const { status, token } = await response.json();
    if (status) {
      toast.success(`Account created successfully, logging you in...`, {
        toastId: 'register-account-success',
      });
      cloudLogin(token);
    } else {
      toast.error(
        `Account registration failed. Server may be having issues, try again after some time.`,
        {
          toastId: 'register-account-success',
        }
      );
    }
  };

  const busyURef = () => {
    setUnError('Checking...');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control rounded-5 border-5 bg-blue-100 focus:bg-blue-100';
      usernameRef.current.disabled = true;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const wrongURef = () => {
    setUnError('Username is invalid.');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control rounded-5 border-5 border-red-500  bg-red-200';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };
  const rightURef = () => {
    setUnError('');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control rounded-5 border-5 border-green-300  bg-green-100';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
  };

  const existURef = () => {
    setUnError('Username is already in use.');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control rounded-5 border-5 border-red-300  bg-red-100';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const busyERef = () => {
    setEmError('Checking email...');
    if (emailRef.current) {
      emailRef.current.className =
        'form-control rounded-5 border-5 bg-blue-100 focus:bg-blue-100';
      emailRef.current.disabled = true;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };
  const wrongERef = () => {
    setEmError('Email is invalid.');
    if (emailRef.current) {
      emailRef.current.className =
        'form-control rounded-5 border-5 border-red-500  bg-red-200';
      emailRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const rightERef = () => {
    setEmError('');
    if (emailRef.current) {
      emailRef.current.className =
        'form-control rounded-5 border-5 border-green-300  bg-green-100';
      emailRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
  };

  const existERef = () => {
    setEmError('Email is already in use.');
    if (emailRef.current) {
      emailRef.current.className =
        'form-control rounded-5 border-5 border-red-300  bg-red-100';
      emailRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  // check if username is available
  const checkUsername = async () => {
    setUnState(true);
    let newUsername = validator.trim(usernameRef.current?.value as string);
    newUsername = validator.escape(newUsername);
    if (
      validator.isEmpty(newUsername) ||
      newUsername.length < minUsernameLength ||
      validator.isEmail(newUsername) ||
      validator.contains(newUsername, '@') ||
      hasSpacialChars(newUsername)
    ) {
      wrongURef();
      return;
    }
    busyURef();
    const response = await fetch('/api/accounts/checkusername', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername }),
    });
    const { status } = await response.json();
    if (!status) {
      rightURef();
    } else {
      existURef();
    }
    setUnState(false);
  };

  // check if email is available
  const checkEmail = async () => {
    setEmState(true);
    let newEmail = validator.trim(emailRef.current?.value as string);
    newEmail = validator.escape(newEmail);
    if (!validator.isEmail(newEmail) || validator.isEmpty(newEmail)) {
      wrongERef();
      return;
    }
    busyERef();
    const response = await fetch('/api/accounts/checkemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newEmail }),
    });
    const { status } = await response.json();
    if (!status) {
      rightERef();
    } else {
      existERef();
    }
    setEmState(false);
  };


  useEffect(() => {
    if (register.schoolId) {
      loadFaculties(register.schoolId);
    }
    if (register.facultyId) {
      loadDepartments(register.schoolId, register.facultyId);
    }
  }, [register.schoolId, register.facultyId]);


  const [departmentsOptions, setDepartmentsOptions] = useState<{ value: string, label: string }[]>([]);
  const [facultiesOptions, setFacultiesOptions] = useState<{ value: string, label: string }[]>([]);

  const loadFaculties = async (schoolId: string) => {
    const response = await fetch(`/api/faculties/${schoolId}/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, data } = await response.json();
    if (status) {
      setFacultiesOptions(data.map((faculty: FacultiesInfo) => ({
        value: faculty._id,
        label: `${faculty.facultyName} (${faculty.facultyCode})`
      })));
      return data;
    } else {
      return [];
    }
  };

  const loadDepartments = async (schoolId: string, facultyId: string) => {
    const response = await fetch(`/api/departments/${schoolId}/${facultyId}/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, data } = await response.json();
    if (status) {
      setDepartmentsOptions(data.map((department: DepartmentsInfo) => ({
        value: department._id,
        label: `${department.departmentName} (${department.departmentCode})`
      })));
      return data;
    } else {
      return [];
    }
  };


  const handleSchoolsSelectChange = (selectedOption: any) => {
    setRegister({
      ...register,
      schoolId: selectedOption.value,
    });
  };

  const handleFacultySelectChange = async (selectedOption: any) => {
    setRegister({
      ...register,
      facultyId: selectedOption.value,
    });
  };

  const handleDepartmentSelectChange = async (selectedOption: any) => {
    setRegister({
      ...register,
      departmentId: selectedOption.value,
    });
  };

  return (
    <>
      <div
        className="tab-pane fade"
        id="pills-register"
        role="tabpanel"
        aria-labelledby="pills-register-tab"
      >
        <div className="mb-2">
          <header className="profile d-flex align-items-center">
            <img
              alt="#"
              src="/images/avatar/user.png"
              className="rounded-circle me-3"
            />
            <div>
              <span className="text-muted text_short">
                Hi Guest, Welcome to Matrics AI.
              </span>
              <h5 className="mb-0 text-dark">
                <span className="fw-bold">Join the scoreboard!</span>
              </h5>
            </div>
          </header>
        </div>
        <div className="feeds">
          <div className="bg-white px-4 py-4 feed-item rounded-4 shadow-sm mb-3 faq-page">
            <form onSubmit={handleRegister}>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="w-full text-lg my-1">
                        Select your institution
                      </div>
                      <div className=" mb-0 d-flex align-items-end">
                        <Select
                          name="university"
                          placeholder="Select your university"
                          className="w-full rounded-5 text-lg clear-both"
                          options={schoolOptions}
                          onChange={(e) => handleSchoolsSelectChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  {register.schoolId && facultiesOptions ? <>
                    <div className="row mt-3">
                      <div className="col-12">
                        <div className="w-full text-lg my-1">
                          Enter your Faculty
                        </div>
                        <div className=" mb-0 d-flex align-items-end">
                          <Select
                            name="faculty"
                            placeholder="Select your Faculty"
                            className="w-full rounded-5 text-lg clear-both"
                            options={facultiesOptions}
                            onChange={(e) => handleFacultySelectChange(e)}
                          />
                        </div>
                      </div>
                    </div></> : <></>}
                  {register.facultyId && departmentsOptions ? <>
                    <div className="row mt-3">
                      <div className="col-12">
                        <div className="w-full text-lg my-1">
                          Enter your Department
                        </div>
                        <div className=" mb-0 d-flex align-items-end">
                          <Select
                            name="department"
                            placeholder="Select your Department"
                            className="w-full rounded-5 text-lg clear-both"
                            options={departmentsOptions}
                            onChange={(e) => handleDepartmentSelectChange(e)}
                          />
                        </div>
                      </div>
                    </div></> : <></>}

                </div>
              </div>

              <div className="row py-3 gy-3 m-0">
                <div className="langauge-item col-12 col-md-4 px-1 mt-2">
                  <input
                    type="radio"
                    required={true}
                    className="btn-check"
                    id="reg_graduate"
                    name="accountType"
                    value={AccountTypes.ALUMNI}
                    onChange={(e) =>
                      setRegister({ ...register, accountType: e.target.value })
                    }
                  />
                  <label
                    htmlFor="reg_graduate"
                    className="btn btn-language btn-sm px-2 py-2 rounded-5 d-flex align-items-center justify-content-between"
                  >
                    <span className="text-start d-grid">
                      <small className="ln-18">I am an Alumni</small>
                    </span>
                    <span className="material-icons text-muted md-20">
                      check_circle
                    </span>
                  </label>
                </div>

                <div className="langauge-item col-12 col-md-4 px-1 mt-2">
                  <input
                    type="radio"
                    required={true}
                    className="btn-check"
                    id="reg_student"
                    name="accountType"
                    value={AccountTypes.STUDENT}
                    onChange={(e) =>
                      setRegister({ ...register, accountType: e.target.value })
                    }
                  />
                  <label
                    htmlFor="reg_student"
                    className="btn btn-language btn-sm px-2 py-2 rounded-5 d-flex align-items-center justify-content-between"
                  >
                    <span className="text-start d-grid">
                      <small className="ln-18">I am a Student</small>
                    </span>
                    <span className="material-icons text-muted md-20">
                      check_circle
                    </span>
                  </label>
                </div>

                <div className="langauge-item col-12 col-md-4 px-1 mt-2">
                  <input
                    type="radio"
                    required={true}
                    className="btn-check"
                    id="reg_lecturer"
                    name="accountType"
                    value={AccountTypes.LECTURER}
                    onChange={(e) =>
                      setRegister({ ...register, accountType: e.target.value })
                    }
                  />
                  <label
                    htmlFor="reg_lecturer"
                    className="btn btn-language btn-sm px-2 py-2 rounded-5 d-flex align-items-center justify-content-between"
                  >
                    <span className="text-start d-grid">
                      <small className="ln-18">I am a Lecturer</small>
                    </span>
                    <span className="material-icons text-muted md-20">
                      check_circle
                    </span>
                  </label>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-floating mb-3 d-flex align-items-end">
                        <input
                          type="text"
                          required={true}
                          className="form-control rounded-5"
                          placeholder="Firstname"
                          id="Firstname"
                          onChange={(e) =>
                            setRegister({
                              ...register,
                              firstname: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="firstname">FIRST NAME</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-floating mb-3 d-flex align-items-end">
                        <input
                          type="text"
                          required={true}
                          className="form-control rounded-5"
                          id="lastname"
                          placeholder="Lastname"
                          onChange={(e) =>
                            setRegister({
                              ...register,
                              lastname: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="lastname">LAST NAME</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label className="mb-4 text-muted ">GENDER</label>
                      <div className="d-flex align-items-center mb-3 px-0">
                        <div className="form-check mx-3 w-full">
                          <input
                            className="form-check-input"
                            type="radio"
                            required={true}
                            name="gender"
                            id="male"
                            value={Gender.MALE}
                            onChange={(e) =>
                              setRegister({
                                ...register,
                                gender: e.target.value,
                              })
                            }
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check mx-3 w-full">
                          <input
                            className="form-check-input"
                            type="radio"
                            required={true}
                            name="gender"
                            id="female"
                            value={Gender.FEMALE}
                            onChange={(e) =>
                              setRegister({
                                ...register,
                                gender: e.target.value,
                              })
                            }
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <label className="mb-2 text-muted ">DATE OF BIRTH</label>
                      <div className="form-floating mb-3 d-flex align-items-center">
                        <input
                          type="date"
                          className="form-control rounded-5"
                          id="birthdat"
                          placeholder="DATE OF BIRTH"
                          autoComplete="off"
                          onChange={(e) =>
                            setRegister({
                              ...register,
                              birthday: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="birthdat">DATE OF BIRTH</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="float-right">
                        <strong className="text-md text-red-500">
                          {unError}
                        </strong>
                      </div>
                      <label htmlFor="username" className="text-md ml-1">
                        Enter Unique Username:
                      </label>
                      <div className="form-floating mb-3 d-flex align-items-end ">
                        <input
                          type="text"
                          ref={usernameRef}
                          required={true}
                          className="form-control rounded-5 border-5 bg-blue-100 focus:bg-red-100"
                          id="username"
                          placeholder="Username"
                          autoComplete="off"
                          pattern="[0-9a-zA-Z_]*"
                          onChange={(e) =>
                            setRegister({
                              ...register,
                              username: e.target.value,
                            })
                          }
                          onBlur={checkUsername}
                        />
                        <label htmlFor="username">UNIQUE USERNAME</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="float-right">
                        <strong className="text-md text-red-500">
                          {emError}
                        </strong>
                      </div>
                      <label htmlFor="email" className="text-md ml-1">
                        Enter Email Address:
                      </label>
                      <div className="form-floating mb-3 d-flex align-items-end">
                        <input
                          type="email"
                          ref={emailRef}
                          required={true}
                          className="form-control rounded-5 border-5 bg-blue-100 focus:bg-red-100"
                          id="emailaddress"
                          placeholder="Email Address"
                          autoComplete="off"
                          onChange={(e) =>
                            setRegister({
                              ...register,
                              email: e.target.value,
                            })
                          }
                          onBlur={checkEmail}
                        />
                        <label htmlFor="emailaddress">EMAIL ADRESS</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-floating mb-3 d-flex align-items-center">
                        <input
                          type="password"
                          required={true}
                          className="form-control rounded-5"
                          id="password"
                          placeholder="Password"
                          autoComplete="off"
                          onChange={(e) =>
                            setRegister({
                              ...register,
                              password: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="password">PASSWORD</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-floating mb-3 d-flex align-items-center">
                        <input
                          type="password"
                          required={true}
                          className="form-control rounded-5"
                          id="confirm-password"
                          placeholder="Password"
                          autoComplete="off"
                          onChange={(e) =>
                            setRegister({
                              ...register,
                              confirmpassword: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="confirm-password">
                          CONFIRM PASSWORD
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary rounded-5 w-100 text-decoration-none py-3 fw-bold text-uppercase m-0"
                      ref={buttonRef}
                    >
                      CREATE ACCOUNT
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterTabContents;

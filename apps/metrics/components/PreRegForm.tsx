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

  const apiUri = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3000/api/';

  const [, setUnState] = useState(false);
  const [, setEmState] = useState(false);

  const [unError, setUnError] = useState<string>('');
  const [emError, setEmError] = useState<string>('');
  //

  const { data: schoolData } = useSWR<{ status: boolean, schools: SchoolInfo[] }>(`${apiUri}schools/list`, (url) =>
    fetch(url).then((res) => res.json())
  );

  // Schools options for react-select
  const schools: SchoolInfo[] = schoolData?.schools ? schoolData.schools : [];

  const schoolOptions = schools.map((school: SchoolInfo) => ({
    value: school._id,
    label: school.name,
  }));

  const mrcidRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const buttonRef: RefObject<HTMLButtonElement> =
    useRef<HTMLButtonElement>(null);

  const emailRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [mrcId, setMrcId] = React.useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${apiUri}accounts/preregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mrcId: mrcId }),
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

  const busyMRCRef = () => {
    setUnError('Checking...');
    if (mrcidRef.current) {
      mrcidRef.current.className =
        'form-control rounded-5 border-5 bg-blue-100 focus:bg-blue-100';
      mrcidRef.current.disabled = true;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const wrongMRCRef = () => {
    setUnError('Code is invalid.');
    if (mrcidRef.current) {
      mrcidRef.current.className =
        'form-control rounded-5 border-5 border-red-500  bg-red-200';
      mrcidRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };
  const rightMRCRef = () => {
    setUnError('');
    if (mrcidRef.current) {
      mrcidRef.current.className =
        'form-control rounded-5 border-5 border-green-300  bg-green-100';
      mrcidRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
  };

  const existMRCRef = () => {
    setUnError('Code is already activated.');
    if (mrcidRef.current) {
      mrcidRef.current.className =
        'form-control rounded-5 border-5 border-red-300  bg-red-100';
      mrcidRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };


  const checkMRCID = async () => {
    setUnState(true);
    let newMRCID = validator.trim(mrcidRef.current?.value as string);
    newMRCID = validator.escape(newMRCID);
    if (
      validator.isEmpty(newMRCID)
    ) {
      wrongMRCRef();
      return;
    }
    busyMRCRef();
    const response = await fetch(`${apiUri}accounts/checkmrcid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mrcId: newMRCID }),
    });
    const { status, mrcUsed } = await response.json();
    if (status) {
      if (mrcUsed) {
        existMRCRef();
      } else {
        rightMRCRef();
      }
    } else {
      wrongMRCRef();
    }
    setUnState(false);
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
                <span className="fw-bold">Join the scoreboard</span>
              </h5>
            </div>
          </header>
        </div>
        <div className="feeds">
          <div className="bg-white px-4 py-4 feed-item rounded-4 shadow-sm mb-3 faq-page">
            <form onSubmit={handleRegister}>



              <div className="row py-3 gy-3 justify-content-center">
                <div className="col-lg-12">

                  <div className="row">
                    <div className="col-12">
                      <div className="float-right">
                        <strong className="text-md text-red-500">
                          {unError}
                        </strong>
                      </div>
                      <label htmlFor="username" className="text-md ml-1">
                        Enter Unique Registration Code:
                      </label>
                      <div className="form-floating mb-3 d-flex align-items-end ">
                        <input
                          type="text"
                          ref={mrcidRef}
                          required={true}
                          className="form-control rounded-5 border-5 bg-blue-100 focus:bg-red-100"
                          id="username"
                          placeholder="MRCID"
                          autoComplete="off"
                          onChange={(e) => {
                            setMrcId(e.target.value);
                          }}
                          onBlur={checkMRCID}
                        />
                        <label htmlFor="username">UNIQUE MRCID</label>
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

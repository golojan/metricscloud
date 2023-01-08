import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { withAuth } from "./../../hocs/auth/withAuth";
import { NextPage } from "next";

import { AuthUserInfo, SchoolInfo } from "@metrics/metrics-interfaces";
import { getProfileInfo, getSchools } from "./../../libs/queries";
import Select from "react-select";
import { toast } from "react-toastify";

const SchoolCode: NextPage = ({ token }: any) => {
  const [schools, setSchools] = useState<[SchoolInfo]>([{} as SchoolInfo]);
  const [profile, setProfile] = useState<AuthUserInfo>({});

  const schoolOptions = schools.map((school: SchoolInfo) => ({
    value: school._id,
    label: school.name,
  }));

  useEffect(() => {
    getProfileInfo(token).then((res: AuthUserInfo) => {
      setProfile(res);
    });
    getSchools().then((res) => {
      setSchools(res);
    });
  }, [token]);

  const verifySchoolCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch(
      `/api/accounts/${token}/update-profile-school-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }
    );
    const { status } = await response.json();
    if (status) {
      toast.success(`School Code Updated.`, {
        toastId: "school-code-update-success",
      });
    } else {
      toast.error(`Failed to update School Code.`, {
        toastId: "school-code-update-success",
      });
    }
  };

  const updateSchoolInformation = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch(
      `/api/accounts/${token}/update-profile-school-information`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolId: profile.schoolId,
          departmentId: profile.departmentId,
        }),
      }
    );
    const { status } = await response.json();
    if (status) {
      toast.success(`School Information Updated.`, {
        toastId: "schoolinfo-update-success",
      });
    } else {
      toast.error(`Failed to update School Information.`, {
        toastId: "schoolinfo-update-success",
      });
    }
  };

  const handleSelectChange = (selectedOption: any) => {
    setProfile({
      ...profile,
      schoolId: selectedOption.value,
    });
  };

  return (
    <>
      <Layout>
        <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
          <div className="main-content">
            <div className="feeds">
              <div className="bg-white p-4 feed-item rounded-4 shadow-sm faq-page mb-3">
                <div className="mb-3">
                  <h5 className="lead fw-bold text-body my-1">
                    Update your School Information
                  </h5>
                  <p className="mb-0">
                    Select your School from the list of Universities and enter
                    your department in the box provides
                  </p>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="row">
                      <form onSubmit={updateSchoolInformation}>
                        <div className="col-12">
                          <label htmlFor="university">
                            SELECT YOUR UNIVERSITY
                          </label>
                          <div className="my-2 d-flex align-items-end">
                            <Select
                              name="university"
                              placeholder="Select your university"
                              className="w-full rounded-5 text-xl clear-both"
                              options={schoolOptions}
                              onChange={(e) => handleSelectChange(e)}
                              value={schoolOptions.find(
                                (_school) => _school.value === profile.schoolId
                              )}
                            />
                          </div>
                          <div className="form-floating mb-3 d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control rounded-5"
                              value={profile.departmentId}
                              id="department"
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  departmentId: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="department">
                              ENTER YOUR DEPARTMENT
                            </label>
                          </div>
                          <div className="d-grid">
                            <button
                              type="submit"
                              className="btn btn-primary w-100 text-decoration-none rounded-5 py-3 fw-bold text-uppercase m-0"
                            >
                              UPDATE SCHOOL INFORMATION
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 feed-item rounded-4 shadow-sm faq-page mb-3">
                <div className="mb-3">
                  <h5 className="lead fw-bold text-body my-1">
                    Confirm University Code
                  </h5>
                  <p className="mb-0">
                    Please enter 12 Digits School code from your institution.
                  </p>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <form onSubmit={verifySchoolCode}>
                      <div className="form-floating mb-1 d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control rounded-5"
                          value={profile.schoolCode}
                          id="schoolCode"
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              schoolCode: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="schoolCode">UNIVERSITY CODE</label>
                      </div>
                      <div className="my-2 w-full">
                        In a bid to ensure that only students and lecturers of
                        the Universities can access the platform, we have
                        implemented a code verification system. Please enter the
                        code you received from your institution to confirm your
                        identity.
                      </div>
                      <div className="d-grid">
                        <button className="btn btn-primary w-100 text-decoration-none rounded-5 py-3 fw-bold text-uppercase m-0">
                          Confirm Code
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default withAuth(SchoolCode);

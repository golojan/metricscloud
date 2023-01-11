import { NextPage } from "next";
import React from "react";
import AdminLayout from "../../../components/AdminLayout";
import AppDrawer from "../../../serverlets/AppDrawer";

import { faPlus, faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import AppHeader from "../../../serverlets/AppHeader";
import Copyright from "../../../serverlets/Copyright";
import { withAuthSync } from "../../../utils/withAuthSync";
import { compose } from "redux";
import DepartmentsRanking from "../../../serverlets/DepartmentsRanking";

const Departments: NextPage = () => {
  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance row">
                <div className="left">
                  <span className="title">Manage Departments</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faSchoolCircleCheck} /> Departments
                  </h1>
                </div>
                <div className="right flex">
                  <Link href="#" legacyBehavior>
                    <a className="button">
                      <FontAwesomeIcon icon={faPlus} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <DepartmentsRanking />
          <div className="section">
            <div className="row mt-2">
              <div className="col-12">
                <div className="stat-box">
                  <table className="table table-striped display table-bordered w-full">
                    <thead>
                      <tr>
                        <th>-</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>-</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {intakes.data.map((intake: AccountInfo, i: number) => (
                        <tr key={i}>
                          <td>
                            <img
                              src={`${intake.avatar}`}
                              width={33}
                              alt="rrdd"
                            />
                          </td>
                          <td>
                            <strong className="text-green-600">
                              {intake.lastname}
                            </strong>
                            {", "}
                            {intake.firstname} {intake.middlename}
                          </td>
                          <td>{intake.email}</td>
                          <td>{intake.mobile}</td>
                          <td className="justify-items-end">
                            <Link
                              href={`/dashboard/intakes/${intake._id}/profile`}
                              className="mx-1"
                            >
                              View
                            </Link>
                            <Link href="#" className="text-green-700 mx-1">
                              Edit
                            </Link>
                            <Link href="#" className="text-danger mx-1">
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))} */}
                    </tbody>

                    <tfoot>
                      <tr>
                        <th>-</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>-</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
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

export default compose(withAuthSync)(Departments);

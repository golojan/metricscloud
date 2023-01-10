import { NextPage } from "next";
import React from "react";
import AdminLayout from "../../../components/AdminLayout";
import AppDrawer from "../../../serverlets/AppDrawer";

import { faPlus, faSchool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import AppHeader from "../../../serverlets/AppHeader";
import Copyright from "../../../serverlets/Copyright";
import { withAuthSync } from "../../../utils/withAuthSync";
import { compose } from "redux";
import FacultiesRanking from "../../../serverlets/FacultiesRanking";

const Faculties: NextPage = () => {
  return (
    <>
      <AdminLayout>
        <AppHeader isroot={true} />
        <div id="appCapsule" className="mb-5">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance row">
                <div className="left">
                  <span className="title">Manage Faculties</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faSchool} /> Faculties
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
          <FacultiesRanking />
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="faculties" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuthSync)(Faculties);

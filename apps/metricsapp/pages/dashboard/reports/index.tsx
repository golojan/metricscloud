import { NextPage } from "next";
import React from "react";
import AdminLayout from "../../../components/AdminLayout";
import { compose } from "redux";

import { faPlus, faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import AppHeader from "../../../serverlets/AppHeader";
import Copyright from "../../../serverlets/Copyright";
import AppAnalytics from "../../../serverlets/AppAnalytics";
import AppSummary from "../../../serverlets/AppSummary";
import { withAuthSync } from "../../../utils/withAuthSync";
import AppDrawer from "../../../serverlets/AppDrawer";

const Reports: NextPage = () => {
  return (
    <>
      <AdminLayout>
        <AppHeader isroot={true} />
        <div id="appCapsule" className="mb-5">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance row">
                <div className="left">
                  <span className="title">Ranking Reports & Statistics</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faSchoolCircleCheck} /> Reports
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
          <AppAnalytics />
          <AppSummary />
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuthSync)(Reports);

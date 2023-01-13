import React from "react";
import LoginTabContents from "../../components/LoginTabContents";
import Layout from "../../components/Layout";
// import RegisterTabContents from "../../components/RegisterTabContents";
import ResetTabContents from "../../components/ResetTabContents";
import AuthTabsBar from "./../../components/AuthTabsBar";

function Auth() {
  return (
    <Layout>
      <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div className="main-content">
          <AuthTabsBar />
          <div className="tab-content" id="pills-tabContent">
            <LoginTabContents />
            {/* <RegisterTabContents /> */}
            <ResetTabContents />
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Auth;

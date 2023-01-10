import React, { ReactNode } from "react";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

interface MyProps {
  children: ReactNode;
}
const Layout = ({ children }: MyProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Owner | Metics AI Ranking Engine</title>
      </Head>
      <ToastContainer />
      {children}
      <Script src="/assets/js/base.js" strategy="lazyOnload" />
    </>
  );
};
export default Layout;

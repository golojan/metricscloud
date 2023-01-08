import type { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";

// Import css files

import "../styles/globals.scss";
import { Provider } from "jotai";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script src="vendor/jquery/jquery.min.js" />
      <Script src="vendor/bootstrap/js/bootstrap.bundle.min.js" />
      <Provider>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnHover={false}
          closeOnClick
          rtl={false}
          theme="dark"
        />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

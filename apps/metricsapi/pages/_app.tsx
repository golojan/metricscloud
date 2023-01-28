import { AppProps } from 'next/app';
import Head from 'next/head';
import "./../styles/globals.scss"; // Global CSS
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MetricsAI.API</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;

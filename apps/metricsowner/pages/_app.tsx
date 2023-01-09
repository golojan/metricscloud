import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';

import { Provider } from 'react-redux';
import { store } from '@metricsai/metrics-store';
import { Provider as JotaiProvider } from 'jotai';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    require('jquery/dist/jquery');
    require('popper.js/dist/popper');
    require('bootstrap/dist/js/bootstrap.min.js');
  }, []);

  return (
    <Provider store={store}>
      <JotaiProvider>
        <Component {...pageProps} />
      </JotaiProvider>
    </Provider>
  );
};

export default MyApp;

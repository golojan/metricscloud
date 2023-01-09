import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@metricsai/metrics-store';

import { Dispatch } from '@metricsai/metrics-store';
import { getWindowDimensions } from '../utils/windows';

const cookie = require('js-cookie');

interface MyProps {
  children: ReactNode;
}

const OwnerLayout = ({ children }: MyProps) => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.settings.setWebWindow(getWindowDimensions());
    const handleResize = () => {
      dispatch.settings.setWebWindow(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch.settings]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Metrics AI</title>
      </Head>
      {children}
    </>
  );
};
export default OwnerLayout;

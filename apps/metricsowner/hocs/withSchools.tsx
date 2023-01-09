import React, { useEffect } from 'react';

import { Dispatch } from '@metricsai/metrics-store';
import { useDispatch } from 'react-redux';

import { getSchools } from '../utils/queries';

export const withSchools = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch<Dispatch>();
    useEffect(() => {
      dispatch.settings.setBusy(true);
      getSchools()
        .then((info) => {
          const { status, schools } = info;
          if (status) {
            dispatch.schools.setSchools(schools);
          } else {
            dispatch.schools.setSchools([]);
          }
        })
        .catch();
      dispatch.settings.setBusy(false);
      return () => {};
    }, [dispatch.schools]);

    return <WrappedComponent {...props} />;
  };
  Wrapper.getInitialProps = async (ctx: any) => {
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };
  return Wrapper;
};

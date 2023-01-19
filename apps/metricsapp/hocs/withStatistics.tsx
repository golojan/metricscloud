import React, { useEffect } from 'react';

import {
  SchoolStats,
  StudentStats,
  SchoolInfo,
  AuthUserInfo,
} from '@metricsai/metrics-interfaces';

import { Dispatch, RootState } from '@metricsai/metrics-store';
import { useDispatch, useSelector } from 'react-redux';
import { div, perc } from '@metricsai/metrics-utils';

import useSWR from 'swr';
interface Props {
  schoolId: string;
}

export const withStatistics = (WrappedComponent: any) => {
  const Wrapper = (props: Props) => {
    const { schoolId } = props;
    const dispatch = useDispatch<Dispatch>();

    return <WrappedComponent {...props} />;
  };
  Wrapper.getInitialProps = async (ctx: any) => {
    // get token from server cookie
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };
  return Wrapper;
};

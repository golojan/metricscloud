import React, { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
const cookie = require('js-cookie');

import { Dispatch } from '@metricsai/metrics-store';
import { useDispatch } from 'react-redux';

import { RootState } from '@metricsai/metrics-store';
import { useSelector } from 'react-redux';

import { getOwnerInfo } from './queries';

// Login & Create session for a given minutes time
export const authLogin = (token: string) => {
  const expire_time: any = process.env.NEXT_PUBLIC_COOKIE_TIME_IN_MINS || 10;
  const inMinutes = new Date(new Date().getTime() + expire_time * 60 * 1000);
  cookie.set('token', token as string, { expires: inMinutes });
  Router.push('/');
};

export const auth = (ctx: any) => {
  const { token } = nextCookie(ctx);
  // If there's no token, it means the user is not logged in.
  if (ctx.req && !token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    } else {
      Router.push('/');
    }
  }
  return token;
};

export const hasAuth = () => {
  const token = cookie.get('token');
  if (token) {
    return true;
  }
  return false;
};

export const authlogout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', `${Date.now()}`);
  Router.push('/');
};

export const withLogon = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch<Dispatch>();
    const { user } = useSelector((state: RootState) => state.settings);
    const syncLogout = (event: any) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/');
      }
    };
    useEffect(() => {
      window.addEventListener('storage', syncLogout);
      const token = cookie.get('token');
      if (token) {
        dispatch.settings.setBusy(true);
        dispatch.settings.setIsLogged(true);
        dispatch.settings.setToken(token);
        // Get account info to state //
        getOwnerInfo(token)
          .then((info) => {
            dispatch.settings.setUserInfo(info);
          })
          .catch();
        // Get account info to state //
        // ========================== //
        dispatch.settings.setBusy(false);
      } else {
        authlogout();
      }
      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, [dispatch.settings]);

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

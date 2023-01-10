import React, { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';

import cookie from 'js-cookie';
import { Token } from '@metricsai/metrics-interfaces';

import { Dispatch, RootState } from '@metricsai/metrics-store';
import { useDispatch, useSelector } from 'react-redux';

// Login & Create session for a given minutes time
export const authLogin = ({ token, domain }: Token) => {
  const expire_time: any = process.env.NEXT_PUBLIC_COOKIE_TIME_IN_MINS || 10;
  const inMinutes = new Date(new Date().getTime() + expire_time * 60 * 1000);
  cookie.set('token', token as string, { expires: inMinutes });
  cookie.set('domain', domain as string, { expires: inMinutes });
  Router.push('/dashboard');
};

const getUserInfo = async (_token: string) => {
  const response = await fetch(`/api/accounts/${_token}/info`);
  const userinfo = await response.json();
  return userinfo;
};

const getSchoolInfoByDomain = async (domain: string) => {
  const response = await fetch(`/api/schools/domains/${domain}`);
  const school = await response.json();
  return school;
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
  Router.push('/?~out+');
};

export const withAuthSync = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch<Dispatch>();

    const { statistics_school, user, school } = useSelector(
      (state: RootState) => state.settings
    );

    const syncLogout = (event: any) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      const token = cookie.get('token');
      const domain = cookie.get('domain');

      if (token && domain) {
        //
        dispatch.settings.setBusy(true);
        dispatch.settings.setIsLogged(true);
        dispatch.settings.setAccid(token);
        dispatch.settings.setDomain(domain as string);
        //
        // Get account info to state //
        getUserInfo(token)
          .then((user) => {
            dispatch.settings.setUserInfo(user);
          })
          .catch((error) => console.log(error));
        // Get account info to state //
        // ========================== //

        // Get school info to state //
        getSchoolInfoByDomain(domain as string)
          .then((school) => {
            dispatch.settings.setSchool(school.data);
          })
          .catch((error) => console.log(error));

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
    // get token from server cookie
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };
  return Wrapper;
};

import React, { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { getUserName } from '../../libs/queries';
import cookie from 'js-cookie';
import { useAtom } from 'jotai';
import { profileAtom } from '@metricsai/metrics-store';

// Login & Create session for a given minutes time
export const authLogin = (token: string) => {
  const expire_time: any = process.env.NEXT_PUBLIC_COOKIE_TIME_IN_MINS || 10;
  const inMinutes = new Date(new Date().getTime() + expire_time * 60 * 1000);
  getUserName(token)
    .then((username) => {
      cookie.set('token', token as string, { expires: inMinutes });
      cookie.set('username', username as string, { expires: inMinutes });
      Router.push(`/${username}`);
    })
    .catch((err) => {
      authlogout();
    });
};

export const auth = (ctx: any) => {
  const { token } = nextCookie(ctx);
  // If there's no token, it means the user is not logged in.
  if (ctx.req && !token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/auth' });
      ctx.res.end();
    } else {
      Router.push('/auth');
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

export const authToken = () => {
  const token = cookie.get('token');
  if (token) {
    return token;
  }
  return null;
};

export const authlogout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', `${Date.now()}`);
  Router.push('/auth/');
};

export const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const syncLogout = (event: any) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/auth');
      }
    };

    const token = cookie.get('token');
    useEffect(() => {
      window.addEventListener('storage', syncLogout);
      if (!token) {
        Router.push('/auth');
      }
      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, [token]);
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: any) => {
    const token = auth(ctx);
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };

  return Wrapper;
};

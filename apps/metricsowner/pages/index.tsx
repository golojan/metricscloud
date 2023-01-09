import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { Logon } from '@metricsai/metrics-interfaces';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import SiteBusy from '../components/SiteBusy';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@metricsai/metrics-store';
import { useRouter } from 'next/router';

import { authLogin, hasAuth } from '../utils/withLogon';

const Home: NextPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();

  const { busy } = useSelector((state: RootState) => state.settings);
  const [errorMsg, setErrorMsg] = useState('');
  const [logon, setLogon] = useState<Logon>({
    username: '',
    password: '',
  });

  const isloggedin: boolean = hasAuth();
  if (isloggedin) {
    router.push('/my');
  }

  const adminLogon = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.settings.setBusy(true);
    setErrorMsg('');
    const response = await fetch('/api/owners/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logon),
    });
    const { status, token } = await response.json();
    if (status) {
      authLogin(token);
    } else {
      setErrorMsg('Invalid Username and Password.');
    }
    dispatch.settings.setBusy(false);
  };
  return (
    <Layout>
      <SiteBusy />
      <div className="p-10">
        <div className="section mt-[50px] text-center">
          <h1>
            <Image
              className="img-responsive"
              width={80}
              height={80}
              src="/assets/img/logo-icon.png"
              alt="/"
              style={{ margin: '0 auto' }}
            />
            <br />
            <div>Metrics AI Ranking System</div>
          </h1>
          <h4>Artificial Intelligence Education Ranking Engine</h4>
        </div>

        <div className="section mb-5 p-2">
          <div className="text-red-600 text-center">{errorMsg}</div>
          <form autoComplete="off" onSubmit={adminLogon} method="POST">
            <Card>
              <Card.Body className="pb-1">
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label" htmlFor="username">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      id="username"
                      name="username"
                      disabled={busy ? true : false}
                      placeholder="Your Email Address"
                      value={logon.username}
                      onChange={(e) =>
                        setLogon({ ...logon, username: e.target.value })
                      }
                    />
                    <i className="clear-input"></i>
                  </div>
                </div>
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      id="password"
                      name="password"
                      disabled={busy ? true : false}
                      placeholder="Your password"
                      value={logon.password}
                      onChange={(e) =>
                        setLogon({ ...logon, password: e.target.value })
                      }
                    />
                    <i className="clear-input"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div className="form-links mt-2">
              <div className="text-muted">
                <span className="text-black">
                  Powered by <Link href={'#'}>Golojan.net</Link>
                </span>
              </div>
              <div>
                <a href="#" className="text-muted">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="form-button-group  transparent">
              <button
                type="submit"
                disabled={busy ? true : false}
                className="btn btn-primary btn-block btn-lg"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

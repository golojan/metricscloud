import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { Logon } from '@metricsai/metrics-interfaces';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import SiteBusy from '../components/SiteBusy';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@metricsai/metrics-store';
import { authLogin, hasAuth } from '../utils/withAuthSync';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();

  const isloggedin: boolean = hasAuth();
  if (isloggedin) {
    router.push('/my');
  }

  const [school, setSchool] = useState({
    name: '',
    shortname: '',
    domain: '',
    logo: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [logon, setLogon] = useState<Logon>({
    username: '',
    password: '',
  });

  useEffect(() => {
    const domainInfo = async () => {
      const result = await fetch(`/api/schools/info`);
      const { status, data, domain, schoolid } = await result.json();
      if (status) {
        setSchool(data);
        dispatch.settings.setDomain(domain);
        dispatch.settings.setSchoolId(schoolid);
      }
    };
    domainInfo();
  }, []);

  const adminLogon = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.settings.setBusy(true);
    setErrorMsg('');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logon),
    });
    const { status, token, domain } = await response.json();
    if (status) {
      authLogin({ token, domain });
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
            <div className="small">{school.name}</div>
          </h1>
          <h4>Artifical Intelligence Education Ranking Engine</h4>
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

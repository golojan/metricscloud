import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { Logon, Token } from '@metricsai/metrics-interfaces';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import SiteBusy from '../components/SiteBusy';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@metricsai/metrics-store';
import { appLogin, hasAuth } from '@metricsai/metrics-hocs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDomain } from '@metricsai/metrics-utils';
import Wait from '../components/Wait';


const Home: NextPage = () => {
  const [busy, setBusy] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();
  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  const isloggedin: boolean = hasAuth();
  const [domain, setDomain] = useState<string>('');
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
    const _domain: string = getDomain(window.location.host);
    if (_domain) {
      setBusy(true);
      setDomain(_domain);
      setLogon({ ...logon, domain: _domain });
      const domainInfo = async () => {
        const result = await fetch(`${apiUri}schools/domains/${_domain}/info`);
        const { status, data } = await result.json();
        if (status) {
          setSchool(data);
          dispatch.settings.setDomain(domain);
          dispatch.settings.setSchoolId(data.schoolId);
        }
      };
      domainInfo();
      setBusy(false);
    }
  }, [busy, domain, apiUri]);

  const adminLogon = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.settings.setBusy(true);
    setErrorMsg('');
    const response = await fetch(`${apiUri}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logon),
    });
    const { status, token, schoolId } = await response.json();
    if (status) {
      appLogin({ token, schoolId } as Token);
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
          <h1 className="mt-0">
            <Image
              className="img-responsive"
              width={80}
              height={80}
              src="/assets/img/logo-icon.png"
              alt="/"
              style={{ margin: '0 auto' }}
            />
            <br />
            <div className="text-md text-gray-600 small">School Admin</div>
            <div className="">{busy ? <Wait /> : school.name}</div>
          </h1>
          <h4>University AI Ranking Engine</h4>
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
                      className="form-control form-control-lg"
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
                      className="form-control form-control-lg"
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

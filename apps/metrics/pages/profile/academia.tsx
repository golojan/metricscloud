import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

import { withAuth } from '@metricsai/metrics-hocs';
import { NextPage } from 'next';

import { AuthUserInfo, GSRanking } from '@metricsai/metrics-interfaces';
import { toast } from 'react-toastify';
import { pageAtom } from '@metricsai/metrics-store';
import { useAtom } from 'jotai';

const ProfileInfoByToken = async (token: string) => {
  const response = await fetch(`/api/accounts/${token}/profile`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

const Academia: NextPage = ({ token }: any) => {
  const [scrapped, setScrapped] = useState<boolean>(false);
  const [gsScrap, setGsScrap] = useState<GSRanking>({});
  const [profile, setProfile] = useState<AuthUserInfo>({});
  const [, setPage] = useAtom(pageAtom);

  useEffect(() => {
    setPage('profile');
    ProfileInfoByToken(token).then((res: AuthUserInfo) => {
      setProfile(res);
    });
  }, [token]);

  const saveGoogleScholarId = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (scrapped) {
      const response = await fetch(
        `/api/accounts/${token}/update-profile-academia-googlescholar`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            googleScholarId: profile.googleScholarId,
            scrap: gsScrap,
          }),
        }
      );
      const { status } = await response.json();
      if (status) {
        toast.success(`Google Scholar ID Updated.`, {
          toastId: 'googleScholarId-update-success',
        });
        setScrapped(false);
      } else {
        toast.error(`Failed to update Google Scholar ID.`, {
          toastId: 'googleScholarId-update-success',
        });
      }
    } else {
      const response = await fetch(
        `/api/scrapper/${profile.googleScholarId}/google-scholar`
      );
      const { status, ranking } = await response.json();
      if (status) {
        toast.info(
          'Google Scholar data retrieved. Please save the data to update your profile.',
          {
            toastId: 'scrapped-update-success',
          }
        );
        setScrapped(true);
        setGsScrap(ranking);
      } else {
        toast.error(`Failed to retrieve Google Scholar data.`, {
          toastId: 'scrapped-update-success',
        });
      }
    }
  };

  const saveScopusId = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `/api/accounts/${token}/update-profile-academia-scopusscholar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scopusId: profile.scopusId }),
      }
    );
    const { status } = await response.json();
    if (status) {
      toast.success(`Scopus Scholar ID Updated.`, {
        toastId: 'scopusId-update-success',
      });
    } else {
      toast.error(`Failed to update Scopus Scholar ID.`, {
        toastId: 'scopusId-update-success',
      });
    }
  };

  const saveOrcidId = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `/api/accounts/${token}/update-profile-academia-orcidscholar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orcidId: profile.orcidId }),
      }
    );
    const { status } = await response.json();
    if (status) {
      toast.success(`OrcId Scholar ID Updated.`, {
        toastId: 'orcidId-update-success',
      });
    } else {
      toast.error(`Failed to update OrcId Scholar ID.`, {
        toastId: 'orcidId-update-success',
      });
    }
  };

  return (
    <>
      <Layout>
        <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
          <div className="main-content">
            <div className="feeds">
              <>
                <div className="bg-white p-4 feed-item rounded-4 shadow-sm faq-page mb-3 relative">
                  <span className="text-muted absolute top-5 right-5">
                    <img
                      src="/img/scholars/google.png"
                      className="w-[120px]"
                      alt="GoogleScholarID"
                    />
                  </span>
                  <div className="mb-3">
                    <h5 className="lead fw-bold text-body  my-1">
                      Enter your Google Scholar ID
                    </h5>
                    <p className="mb-0">
                      Please enter 12 Digits code from your institution.
                    </p>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <form onSubmit={saveGoogleScholarId}>
                        <div className="form-floating mb-1 d-flex align-items-center">
                          <input
                            type="text"
                            className="form-control rounded-5"
                            placeholder="XXXXXXXXXXXX"
                            id="googleScholarId"
                            value={profile.googleScholarId}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                googleScholarId: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="floatingPass">
                            Google Citation ID
                          </label>
                        </div>
                        <div className="mb-2 w-full">
                          Example:{' '}
                          <span className="text-muted">
                            https://scholar.google.com/citations?user=
                            <strong className="text-green-700">
                              XXXXXXXXXXXX
                            </strong>
                            &hl=en
                          </span>
                        </div>
                        <div className="d-grid">
                          {scrapped ? (
                            <button className="btn btn-success w-100 text-decoration-none rounded-5 py-3 fw-bold text-uppercase m-0">
                              Save
                            </button>
                          ) : (
                            <button className="btn btn-primary w-100 text-decoration-none rounded-5 py-3 fw-bold text-uppercase m-0">
                              Check Google Scholar
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
              <div className="mb-3"></div>
              <>
                <div className="bg-white p-4 feed-item rounded-4 shadow-sm faq-page mb-3 relative">
                  <span className="text-muted absolute top-5 right-5">
                    <img
                      src="/img/scholars/scopus.png"
                      className="w-[50px]"
                      alt="ScopusID"
                    />
                  </span>
                  <div className="mb-3">
                    <h5 className="lead fw-bold text-body mb-0">
                      Enter your Scopus Author ID
                    </h5>
                    <p className="mb-0">
                      Please enter 10 Digits ID from Scopus.
                    </p>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <form onSubmit={saveScopusId}>
                        <div className="form-floating mb-1 d-flex align-items-center">
                          <input
                            type="text"
                            className="form-control rounded-5"
                            placeholder="XXXXXXXXXX"
                            id="scopusId"
                            value={profile.scopusId}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                scopusId: e.target.value,
                              })
                            }
                          />

                          <label htmlFor="floatingPass">Scopus Author ID</label>
                        </div>
                        <div className="mb-2 w-full">
                          Example:{' '}
                          <span className="text-muted">
                            https://www.scopus.com/authid/detail.uri?authorId=
                            <strong className="text-green-700">
                              XXXXXXXXXX
                            </strong>
                          </span>
                        </div>
                        <div className="d-grid">
                          <button className="btn btn-primary w-100 text-decoration-none rounded-5 py-3 fw-bold text-uppercase m-0">
                            Save Scopus
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
              <div className="mb-3"></div>
              <>
                <div className="bg-white p-4 feed-item rounded-4 shadow-sm faq-page mb-3 relative">
                  <span className="text-muted absolute top-5 right-5">
                    <img
                      src="/img/scholars/orcid.png"
                      className="w-[50px]"
                      alt="ScopusID"
                    />
                  </span>
                  <div className="mb-3">
                    <h5 className="lead fw-bold text-body mb-0">
                      Enter your Orcid.com Author ID
                    </h5>
                    <p className="mb-0">
                      Please enter 16 Digits ID from Orcid.
                    </p>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <form onSubmit={saveOrcidId}>
                        <div className="form-floating mb-1 d-flex align-items-center">
                          <input
                            type="text"
                            className="form-control rounded-5"
                            placeholder="XXXXXXXXXXXXXXXX"
                            id="orcidId"
                            value={profile.orcidId}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                orcidId: e.target.value,
                              })
                            }
                          />

                          <label htmlFor="floatingPass">Orcid Author ID</label>
                        </div>
                        <div className="mb-2 w-full">
                          Example:{' '}
                          <span className="text-muted">
                            https://orcid.org/
                            <strong className="text-green-700">
                              XXXX-XXXX-XXXX-XXXX
                            </strong>
                          </span>
                        </div>
                        <div className="d-grid">
                          <button className="btn btn-primary w-100 text-decoration-none rounded-5 py-3 fw-bold text-uppercase m-0">
                            Save Orcid
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default withAuth(Academia);

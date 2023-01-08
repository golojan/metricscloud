import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { withAuth } from "../../hocs/auth/withAuth";
import { NextPage } from "next";
import { AuthUserInfo } from '@metricsai/metrics-interfaces';
import { getProfileInfo } from "../../libs/queries";

const Notifications: NextPage = ({ token }: any) => {
  const [profile, setProfile] = useState<AuthUserInfo>({});

  useEffect(() => {
    getProfileInfo(token).then((res: AuthUserInfo) => {
      setProfile(res);
    });
  }, [token]);

  const handleSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setProfile({
        ...profile,
        [e.target.name]: true,
      });
    } else {
      setProfile({
        ...profile,
        [e.target.name]: false,
      });
    }
  };

  const saveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `/api/accounts/${token}/update-profile-settings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          smsNotification: profile.smsNotification,
          emailNotification: profile.emailNotification,
        }),
      }
    );
    const { status } = await response.json();
    alert(status);
  };

  return (
    <>
      <Layout>
        <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
          <div className="main-content">
            <div className="feeds">
              <>
                <div className="bg-white p-4 feed-item rounded-4 shadow-sm faq-page">
                  <div className="mb-3">
                    <h5 className="lead fw-bold text-body my-2">
                      Settings and Notification {profile.emailNotification}{" "}
                      {profile.smsNotification}
                    </h5>
                    <p className="mb-0">
                      Adjust your settings and notification preferences.
                    </p>
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <form onSubmit={saveSettings}>
                        <div className="mb-4 w-full">
                          <p className="border-bottom pt-2 d-flex align-items-center mb-0">
                            <span>EMAIL NOTIFICATIONS</span>
                            <span className="ms-auto form-check form-switch">
                              <input
                                className="form-check-input mt-2 ms-0"
                                type="checkbox"
                                id="emailNotification"
                                name="emailNotification"
                                checked={profile.emailNotification}
                                value={1}
                                onChange={handleSettings}
                              />
                            </span>
                          </p>
                          <p className="border-bottom pt-2 d-flex align-items-center mb-0">
                            <span>SMS NOTIFICATIONS</span>
                            <span className="ms-auto form-check form-switch">
                              <input
                                className="form-check-input c mt-2 ms-0"
                                type="checkbox"
                                id="smsNotification"
                                name="smsNotification"
                                checked={profile.smsNotification}
                                value={1}
                                onChange={handleSettings}
                              />
                            </span>
                          </p>
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
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default withAuth(Notifications);

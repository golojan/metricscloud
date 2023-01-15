import { NextPage } from 'next';
import AllPostFeeds from './../components/AllPostFeeds';
import Layout from '../components/Layout';
import SearchBarLarge from '../components/SearchBarLarge';
import StatusTextBox from '../components/StatusTextBox';
import TabsBar from '../components/TabsBar';
import { AdBox } from '../components/AdBox';
import HomeTabsBar from '../components/HomeTabsBar';

import SlickSlider from '../components/SlickSlider';

import HomeTabContentMetrics from './../components/HomeTabContentMetrics';
import HomeTabContentNews from '../components/HomeTabContentNews';

import TabContentLecturers from '../components/TabContentLecturers';
import TabContentStudents from '../components/TabContentStudents';
import TabContentTrending from '../components/TabContentTrending';
import TabContentAlumni from '../components/TabContentAlumni';
import { hasAuth } from '../hocs/auth/withAuth';
import { useAtom } from 'jotai';
import { pageAtom, profileAtom } from '@metricsai/metrics-store';
import { useEffect } from 'react';

const ProfileInfo = async (username: string) => {
  const response = await fetch(`/api/${username}/profile`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

const cookie = require('js-cookie');
const Home: NextPage = () => {
  // use router
  const auth = hasAuth();
  const [page, setPage] = useAtom(pageAtom);
  const [profile, setProfile] = useAtom(profileAtom);

  useEffect(() => {
    setPage('home');
    if (auth) {
      ProfileInfo(cookie.get('username')).then((res) => {
        setProfile(res);
      });
    }
  }, []);

  return (
    <Layout>
      <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div className="main-content">
          {auth ? (
            <>
              <TabsBar />
              <AdBox />
              <StatusTextBox />
            </>
          ) : null}
          {auth ? <></> : <SearchBarLarge />}
          <div className="tab-content" id="pills-tabContent">
            {auth ? (
              <>
                <TabContentTrending />
                <TabContentLecturers />
                <TabContentStudents />
                <TabContentAlumni />
              </>
            ) : (
              <>
                <div className="feeds">
                  <div className="bg-white p-3 feed-item rounded-4 my-1 shadow-sm">
                    <div className="d-flex">
                      <img
                        src="/img/rmate2.jpg"
                        className="img-fluid rounded-circle user-img"
                        alt="profile-img"
                      />
                      <div className="d-flex ms-3 align-items-start w-100">
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <a
                              href="#"
                              className="text-decoration-none d-flex align-items-center"
                            >
                              <h6 className="fw-bold mb-0 text-body">
                                Agu Stanley
                              </h6>
                              <span className="ms-2 material-icons bg-gray-300 p-0 md-16 fw-bold text-white rounded-circle ov-icon">
                                done
                              </span>
                              <small className="text-muted ms-2">
                                @aguchux
                              </small>
                            </a>
                            <div className="d-flex align-items-center small">
                              <p className="text-muted mb-0">19 Jan</p>
                              <div className="dropdown">
                                <a
                                  href="#"
                                  className="text-muted text-decoration-none material-icons ms-2 md-20 rounded-circle bg-light p-1"
                                  id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  more_vert
                                </a>
                                <ul
                                  className="dropdown-menu fs-13 dropdown-menu-end"
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li>
                                    <a
                                      className="dropdown-item text-muted d-flex align-items-center"
                                      href="#"
                                    >
                                      <span className="material-icons md-13 me-1">
                                        share
                                      </span>
                                      Share Post
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="my-2">
                            <p className="my-3">
                              We are excited to have you here. We are a
                              community of students, lecturers, and
                              professionals who believe in the power of
                              knowledge sharing. We believe that knowledge is
                              power and that we can achieve more when we share
                              our knowledge with others.
                            </p>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <div>
                                <a
                                  href="#"
                                  className="text-muted text-decoration-none d-flex align-items-start fw-light"
                                >
                                  <span className="material-icons md-20 me-2">
                                    thumb_up_off_alt
                                  </span>
                                  <span>0</span>
                                </a>
                              </div>
                              <div>
                                <a
                                  href="#"
                                  className="text-muted text-decoration-none d-flex align-items-start fw-light"
                                >
                                  <span className="material-icons md-20 me-2">
                                    chat_bubble_outline
                                  </span>
                                  <span>0</span>
                                </a>
                              </div>
                              <div>
                                <a
                                  href="#"
                                  className="text-muted text-decoration-none d-flex align-items-start fw-light"
                                >
                                  <span className="material-icons md-20 me-2">
                                    repeat
                                  </span>
                                  <span>0</span>
                                </a>
                              </div>
                              <div>
                                <a
                                  href="#"
                                  className="text-muted text-decoration-none d-flex align-items-start fw-light"
                                >
                                  <span className="material-icons md-18 me-2">
                                    share
                                  </span>
                                  <span>Share</span>
                                </a>
                              </div>
                            </div>

                            <div className="d-flex align-items-center mb-3">
                              <span className="material-icons bg-white border-0 text-primary pe-2 md-36">
                                account_circle
                              </span>
                              <input
                                type="text"
                                disabled={true}
                                className="form-control form-control-sm rounded-3 fw-light h-auto"
                                placeholder="Write Your comment"
                              />
                            </div>
                            <div className="comments"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;

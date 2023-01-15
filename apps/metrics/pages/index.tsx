import { NextPage } from 'next';
import AllPostFeeds from './../components/AllPostFeeds';
import Layout from '../components/Layout';
import SearchBarLarge from '../components/SearchBarLarge';
import StatusTextBox from '../components/StatusTextBox';
import TabsBar from '../components/TabsBar';
import { AdBox, AdBoxMidium } from '../components/AdBox';
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
  const [mailout, setMailout] = useAtom(profileAtom);

  useEffect(() => {
    setPage('home');
    if (auth) {
      ProfileInfo(cookie.get('username')).then((res) => {
        setProfile(res);
      });
    }
  }, []);

  const senOutMail = () => {
    fetch('/api/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toEmail: 'agu.chux@yahoo.com',
        toName: 'Agu Chux',
        subject: 'Testing Email',
        htmlBody: 'We are testing emails and other stuffs...',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setMailout(res.message);
      });
  };

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
                  <AdBox />
                  <AdBoxMidium />
                  <div className="text-center justify-items-center">
                    <button onClick={senOutMail}>Mail Out Test</button>
                    <p>{JSON.stringify(mailout)}</p>
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

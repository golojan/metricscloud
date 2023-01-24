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
import { hasAuth } from '@metricsai/metrics-hocs';
import { useAtom } from 'jotai';
import { pageAtom, profileAtom, schoolsAtom } from '@metricsai/metrics-store';
import { useEffect } from 'react';
import cookie from 'js-cookie';

const ProfileInfo = async (username: string) => {
  const response = await fetch(`/api/${username}/profile`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

const getSchools = async () => {
  const response = await fetch(`/api/schools/list`);
  const data = await response.json();
  if (data.status) {
    return data.schools;
  } else {
    return [];
  }
};

const Home: NextPage = () => {
  // use router
  const auth = hasAuth();
  const [page, setPage] = useAtom(pageAtom);
  const [, setSchools] = useAtom(schoolsAtom);

  useEffect(() => {
    setPage('home');
    getSchools().then((res) => {
      setSchools(res);
    });
  }, [page, setSchools, setPage]);

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
          {/* <SlickSlider /> */}
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

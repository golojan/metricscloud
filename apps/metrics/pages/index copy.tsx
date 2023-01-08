import { NextPage } from "next";
import AllPostFeeds from "./../components/AllPostFeeds";
import Layout from "../components/Layout";
import SearchBarLarge from "../components/SearchBarLarge";
import StatusTextBox from "../components/StatusTextBox";
import TabsBar from "../components/TabsBar";
import { AdBox } from "../components/AdBox";
import HomeTabsBar from "../components/HomeTabsBar";

import SlickSlider from "../components/SlickSlider";

import HomeTabContentMetrics from "./../components/HomeTabContentMetrics";
import HomeTabContentNews from "../components/HomeTabContentNews";
import TabContentFeeds from "../components/TabContentFeeds";
import TabContentLecturers from "../components/TabContentLecturers";
import TabContentStudents from "../components/TabContentStudents";
import TabContentTrending from "../components/TabContentTrending";
import { hasAuth } from "../hocs/auth/withAuth";

const cookie = require("js-cookie");
const Home: NextPage = () => {
  const auth = hasAuth();
  return (
    <Layout>
      <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div className="main-content">
          {auth ? <TabsBar /> : <HomeTabsBar />}
          {auth ? <></> : <SearchBarLarge />}
          <div className="tab-content" id="pills-tabContent">
            {auth ? (
              <>
                <TabContentFeeds />
                <TabContentLecturers />
                <TabContentStudents />
                <TabContentTrending />
              </>
            ) : (
              <>
                <HomeTabContentMetrics />
                <HomeTabContentNews />
              </>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;

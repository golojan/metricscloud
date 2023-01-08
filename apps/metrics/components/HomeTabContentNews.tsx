import React from "react";
import AllPostFeeds from "./AllPostFeeds";
import SlickSlider from "./SlickSlider";

function HomeTabContentNews() {
  return (
    <div
      className="tab-pane fade"
      id="pills-news"
      role="tabpanel"
      aria-labelledby="pills-news-tab"
    >
      <div>
        {/* <SlickSlider /> */}
        <div className="feeds">
          <h1>News</h1>
          {/* <AllPostFeeds /> */}
        </div>
      </div>
    </div>
  );
}

export default HomeTabContentNews;

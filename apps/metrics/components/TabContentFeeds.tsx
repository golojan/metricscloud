import React from "react";
import AllPostFeeds from "./AllPostFeeds";
import SlickSlider from "./SlickSlider";
import StatusTextBox from "./StatusTextBox";

function TabContentFeeds() {
  return (
    <div
      className="tab-pane fade show active"
      id="pills-feeds"
      role="tabpanel"
      aria-labelledby="pills-feeds-tab"
    >
      <div>
        <StatusTextBox />
        <div className="feeds">
          <h1>Feeds</h1>
        </div>
      </div>
    </div>
  );
}

export default TabContentFeeds;

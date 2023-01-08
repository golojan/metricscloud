import React from "react";
import AllPostFeeds from "./AllPostFeeds";
import SlickSlider from "./SlickSlider";

function HomeTabContentMetrics() {
  return (
    <div
      className="tab-pane fade show active"
      id="pills-metrics"
      role="tabpanel"
      aria-labelledby="pills-metrics-tab"
    >
      <div>
        {/* <SlickSlider /> */}
        <div className="feeds">
          <AllPostFeeds />
        </div>
      </div>
    </div>
  );
}

export default HomeTabContentMetrics;

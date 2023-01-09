import React from "react";
import { useAtom } from "jotai";
import { profileAtom } from '@metricsai/metrics-store';

function HomeTabsBar() {
  const [profile] = useAtom(profileAtom);
  return (
    <>
      <ul
        className="top-osahan-nav-tab nav nav-pills justify-content-center nav-justified mb-4 shadow rounded-4 overflow-hidden bg-white sticky-sidebar2"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="p-3 nav-link text-muted active"
            id="pills-metrics-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-metrics"
            type="button"
            role="tab"
            aria-controls="pills-metrics"
            aria-selected="true"
          >
            Trending on Metrics
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="p-3 nav-link text-muted"
            id="pills-news-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-news"
            type="button"
            role="tab"
            aria-controls="pills-news"
            aria-selected="false"
          >
            News & Publications
          </button>
        </li>
      </ul>
    </>
  );
}

export default HomeTabsBar;

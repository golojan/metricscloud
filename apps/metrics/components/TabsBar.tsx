import React from "react";
import { useAtom } from "jotai";
import { profileAtom } from "../store";

function TabsBar() {
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
            id="pills-feed-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-feeds"
            type="button"
            role="tab"
            aria-controls="pills-feeds"
            aria-selected="true"
          >
            Feeds
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="p-3 nav-link text-muted"
            id="pills-lecturers-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-lecturers"
            type="button"
            role="tab"
            aria-controls="pills-lecturers"
            aria-selected="false"
          >
            Lecturers
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="p-3 nav-link text-muted"
            id="pills-students-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-students"
            type="button"
            role="tab"
            aria-controls="pills-students"
            aria-selected="false"
          >
            Students
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="p-3 nav-link text-muted"
            id="pills-trending-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-trending"
            type="button"
            role="tab"
            aria-controls="pills-trending"
            aria-selected="false"
          >
            Trending
          </button>
        </li>
      </ul>
    </>
  );
}

export default TabsBar;

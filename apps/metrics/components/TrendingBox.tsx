import Link from "next/link";
import React from "react";

function TrendingBox() {
  return (
    <>
      <div className="p-3 border-bottom d-flex">
        <div>
          <div className="text-muted fw-light d-flex align-items-center">
            <small>Trending in India</small>
          </div>
          <p className="fw-bold mb-0 pe-3 text-dark">News</p>
          <small className="text-muted">52.8k Tweets</small>
        </div>
        <div className="dropdown ms-auto">
          <Link
            href="#"
            className="text-muted text-decoration-none material-icons ms-2 md-20 rounded-circle bg-light p-1"
            id="dropdownMenuButton6"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            more_vert
          </Link>
          <ul
            className="dropdown-menu fs-13 dropdown-menu-end"
            aria-labelledby="dropdownMenuButton6"
          >
            <li>
              <Link className="dropdown-item text-muted" href="#">
                <span className="material-icons md-13 me-1">
                  sentiment_very_dissatisfied
                </span>
                Not interested in this
              </Link>
            </li>
            <li>
              <Link className="dropdown-item text-muted" href="#">
                <span className="material-icons md-13 me-1">
                  sentiment_very_dissatisfied
                </span>
                This trend is harmful or spammy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TrendingBox;

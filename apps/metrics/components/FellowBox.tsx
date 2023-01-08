import Link from "next/link";
import React from "react";

function FellowBox() {
  return (
    <>
      <Link
        href="#"
        className="p-3 border-bottom d-flex text-dark text-decoration-none account-item"
      >
        <img
          src="/img/rmate5.jpg"
          className="img-fluid rounded-circle me-3"
          alt="profile-img"
        />
        <div>
          <p className="fw-bold mb-0 pe-3 d-flex align-items-center">
            Webartinfo
            <span className="ms-2 material-icons bg-gray-300 p-0 md-16 fw-bold text-white rounded-circle ov-icon">
              done
            </span>
          </p>
          <div className="text-muted fw-light">
            <p className="mb-1 small">@abcdsec</p>
            <span className="text-muted d-flex align-items-center small">
              <span className="material-icons me-1 small">open_in_new</span>
              Promoted
            </span>
          </div>
        </div>
        <div className="ms-auto">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input type="checkbox" className="btn-check" id="btncheck8" />
            <label
              className="btn btn-outline-primary btn-sm px-3 rounded-pill"
              htmlFor="btncheck8"
            >
              <span className="follow">+ Follow</span>
              <span className="following d-none">Following</span>
            </label>
          </div>
        </div>
      </Link>
    </>
  );
}

export default FellowBox;

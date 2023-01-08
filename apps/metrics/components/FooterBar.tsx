import Link from "next/link";
import React from "react";

function FooterBar() {
  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <span className="me-3">
              © 2021 <b className="text-primary">Metrics AI</b>
            </span>
          </div>
          <div className="col-md-4 text-end">
            <Link
              href="#"
              className="btn social-btn btn-sm text-decoration-none"
            >
              <i className="icofont-facebook text-2xl hover:text-red-500" />
            </Link>
            <Link
              href="#"
              className="btn social-btn btn-sm text-decoration-none"
            >
              <i className="icofont-twitter text-2xl hover:text-red-500" />
            </Link>
            <Link
              href="#"
              className="btn social-btn btn-sm text-decoration-none"
            >
              <i className="icofont-linkedin text-2xl hover:text-red-500" />
            </Link>
            <Link
              href="#"
              className="btn social-btn btn-sm text-decoration-none"
            >
              <i className="icofont-youtube-play text-2xl hover:text-red-500" />
            </Link>
            <Link
              href="#"
              className="btn social-btn btn-sm text-decoration-none"
            >
              <i className="icofont-instagram text-2xl hover:text-red-500" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterBar;

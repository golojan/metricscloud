import Link from "next/link";
import React from "react";

function NewsBox() {
  return (
    <>
      <Link
        href="#"
        className="p-3 border-bottom d-flex align-items-center text-dark text-decoration-none"
      >
        <div>
          <div className="text-muted fw-light d-flex align-items-center">
            <small>Design</small>
            <span className="mx-1 material-icons md-3">circle</span>
            <small>Live</small>
          </div>
          <p className="fw-bold mb-0 pe-3">
            Why universities are loosing teachers to the private sector.
          </p>
        </div>
        <img
          src="/img/trend1.jpg"
          className="img-fluid rounded-4 ms-auto"
          alt="trending-img"
        />
      </Link>
    </>
  );
}

export default NewsBox;

import Link from "next/link";
import React from "react";

function HashBox() {
  return (
    <>
      <Link
        href="#"
        className="p-3 border-bottom d-flex align-items-center text-dark text-decoration-none"
      >
        <div>
          <div className="text-muted fw-light d-flex align-items-center" />
          <p className="fw-bold mb-0 pe-3">#SelectricsM12</p>
          <small className="text-muted">Buy now with exclusive offers</small>
          <br />
          <small className="text-muted d-flex align-items-center">
            <span className="material-icons me-1 small">open_in_new</span>
            Promoted by Selectrics World
          </small>
        </div>
      </Link>
    </>
  );
}

export default HashBox;

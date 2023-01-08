import Link from "next/link";
import React from "react";

function TrendingWith() {
  return (
    <>
      <Link
        href="#"
        className="p-3 border-bottom d-flex align-items-center text-dark text-decoration-none"
      >
        <div>
          <div className="text-muted fw-light d-flex align-items-center">
            <small>ESUT</small>
            <span className="mx-1 material-icons md-3">circle</span>
            <small>Anatomy</small>
          </div>
          <p className="fw-bold mb-0 pe-3">Prof. Ndubuidi Anibeze</p>
          <small className="text-muted">Trending with</small>
          <br />
          <span className="text-primary">#NdubuisiAnibeze</span>
        </div>
        <img
          src="/img/rmate4.jpg"
          className="img-fluid rounded-4 ms-auto"
          alt="profile-img"
        />
      </Link>
    </>
  );
}

export default TrendingWith;

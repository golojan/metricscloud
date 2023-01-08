import Link from "next/link";
import React from "react";

function index() {
  return (
    <div className="py-0 w-full mb-3">
      <Link href="/" className="text-decoration-none">
        <img
          src="/img/metrics.png"
          className="img-fluid logo"
          alt="MAtrics AI"
        />
      </Link>
    </div>
  );
}

export default index;

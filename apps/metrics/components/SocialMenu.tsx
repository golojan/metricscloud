import Link from "next/link";
import React from "react";

function SocialMenu() {
  return (
    <>
      <div className="web-none d-flex align-items-center px-3 pt-3">
        <Link href="/" className="text-decoration-none">
          <img
            src="/img/logo.png"
            className="img-fluid logo-mobile"
            alt="brand-logo"
          />
        </Link>
        <button
          className="ms-auto btn btn-primary ln-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <span className="material-icons text-[#ffffff] hover:text-[#f6f4f4] after:text-[#f6f4f4]">
            menu
          </span>
        </button>
      </div>
    </>
  );
}

export default SocialMenu;

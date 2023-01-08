import React from "react";

function AuthTabsBar() {
  return (
    <>
      <ul
        className="top-osahan-nav-tab nav nav-pills justify-content-center nav-justified mb-4 shadow rounded-4 overflow-hidden bg-white sticky-sidebar2"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="login">
          <button
            className="p-3 nav-link text-muted active"
            id="pills-login-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-login"
            type="button"
            role="tab"
            aria-controls="pills-login"
            aria-selected="true"
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="register">
          <button
            className="p-3 nav-link text-muted"
            id="pills-register-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-register"
            type="button"
            role="tab"
            aria-controls="pills-register"
            aria-selected="false"
          >
            Register
          </button>
        </li>
        <li className="nav-item" role="reset">
          <button
            className="p-3 nav-link text-muted"
            id="pills-reset-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-reset"
            type="button"
            role="tab"
            aria-controls="pills-reset"
            aria-selected="false"
          >
            Password Reset
          </button>
        </li>
      </ul>
    </>
  );
}

export default AuthTabsBar;

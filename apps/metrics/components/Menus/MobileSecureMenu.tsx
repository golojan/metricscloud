import Link from 'next/link';
import React from 'react';
import { authlogout } from '@metricsai/metrics-hocs';
import { AdBoxSlim } from '../AdBox';
import MetricsLogo from '../MetricsLogo';
import { useAtom } from 'jotai';
import { pageAtom } from '@metricsai/metrics-store';

function MobileSecureMenu() {
  const [page] = useAtom(pageAtom);

  return (
    <div
      className="p-2 bg-light offcanvas offcanvas-start"
      tabIndex={-1}
      id="offcanvasExample"
    >
      <div className="sidebar-nav mb-3">
        <MetricsLogo />
        <AdBoxSlim />
        <ul className="navbar-nav justify-content-end flex-grow-1">
          <li className={`nav-link ${page === 'home' ? 'active' : ''}`}>
            <Link href="/" className="nav-link">
              <span className="material-icons me-3">local_fire_department</span>
              <span>Trending</span>
            </Link>
          </li>

          <li className={`nav-link ${page === 'metrics' ? 'active' : ''}`}>
            <Link href="/" className="nav-link active">
              <span className="material-icons me-3">
                <img
                  src="/img/logo.png"
                  className="img-fluid"
                  alt="brand-logo"
                  width={'22px'}
                  height={'22px'}
                />
              </span>
              <span>Metrics</span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link href="/" className="nav-link">
              <span className="material-icons me-3">explore</span>
              <span>Explore</span>
            </Link>
          </li>

          <li>
            <Link className="dropdown-item rounded-3 px-2 py-1 my-1" href="/">
              <span className="material-icons me-3">school</span>
              Academia
            </Link>
          </li> */}

          <li className="nav-item dropdown">
            <Link
              className={`nav-link dropdown-toggle ${
                page === 'profile' ? 'active' : ''
              }`}
              href="#"
              id="offcanvasNavbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="material-icons me-3">account_circle</span>
              <span>My Profile</span>
            </Link>
            <ul
              className="dropdown-menu px-2 py-1 mb-2"
              aria-labelledby="offcanvasNavbarDropdown"
            >
              <li className="ml-5">
                <Link
                  className="dropdown-item rounded-3 px-2 py-1 my-1"
                  href="/profile"
                >
                  Edit Profile
                </Link>
              </li>
              <li className="ml-5">
                <Link
                  className="dropdown-item rounded-3 px-2 py-1 my-1"
                  href="/profile/academia"
                >
                  Academia Profile
                </Link>
              </li>
              <li className="ml-5">
                <Link
                  className="dropdown-item rounded-3 px-2 py-1 my-1"
                  href="/profile/notifications"
                >
                  Notifications
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              href={'#'}
              onClick={() => authlogout('/auth/')}
              className="nav-link"
            >
              <span className="material-icons me-3">logout</span>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MobileSecureMenu;

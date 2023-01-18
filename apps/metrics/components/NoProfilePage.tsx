import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { AuthUserInfo, SchoolInfo } from '@metricsai/metrics-interfaces';
import { getProfile, getSchools, toMonthYear } from '@metricsai/metrics-utils';

function NoProfilePage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <div className="mb-4 d-flex align-items-center">
        <div className="d-flex align-items-center">
          <Link
            href={`/${username}`}
            className="material-icons text-dark text-decoration-none m-none"
          >
            arrow_back
          </Link>
        </div>
        <Link
          href="#"
          className="text-decoration-none material-icons md-20 ms-auto text-muted"
        >
          share
        </Link>
      </div>
      <div className="bg-white rounded shadow-sm profile relative pb-10">
        <div className="d-flex align-items-center small float-right mt-2 mr-2">
          <div className="dropdown">
            <Link
              href="#"
              className="text-muted text-decoration-none material-icons ms-2 md-20 rounded-circle bg-ligh p-1"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              more_vert
            </Link>
          </div>
        </div>

        <div className="d-flex align-items-center px-3 pt-4">
          <img
            src={`/images/avatar/user.png`}
            className="img-profile rounded-circle"
            alt="profile-img"
          />
          <div className="ms-3 clear-both">
            <h6 className="mb-0 d-flex align-items-start text-body fs-6 fw-bold">
              No such User
              <span className="ms-2 material-icons bg-red-300 p-0 md-16 fw-bold text-white rounded-circle ov-icon">
                done
              </span>
            </h6>
            <p className="text-muted mb-0">{`@${username}`}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoProfilePage;

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { toMonthDayYear } from '@metricsai/metrics-utils';
import { hasAuth } from '@metricsai/metrics-hocs';

import {
  publicProfileAtom,
  schoolsAtom,
  tokenAtom,
  schoolDepartmentsAtom
} from '@metricsai/metrics-store';
import { useAtom } from 'jotai';
import { GSStatus, UserStatus } from './Status';

function ProfilePage() {
  const router = useRouter();
  const auth: boolean = hasAuth();
  const { username } = router.query;

  const [token] = useAtom(tokenAtom);
  const [profile] = useAtom(publicProfileAtom);
  const [schools] = useAtom(schoolsAtom);
  const [departments] = useAtom(schoolDepartmentsAtom);


  const DepartmentInfo = (departmentId: string) => {
    const dept = departments.find((department) => department._id === departmentId);
    return {
      name: dept?.departmentName ? dept?.departmentName : 'No Department',
      code: dept?.departmentCode ? dept?.departmentCode : 'No Code'
    }
  };

  const connectButtonRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  // Set the connection on and off //
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    if (auth) {
      if (token === profile._id) {
        setIsMe(true);
      }
    }
  }, [token, profile._id, auth]);

  // const handleConnect = () => {
  //   const connectButton = connectButtonRef.current;
  //   if (connectButton) {
  //     if (connectButton.checked) {
  //       connectButton.parentElement?.classList.add('active');
  //       connectButton.parentElement?.classList.remove('inactive');
  //       setConnected(false);
  //     } else {
  //       connectButton.parentElement?.classList.remove('active');
  //       connectButton.parentElement?.classList.add('inactive');
  //       setConnected(false);
  //     }
  //   }
  // };

  return (
    <>
      {profile ? (
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
          <div className="bg-white rounded shadow-sm profile relative">
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
                <ul
                  className="dropdown-menu fs-13 dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {/* <li>
                      <Link
                        className="dropdown-item text-muted"
                        href="/profile/edit"
                      >
                        <span className="material-icons md-13 me-1">edit</span>
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-muted"
                        href="/profile/school-code"
                      >
                        <span className="material-icons md-13 me-1">edit</span>
                        Verify Your School
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-muted"
                        href="/profile/academia"
                      >
                        <span className="material-icons md-13 me-1">edit</span>
                        Update Academia
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-muted"
                        href="/profile/notifications"
                      >
                        <span className="material-icons md-13 me-1">edit</span>
                        Set Notifications
                      </Link>
                    </li> */}

                  <li>
                    <Link
                      className="dropdown-item text-muted d-flex align-items-center"
                      href="#"
                    >
                      <span className="material-icons md-13 me-1">share</span>
                      Share Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex align-items-center px-3 pt-4">
              <img
                src={`${profile.picture}`}
                className="img-profile rounded-circle"
                alt="profile-img"
              />
              <div className="ms-3 clear-both">
                <h6 className="mb-0 d-flex align-items-start text-body fs-6 fw-bold">
                  {` ${profile.lastname} ${profile.firstname} `}{' '}
                  <UserStatus username={username as string} />
                </h6>
                <p className="text-muted mb-0">{`@${profile.username}`}</p>
              </div>

              {/* {isMe ? null : (
                <div
                  className={`ms-auto btn-group`}
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btnConnect"
                    autoComplete="off"
                    defaultChecked={connected}
                    defaultValue={'on'}
                    ref={connectButtonRef}
                    onChange={handleConnect}
                  />
                  <label
                    className="btn btn-outline-primary btn-sm px-3 mx-1 rounded-pill"
                    htmlFor="btnConnect"
                  >
                    <span className="follow">+ connect</span>
                    <span className="following d-none">connected</span>
                  </label>
                </div>
              )} */}
            </div>

            <div className="p-3">
              <p className="d-flex flex-row align-items-center mb-3">
                <span className="material-icons me-2 rotate-320 text-muted md-16">
                  link
                </span>
                <Link href={`/${username}`} className="text-decoration-none">
                  {`@${username}`}
                </Link>
                <span className="material-icons me-2 text-muted md-16 ms-4">
                  calendar_today
                </span>
                <span>
                  Joined{' '}
                  <strong className="text-success">
                    {toMonthDayYear(profile.createdAt as Date)}
                  </strong>
                </span>

                <span className="material-icons me-2 text-muted md-16 ms-4">
                  face
                </span>
                <span>
                  <strong>0</strong> Views
                </span>

                <span className="material-icons me-2 text-muted md-16 ms-4">
                  face
                </span>
                <span>
                  <strong>0</strong> Matrics
                </span>
              </p>
              <hr />
              <div className="d-flex followers">
                <div className="ms-0 ps-0">
                  <p className="mb-0">
                    <strong>0</strong>{' '}
                    <span className="text-muted">Connections</span>
                  </p>
                  {/* <div className="d-flex">
                      <img
                        src="img/rmate1.jpg"
                        className="img-fluid rounded-circle"
                        alt="follower-img"
                      />
                    </div> */}
                </div>
                <div className="ms-5 ps-5">
                  <p className="mb-0">
                    <strong>0</strong>{' '}
                    <span className="text-muted">Students</span>
                  </p>
                  {/* <div className="d-flex">
                      <img
                        src="img/rmate3.jpg"
                        className="img-fluid rounded-circle"
                        alt="follower-img"
                      />
                    </div> */}
                </div>
                <div className="ms-5 ps-5">
                  <p className="mb-0">
                    <strong>0</strong>{' '}
                    <span className="text-muted">Lecturers</span>
                  </p>
                  {/* <div className="d-flex">
                      <img
                        src="img/rmate1.jpg"
                        className="img-fluid rounded-circle"
                        alt="follower-img"
                      />
                    </div> */}
                </div>
              </div>
              <hr />
              <div className="mb-0 text-body fs-6 px-3 text-gray-700">
                <div className="row">
                  <div className="col-5">
                    <span className="text-muted">University:</span>
                    <p className="mb-0">
                      {schools?.find((s) => s._id === profile.schoolId)?.name}
                    </p>
                  </div>
                  <div className="col-5">
                    <span className="text-muted">Department:</span>
                    <p className="mb-0">{DepartmentInfo(profile.departmentId).name} ({DepartmentInfo(profile.departmentId).code})</p>
                  </div>
                  <div className="col-2">
                    <span className="text-muted">State:</span>
                    <p className="mb-0">
                      {schools?.find((s) => s._id === profile.schoolId)?.state}
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-2 px-4 py-2 bg-[#fffccf] rounded-4 text-[#373435] hover:text-[#373435]">
                <span className="text-lg">{profile.aboutMe}</span>
              </div>

              <hr className="mb-2" />
              <div className="row d-flex mt-0">
                <div className="col-12 mb-2 mt-0 text-black text-lg">
                  Google Scholar <GSStatus />
                </div>
                <div className="col-3 text-center">
                  <div className="m-0 p-0 h2 text-center">
                    {profile.citations}
                  </div>
                  <em>Citations</em>
                </div>

                <div className="col-3 text-center">
                  <div className="m-0 p-0 h2 text-center">{profile.hindex}</div>
                  <em>H-Index</em>
                </div>

                <div className="col-3 text-center">
                  <div className="m-0 p-0 h2 text-center">
                    {profile.i10hindex}
                  </div>
                  <em>i-10-Index</em>
                </div>

                <div className="col-3 text-center">
                  <div className="m-0 p-0 h2 text-center">0</div>
                  <em>Metrix Rank</em>
                </div>
              </div>
              <hr />
              <div className="row d-flex mt-0">
                <div className="col-4 text-center">
                  <div className="m-0 p-0 h2 text-center">
                    {profile.totalPublications ? profile.totalPublications : 0}
                    <sup>+</sup>
                  </div>
                  <em>Publications</em>
                </div>

                <div className="col-4 text-center">
                  <div className="m-0 p-0 h2 text-center">
                    {profile.firstPublicationYear
                      ? profile.firstPublicationYear
                      : '-'}
                  </div>
                  <em>First Publication</em>
                </div>

                <div className="col-4 text-center">
                  <div className="m-0 p-0 h2 text-center">
                    {profile.lastPublicationYear
                      ? profile.lastPublicationYear
                      : '-'}
                  </div>
                  <em>Last Publication</em>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProfilePage;

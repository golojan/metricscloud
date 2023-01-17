import { AuthUserInfo } from '@metricsai/metrics-interfaces';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';
import { UserStatus } from './Status';
import { useAtom } from 'jotai';
import { schoolsAtom } from '@metricsai/metrics-store';

const SlickSlider = () => {
  const [users, setUsers] = React.useState<AuthUserInfo[]>([]);
  const [busy, setBusy] = React.useState(false);

  const [schools] = useAtom(schoolsAtom);

  // get all users from the database //
  const settings = {
    swipe: false,
    touchMove: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: false,
    arrows: false,
    centerPadding: '0px',
    className: 'account-slider',
    variableWidth: true,
  };

  React.useEffect(() => {
    const getUsers = async () => {
      setBusy(true);
      const res = await fetch('/api/accounts/list');
      const data = await res.json();
      setUsers(data.accounts);
      setBusy(false);
    };
    getUsers();
  }, [busy]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-1">
        <h6 className="mb-0 fw-bold text-body">Follow People</h6>
        <Link
          href="#"
          className="text-dark text-decoration-none material-icons"
        >
          east
        </Link>
      </div>
      <Slider {...settings}>
        {users.map((user, index) => (
          <>
            <div className="account-item" key={user._id}>
              <div className="me-2 bg-white shadow-sm rounded-4 p-3 user-list-item d-flex justify-content-center my-2">
                <div className="text-center">
                  <div className="position-relative d-flex justify-content-center">
                    <Link
                      href={`/${user.username}`}
                      className="text-decoration-none"
                    >
                      <Image
                        src={user.picture || '/images/profile.png'}
                        className="img-fluid rounded-circle mb-3"
                        alt={`${user.firstname} ${user.lastname}`}
                        width={50}
                        height={50}
                      />
                      <div className="position-absolute">
                        <UserStatus />
                      </div>
                    </Link>
                  </div>
                  <p className="fw-bold text-dark m-0">
                    {`${user.firstname} ${user.lastname}`}
                  </p>
                  <p className="small text-muted  my-1">
                    <Link
                      href={`#`}
                      className="text-decoration-none text-gray-500 hover:text-blue-500"
                    >
                      {schools?.find((s) => s._id === user.schoolId)?.shortname}
                      <span className="fs-3 text-muted material-icons mx-1">
                        circle
                      </span>
                      {schools?.find((s) => s._id === user.schoolId)?.state}
                    </Link>
                  </p>
                  <div
                    className="btn-group btn-group-toggle"
                    role="group"
                    aria-label="Basic checkbox toggle button group"
                  >
                    <label className="btn btn-outline-primary btn-sm px-3 rounded-pill">
                      <span className="follow">+ Follow</span>
                      <span className="following d-none">Following</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </Slider>
    </>
  );
};

export default SlickSlider;

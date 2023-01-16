import { AuthUserInfo } from '@metricsai/metrics-interfaces';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import { UserStatus } from './Status';

const SlickSlider = () => {
  const [users, setUsers] = React.useState<AuthUserInfo[]>([]);
  const [busy, setBusy] = React.useState(false);

  // get all users from the database

  const settings = {
    swipe: true,
    touchMove: true,
    accessibility: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
    arrows: false,
    centerPadding: '0px',
    className: 'account-slider',
    initialSlide: 0,
    slidesPerRow: 1,
    variableWidth: true,
    // focusOnSelect: true,
    // pauseOnFocus: true,
    // pauseOnHover: true,
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

  const slickCliked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
  };

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
                      <img
                        src={user.picture || '/images/profile.png'}
                        className="img-fluid rounded-circle mb-3"
                        alt="profile-img"
                      />
                      <div className="position-absolute">
                        <UserStatus />
                      </div>
                    </Link>
                  </div>
                  <p className="fw-bold text-dark m-0">
                    {`${user.firstname} ${user.lastname}`}
                  </p>
                  <p className="small text-muted">Designer</p>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic checkbox toggle button group"
                  >
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={`btncheck_${user.firstname}`}
                    />
                    <label
                      className="btn btn-outline-primary btn-sm px-3 rounded-pill"
                      htmlFor={`btncheck_${user.firstname}`}
                    >
                      <span className="follow">+ Follow</span>
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

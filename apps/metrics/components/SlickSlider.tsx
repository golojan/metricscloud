import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import { useAtom } from "jotai";
import { profileAtom } from "../store";

function SlickSlider() {
  const [profile] = useAtom(profileAtom);

  const settings = {
    swipe: true,
    touchMove: true,
    accessibility: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    centerPadding: "0px",
    className: "account-slider",
    initialSlide: 0,
    slidesPerRow: 1,
    variableWidth: true,
    // focusOnSelect: true,
    // pauseOnFocus: true,
    // pauseOnHover: true,
    afterChange: (index: number) => {},
    beforeChange: (oldIndex: number, newIndex: number) => {},
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
        <div className="account-item">
          <div className="me-2 bg-white shadow-sm rounded-4 p-3 user-list-item d-flex justify-content-center my-2">
            <div className="text-center">
              <div className="position-relative d-flex justify-content-center">
                <a href="profile.html" className="text-decoration-none">
                  <img
                    src="/img/rmate1.jpg"
                    className="img-fluid rounded-circle mb-3"
                    alt="profile-img"
                  />
                  <div className="position-absolute">
                    <span className="material-icons bg-primary small p-1 fw-bold text-white rounded-circle">
                      done
                    </span>
                  </div>
                </a>
              </div>
              <p className="fw-bold text-dark m-0">Anisa Keena</p>
              <p className="small text-muted">Designer</p>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btncheck1"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary btn-sm px-3 rounded-pill"
                  htmlFor="btncheck1"
                >
                  <span className="follow">+ Follow</span>
                  <span className="following d-none">Following</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="account-item">
          <div className="me-2 bg-white shadow-sm rounded-4 p-3 user-list-item d-flex justify-content-center my-2">
            <div className="text-center">
              <div className="position-relative d-flex justify-content-center">
                <a href="profile.html" className="text-decoration-none">
                  <img
                    src="/img/rmate1.jpg"
                    className="img-fluid rounded-circle mb-3"
                    alt="profile-img"
                  />
                  <div className="position-absolute">
                    <span className="material-icons bg-primary small p-1 fw-bold text-white rounded-circle">
                      done
                    </span>
                  </div>
                </a>
              </div>
              <p className="fw-bold text-dark m-0">Anisa Keena</p>
              <p className="small text-muted">Designer</p>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btncheck1"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary btn-sm px-2 rounded-pill"
                  htmlFor="btncheck1"
                >
                  <span className="follow">+ Follow</span>
                  <span className="following d-none">Following</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="account-item">
          <div className="me-2 bg-white shadow-sm rounded-4 p-3 user-list-item d-flex justify-content-center my-2">
            <div className="text-center">
              <div className="position-relative d-flex justify-content-center">
                <a href="profile.html" className="text-decoration-none">
                  <img
                    src="/img/rmate1.jpg"
                    className="img-fluid rounded-circle mb-3"
                    alt="profile-img"
                  />
                  <div className="position-absolute">
                    <span className="material-icons bg-primary small p-1 fw-bold text-white rounded-circle">
                      done
                    </span>
                  </div>
                </a>
              </div>
              <p className="fw-bold text-dark m-0">Anisa Keena</p>
              <p className="small text-muted">Designer</p>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btncheck1"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary btn-sm px-3 rounded-pill"
                  htmlFor="btncheck1"
                >
                  <span className="follow">+ Follow</span>
                  <span className="following d-none">Following</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="account-item">
          <div className="me-2 bg-white shadow-sm rounded-4 p-3 user-list-item d-flex justify-content-center my-2">
            <div className="text-center">
              <div className="position-relative d-flex justify-content-center">
                <a href="profile.html" className="text-decoration-none">
                  <img
                    src="/img/rmate1.jpg"
                    className="img-fluid rounded-circle mb-3"
                    alt="profile-img"
                  />
                  <div className="position-absolute">
                    <span className="material-icons bg-primary small p-1 fw-bold text-white rounded-circle">
                      done
                    </span>
                  </div>
                </a>
              </div>
              <p className="fw-bold text-dark m-0">Anisa Keena</p>
              <p className="small text-muted">Designer</p>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btncheck1"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary btn-sm px-3 rounded-pill"
                  htmlFor="btncheck1"
                >
                  <span className="follow">+ Follow</span>
                  <span className="following d-none">Following</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="account-item">
          <div className="me-2 bg-white shadow-sm rounded-4 p-3 user-list-item d-flex justify-content-center my-2">
            <div className="text-center">
              <div className="position-relative d-flex justify-content-center">
                <a href="profile.html" className="text-decoration-none">
                  <img
                    src="/img/rmate1.jpg"
                    className="img-fluid rounded-circle mb-3"
                    alt="profile-img"
                  />
                  <div className="position-absolute">
                    <span className="material-icons bg-primary small p-1 fw-bold text-white rounded-circle">
                      done
                    </span>
                  </div>
                </a>
              </div>
              <p className="fw-bold text-dark m-0">Anisa Keena</p>
              <p className="small text-muted">Designer</p>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btncheck1"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary btn-sm px-3 rounded-pill"
                  htmlFor="btncheck1"
                >
                  <span className="follow">+ Follow</span>
                  <span className="following d-none">Following</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
}

export default SlickSlider;

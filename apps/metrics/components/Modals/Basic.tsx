import Link from 'next/link';
import React from 'react';

const Basic = () => {
  return (
    <>
      <div
        className="modal fade"
        id="loginModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 p-4 border-0 bg-light">
            <div className="modal-header d-flex align-items-center justify-content-start border-0 p-0 mb-3">
              <Link
                href="#"
                className="text-muted text-decoration-none material-icons"
                data-bs-dismiss="modal"
              >
                arrow_back_ios_new
              </Link>
              <h5
                className="modal-title text-muted ms-3 ln-0"
                id="staticBackdropLabel"
              >
                Login to Metrics
              </h5>
            </div>
            <div className="modal-body p-0 mb-3">
              <div className="form-floating">
                <textarea
                  className="form-control rounded-5 border-0 shadow-sm"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 200 }}
                  defaultValue={''}
                />
                <label
                  htmlFor="floatingTextarea2"
                  className="h6 text-muted mb-0"
                >
                  What&apos;s on your mind...
                </label>
              </div>
            </div>
            <div className="modal-footer justify-content-start px-1 py-1 bg-white shadow-sm rounded-5">
              <div className="rounded-4 m-0 px-3 py-2 d-flex align-items-center justify-content-between w-75">
                <Link
                  href="#"
                  className="text-muted text-decoration-none material-icons"
                >
                  insert_link
                </Link>
                <Link
                  href="#"
                  className="text-muted text-decoration-none material-icons"
                >
                  image
                </Link>
                <Link
                  href="#"
                  className="text-muted text-decoration-none material-icons"
                >
                  smart_display
                </Link>
                <span className="text-muted">0/500</span>
              </div>
              <div className="ms-auto m-0">
                <Link
                  data-bs-dismiss="modal"
                  href="#"
                  className="btn btn-primary rounded-5 fw-bold px-3 py-2 fs-6 mb-0 d-flex align-items-center"
                >
                  <span className="material-icons me-2 md-16">send</span>Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Basic;

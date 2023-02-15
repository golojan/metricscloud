import React from 'react';
import { toast } from 'react-toastify';
import { cloudLogin } from '@metricsai/metrics-hocs';

function LoginTabContents() {

  const apiUri = process.env.NEXT_PUBLIC_API_URI;

  const [login, setLogin] = React.useState({
    username: '',
    password: '',
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${apiUri}accounts/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    });
    const { status, token } = await response.json();
    if (status) {
      toast.success(`Account found, redirecting you to your profile page...`, {
        toastId: 'account-login-success',
      });
      cloudLogin(token);
    } else {
      toast.error(
        `Invalid Email or Password: Try again or try resetting your password.`,
        {
          toastId: 'account-login-success',
        }
      );
    }
  };

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="pills-login"
        role="tabpanel"
        aria-labelledby="pills-login-tab"
      >
        <div className="mb-2">
          <header className="profile d-flex align-items-center">
            <img
              alt="#"
              src="/images/avatar/user.png"
              className="rounded-circle me-3"
            />
            <div>
              <span className="text-muted text_short">Welcome back Guest</span>
              <h5 className="mb-0 text-dark">
                <span className="fw-bold">Login to Metrics</span>
              </h5>
            </div>
          </header>
        </div>
        <div className="feeds">
          <div className="bg-white px-4 py-4 feed-item rounded-4 shadow-sm mb-3 faq-page">
            <form onSubmit={handleLogin}>
              <div className="row justify-content-center pt-4">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="email" className="text-lg">
                        Email Address
                      </label>
                      <div className="form-floating mb-3 d-flex align-items-end">
                        <input
                          type="email"
                          required={true}
                          className="form-control rounded-5"
                          id="emailaddress"
                          placeholder="Email Address"
                          onChange={(e) =>
                            setLogin({
                              ...login,
                              username: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="emailaddress">EMAIL ADRESS</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="email" className="text-lg">
                        Password
                      </label>
                      <div className="form-floating mb-3 d-flex align-items-center">
                        <input
                          type="password"
                          required={true}
                          className="form-control rounded-5"
                          id="password"
                          placeholder="Password"
                          onChange={(e) =>
                            setLogin({
                              ...login,
                              password: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="password">PASSWORD</label>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-primary rounded-5 w-100 text-decoration-none py-3 fw-bold text-uppercase m-0">
                      LOGIN
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginTabContents;

import React, { RefObject, useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';

import { withAuth } from '../../hocs/auth/withAuth';
import { NextPage } from 'next';

import { AccountTypes, Gender } from '@metricsai/metrics-interfaces';
import { AuthUserInfo } from '@metricsai/metrics-interfaces';

import validator from 'validator';
import { hasSpacialChars } from '../../libs/hasSpacialChars';
import { toast } from 'react-toastify';
import {
  busyAtom,
  profileAtom,
  publicProfileAtom,
  schoolsAtom,
} from '@metricsai/metrics-store';
import { useAtom } from 'jotai';

const ProfileInfoByToken = async (token: string) => {
  const response = await fetch(`/api/accounts/${token}/profile`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

const getSchools = async () => {
  const response = await fetch(`/api/schools/list`);
  const data = await response.json();
  if (data.status) {
    return data.schools;
  } else {
    return [];
  }
};

const EditProfile: NextPage = ({ token }: any) => {
  // Username Processing System //

  const [busy, setBusy] = useAtom(busyAtom);

  const [profile, setProfile] = useAtom(profileAtom);
  const [_, setSchools] = useAtom(schoolsAtom);

  const [bioCount, setBioCount] = useState<number>(0);

  const [unState, setUnState] = useState(false);
  const [unError, setUnError] = useState<string | any>('');
  const usernameRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const buttonRef: RefObject<HTMLButtonElement> =
    useRef<HTMLButtonElement>(null);
  const aboutMeRef: RefObject<HTMLTextAreaElement> =
    useRef<HTMLTextAreaElement>(null);

  const minUsernameLength = process.env.NEXT_PUBLIC_MIN_USERNAME_LENGTH || 5;
  const aboutMeLength = process.env.NEXT_PUBLIC_ABOUT_ME_LENGTH || 200;

  const busyURef = () => {
    setUnError('Checking...');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control rounded-5 border-5 bg-blue-100 focus:bg-blue-100';
      usernameRef.current.disabled = true;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };
  const wrongURef = () => {
    setUnError('Username is invalid.');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control rounded-5 border-5 border-red-500  bg-red-200';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };
  const rightURef = () => {
    setUnError('');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control rounded-5 border-5 border-green-300  bg-green-100';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
  };

  const existURef = () => {
    setUnError('Username is already in use.');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control rounded-5 border-5 border-red-300  bg-red-100';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  // check if username is available
  const checkUsername = async () => {
    setUnState(true);
    let newUsername = validator.trim(usernameRef.current?.value as string);
    newUsername = validator.escape(newUsername);
    if (
      validator.isEmpty(newUsername) ||
      newUsername.length < minUsernameLength ||
      validator.isEmail(newUsername) ||
      validator.contains(newUsername, '@') ||
      hasSpacialChars(newUsername)
    ) {
      wrongURef();
      return;
    }
    busyURef();
    const response = await fetch('/api/accounts/checkusername', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername }),
    });
    const { status } = await response.json();
    if (!status) {
      rightURef();
    } else {
      existURef();
    }
    setUnState(false);
  };

  // Username Processing System //

  // const [profile, setProfile] = useState<AuthUserInfo>({});
  // useEffect(() => {
  //   getProfileInfo(token).then((res: AuthUserInfo) => {
  //     setProfile(res);
  //   });
  // }, [token]);

  useEffect(() => {
    setBusy(true);
    ProfileInfoByToken(token as string).then((res: AuthUserInfo) => {
      setProfile(res);
    });
    getSchools().then((res) => {
      setSchools(res);
    });
    setBusy(false);
  }, [token]);

  const handleUsernameUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `/api/accounts/${token}/update-profile-username`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: profile.username }),
      }
    );
    const { status } = await response.json();
    if (status) {
      toast.success(`Username @${profile.username} updated successfully.`, {
        toastId: 'username-update-success',
      });
    } else {
      toast.error(`Failed to update username @${profile.username}.`, {
        toastId: 'username-update-success',
      });
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `/api/accounts/${token}/update-profile-basics`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      }
    );
    const { status } = await response.json();
    if (status) {
      toast.success(`Profile Updated.`, {
        toastId: 'profile-update-success',
      });
    } else {
      toast.error(`Failed to update Profile.`, {
        toastId: 'profile-update-success',
      });
    }
  };

  const aboutMeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (aboutMeRef.current) {
      setBioCount(e.target.value.length);
      if (e.target.value.length <= aboutMeLength) {
        setProfile({ ...profile, aboutMe: e.target.value });
      }
      const height = aboutMeRef.current.scrollHeight;
      aboutMeRef.current.style.height = `${height}px`;
    }
    return;
  };
  return (
    <>
      <Layout>
        <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
          <div className="main-content">
            <div className="feeds">
              <div className="bg-white p-4 feed-item rounded-4 shadow-sm faq-page mb-3">
                <div className="mb-3">
                  <h5 className="lead fw-bold text-body mb-0">Upload Photo</h5>
                  <p className="mb-0">
                    Please upload your real face for profile photo. Memes and
                    avatars will be rejected. Our team will review your photo
                    and approve it against you valid ID verification may be
                    required.
                  </p>
                  <header className="profile d-flex align-items-center mt-4">
                    <img
                      alt="#"
                      src={profile.picture}
                      className="rounded-circle me-3"
                    />
                    <div>
                      <span className="text-muted text_short">
                        How are you doing
                      </span>
                      <h5 className="mb-0 text-dark">
                        <span className="fw-bold">
                          {profile.lastname} {profile.firstname}
                        </span>
                      </h5>
                    </div>
                  </header>
                </div>
              </div>
              <div className="mb-3"></div>
              <div className="bg-white px-4 py-4 feed-item rounded-4 shadow-sm mb-3 faq-page">
                <div className="mb-3">
                  <h5 className="lead fw-bold text-body ">Update Username</h5>
                  <p className="mb-0">
                    Your username is your unique identity on the platform. It is
                    a good idea to use a combination of your real name.
                  </p>
                </div>
                <form onSubmit={handleUsernameUpdate}>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <div className="float-right">
                        <strong className="text-md text-red-500">
                          {unError}
                        </strong>
                      </div>
                      <label htmlFor="username" className="text-md ml-1">
                        Enter Unique Username:
                      </label>
                      <div className="form-floating mb-3 d-flex align-items-end ">
                        <input
                          type="text"
                          ref={usernameRef}
                          required={true}
                          className="form-control rounded-5 border-5 bg-blue-100 focus:bg-red-100"
                          id="username"
                          placeholder="Username"
                          autoComplete="off"
                          pattern="[0-9a-zA-Z_]*"
                          value={profile.username}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              username: e.target.value,
                            })
                          }
                          onBlur={checkUsername}
                        />
                        <label htmlFor="username">UNIQUE USERNAME</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
                      disabled={true}
                      name="username"
                      className="btn btn-primary rounded-5 w-100 text-decoration-none py-3 fw-bold text-uppercase m-0"
                      ref={buttonRef}
                    >
                      UPDATE USERNAME
                    </button>
                  </div>
                </form>
              </div>

              <div className="mb-3"></div>
              <div className="bg-white px-4 py-4 feed-item rounded-4 shadow-sm mb-3 faq-page">
                <div className="mb-1">
                  <h5 className="lead fw-bold text-body mb-0">Edit Profile</h5>
                </div>
                <form onSubmit={handleProfileUpdate}>
                  <div className="row py-3 gy-3 m-0">
                    <div className="langauge-item col-12 col-md-4 px-1 mt-2">
                      <input
                        type="radio"
                        required={true}
                        className="btn-check"
                        id="guest"
                        name="membership"
                        value={AccountTypes.ALUMNI}
                        checked={
                          profile.accountType ==
                          AccountTypes[AccountTypes.ALUMNI]
                        }
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            accountType: e.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="guest"
                        className="btn btn-language btn-sm px-2 py-2 rounded-5 d-flex align-items-center justify-content-between"
                      >
                        <span className="text-start d-grid">
                          <small className="ln-18">I am an Alumni</small>
                        </span>
                        <span className="material-icons text-muted md-20">
                          check_circle
                        </span>
                      </label>
                    </div>

                    <div className="langauge-item col-12 col-md-4 px-1 mt-2">
                      <input
                        type="radio"
                        required={true}
                        className="btn-check"
                        id="student"
                        name="membership"
                        value={AccountTypes.STUDENT}
                        checked={
                          profile.accountType ==
                          AccountTypes[AccountTypes.STUDENT]
                        }
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            accountType: e.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="student"
                        className="btn btn-language btn-sm px-2 py-2 rounded-5 d-flex align-items-center justify-content-between"
                      >
                        <span className="text-start d-grid">
                          <small className="ln-18">I am a Student</small>
                        </span>
                        <span className="material-icons text-muted md-20">
                          check_circle
                        </span>
                      </label>
                    </div>

                    <div className="langauge-item col-12 col-md-4 px-1 mt-2">
                      <input
                        type="radio"
                        required={true}
                        className="btn-check"
                        id="lecturer"
                        name="membership"
                        value={AccountTypes.LECTURER}
                        checked={
                          profile.accountType ==
                          AccountTypes[AccountTypes.LECTURER]
                        }
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            accountType: e.target.value,
                          })
                        }
                      />
                      <label
                        htmlFor="lecturer"
                        className="btn btn-language btn-sm px-2 py-2 rounded-5 d-flex align-items-center justify-content-between"
                      >
                        <span className="text-start d-grid">
                          <small className="ln-18">I am a Lecturer</small>
                        </span>
                        <span className="material-icons text-muted md-20">
                          check_circle
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-floating mb-3 d-flex align-items-end">
                            <input
                              type="text"
                              required={true}
                              className="form-control rounded-5"
                              placeholder="Firstname"
                              id="firstname"
                              value={profile.firstname}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  firstname: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="firstname">FIRST NAME</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3 d-flex align-items-end">
                            <input
                              type="text"
                              required={true}
                              className="form-control rounded-5"
                              id="lastname"
                              value={profile.lastname}
                              placeholder="Lastname"
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  lastname: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="lastname">LAST NAME</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label className="mb-4 text-muted ">GENDER</label>
                          <div className="d-flex align-items-center mb-3 px-0">
                            <div className="form-check mx-3 w-full">
                              <input
                                className="form-check-input"
                                type="radio"
                                required={true}
                                name="gender"
                                id="male"
                                value={Gender.MALE}
                                checked={
                                  profile.gender === Gender.MALE ? true : false
                                }
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    gender: e.target.value,
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="male"
                              >
                                Male
                              </label>
                            </div>
                            <div className="form-check mx-3 w-full">
                              <input
                                className="form-check-input"
                                type="radio"
                                required={true}
                                name="gender"
                                id="female"
                                value={Gender.FEMALE}
                                checked={
                                  profile.gender === Gender.FEMALE
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    gender: e.target.value,
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="female"
                              >
                                Female
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <label className="mb-2 text-muted ">
                            DATE OF BIRTH
                          </label>
                          <div className="form-floating mb-3 d-flex align-items-center">
                            <input
                              type="date"
                              className="form-control rounded-5"
                              id="birthday"
                              placeholder="DATE OF BIRTH"
                              value={profile.birthday}
                              defaultValue={profile.birthday}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  birthday: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="birthday">DATE OF BIRTH</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="aboutMe" className="text-lg">
                            Write a short public Bio for your profile.
                          </label>
                          <div className="form-floating mb-3 d-flex align-items-end mt-2">
                            <textarea
                              ref={aboutMeRef}
                              required={true}
                              maxLength={aboutMeLength as number}
                              className="form-control rounded-5 text-xl"
                              placeholder="About me"
                              id="aboutMe"
                              value={profile.aboutMe}
                              onChange={(e) => aboutMeChange(e)}
                            >
                              {profile.aboutMe}
                            </textarea>
                            <label htmlFor="aboutMe">
                              About Me -{' '}
                              <strong className="text-danger">
                                {bioCount}
                              </strong>{' '}
                              of {aboutMeLength as number} chars.
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="d-grid">
                        <button className="btn btn-primary rounded-5 w-100 text-decoration-none py-3 fw-bold text-uppercase m-0">
                          SAVE PROFILE
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default withAuth(EditProfile);

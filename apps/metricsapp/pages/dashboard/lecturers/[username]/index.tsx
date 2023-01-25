import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import AppDrawer from '../../../../serverlets/AppDrawer';
import Image from 'next/image';

import AppHeader from '../../../../serverlets/AppHeader';
import Copyright from '../../../../serverlets/Copyright';
import { withAuth } from '@metricsai/metrics-hocs';
import { compose } from 'redux';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@metricsai/metrics-store';
import { useRouter } from 'next/router';
import {
  AuthUserInfo,
  GSRanking,
  LecturerInfo,
} from '@metricsai/metrics-interfaces';
import cookie from 'js-cookie';
import { loadLecturers } from '@metricsai/metrics-utils';
import ScholarRatingLarge from '../../../../components/ScholarRatingLarge';
import ScholarRatingSmall from '../../../../components/ScholarRatingSmall';

const Profile: NextPage = () => {
  const domain = cookie.get('domain');
  const router = useRouter();
  const { username } = router.query;
  const dispatch = useDispatch<Dispatch>();
  const { lecturersCount, lecturers, list, lecturerId } = useSelector(
    (state: RootState) => state.lecturers
  );
  const { departments } = useSelector((state: RootState) => state.departments);
  const [thisLecturer, setThisLecturer] = useState<AuthUserInfo>({} as AuthUserInfo);
  useEffect(() => {
    const getLecturer = async () => {
      const response = await fetch(`/api/lecturers/info/${username}`);
      const { status, data } = await response.json();
      return status ? data : {};
    };
    getLecturer()
      .then((data) => {
        setThisLecturer(data);
      })
      .catch((err: Error) => console.log(err));
  }, [username]);

  const [ranking, setRanking] = useState<GSRanking>({
    scrap: false,
  });

  const startScrapper = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch('/api/scrape', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ url: ranking.googleScholarId }),
    })
      .then((res) => res.json())
      .then(({ status, ranking }) => {
        if (status) {
          setRanking({ ...ranking });
        }
      });
  };

  const saveRanking = (e: React.SyntheticEvent, lecturer_id: string) => {
    e.preventDefault();
    dispatch.lecturers.setBusy(true);
    fetch(`/api/lecturers/update/${lecturer_id}/ranking`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(ranking),
    })
      .then((res) => res.json())
      .then(({ status, data }) => {
        if (status) {
          // Load All Lecturers //
          loadLecturers(domain as string)
            .then((lecturers) => {
              dispatch.lecturers.setLecturers(lecturers.data);
              dispatch.lecturers.setLecturersCount(lecturers.data.length);
            })
            .catch();

          // Load All Lecturers //
        }
      });
    dispatch.lecturers.setBusy(false);
  };

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance row">
                <div className="left">
                  {/* <ShowChartButton show={true} /> */}
                  <span className="title">Manage Lecturers</span>
                  <h1 className="total">
                    {thisLecturer.lastname} {thisLecturer.firstname}{' '}
                    {thisLecturer.middlename}
                  </h1>
                </div>
                <div className="right flex">
                  <ScholarRatingLarge lecturer={thisLecturer} />
                  <ScholarRatingSmall lecturer={thisLecturer} />
                </div>
              </div>
              <hr className="my-1" />
              <div className="balance row">
                <div className="col-12 mb-1">
                  <span className="text-lg font-bold text-blue-500">
                    Scrap International Ranking Data
                  </span>
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                  <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                    <input
                      type="text"
                      className="form-control relative flex-auto min-w-0 block text-md w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder={``}
                      value={ranking.googleScholarId}
                      onChange={(e) =>
                        setRanking({
                          ...ranking,
                          googleScholarId: e.target.value,
                        })
                      }
                    />
                    <div className="input-group-append ">
                      <button
                        onClick={startScrapper}
                        className="btn btn-primary h-full relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:outline-none"
                      >
                        Scrape
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                  <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                    <input
                      type="number"
                      className="form-control  text-center relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder={'citations'}
                      value={ranking.citations}
                      readOnly={true}
                      onChange={(e) =>
                        setRanking({
                          ...ranking,
                          citations: parseInt(e.target.value),
                        })
                      }
                    />
                    <input
                      type="number"
                      className="form-control text-center relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder={'hindex'}
                      value={ranking.hindex}
                      readOnly={true}
                      onChange={(e) =>
                        setRanking({
                          ...ranking,
                          hindex: parseInt(e.target.value),
                        })
                      }
                    />
                    <input
                      type="number"
                      className="form-control text-center relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder={'i10-h'}
                      value={ranking.i10hindex}
                      readOnly={true}
                      onChange={(e) =>
                        setRanking({
                          ...ranking,
                          i10hindex: parseInt(e.target.value),
                        })
                      }
                    />
                    <div className="input-group-append ">
                      <button
                        disabled={false}
                        onClick={(e) => saveRanking(e, lecturerId)}
                        className="btn btn-primary h-full relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:outline-none"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section pt-1">
            <div className="row ">
              <div className="col-12 col-md-12 col-lg-4 fa-border">
                <div className="stat-box p-3">
                  <table className="table table-condensed text-block">
                    <tbody>
                      <tr>
                        <td scope="row">Staff Number</td>
                        <td className="text-black">
                          {thisLecturer.staffNumber}
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">
                          {thisLecturer.picture ? (
                            <Image
                              src={`${thisLecturer.picture}`}
                              alt={`${thisLecturer.firstname}`}
                              width={90}
                              height={90}
                              className="float-left mr-2 imaged h-full"
                            />
                          ) : (
                            <></>
                          )}
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td scope="row">Email</td>
                        <td className="text-black">{thisLecturer.email}</td>
                      </tr>
                      <tr>
                        <td scope="row">Mobile</td>
                        <td className="text-black">{thisLecturer.mobile}</td>
                      </tr>
                      <tr>
                        <td scope="row">Type</td>
                        <td className="text-black">
                          {thisLecturer.accountType}
                        </td>
                      </tr>
                      <tr>
                        <td scope="row">Level</td>
                        <td className="text-black">{0}</td>
                      </tr>
                      <tr>
                        <td scope="row">Level</td>
                        <td className="text-black">{0}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`col-12 col-md-12 col-lg-8 min-h-screen`}></div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="lecturers" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Profile);

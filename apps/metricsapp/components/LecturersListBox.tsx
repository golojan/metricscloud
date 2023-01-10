import React, { useRef, useState } from 'react';
import ShowChartButton from '../components/ShowChartButton';
import Image from 'next/image';

import { Virtuoso } from 'react-virtuoso';

import ScholarRatingLarge from './ScholarRatingLarge';
import ScholarRatingSmall from './ScholarRatingSmall';
import { GSRanking, ScholarsProps } from '@metricsai/metrics-interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@metricsai/metrics-store';
import { getDepartment, loadLecturers } from '../utils/queries';
import { Gender } from '@metricsai/metrics-interfaces';
import Link from 'next/link';
import cookie from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList } from '@fortawesome/free-solid-svg-icons';

const LecturersListBox = ({ lecturers }: ScholarsProps) => {
  //
  const domain = cookie.get('domain');

  const dispatch = useDispatch<Dispatch>();
  const { departments } = useSelector((state: RootState) => state.departments);
  const { lecturerId } = useSelector((state: RootState) => state.lecturers);
  const hasLecturerID: boolean = lecturerId.length > 0 ? true : false;

  const [ranking, setRanking] = useState<GSRanking>({
    scrap: false,
    url: 'https://scholar.google.com/citations?user=H3PEkCEAAAAJ&hl=en',
  });

  const saveButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrapeButtonRef = useRef<HTMLButtonElement | null>(null);

  const resetLecturerId = (e: React.SyntheticEvent, lecturer_id: string) => {
    dispatch.lecturers.setLecturerId(lecturer_id as string);
    setRanking({
      scrap: false,
      url: 'https://scholar.google.com/citations?user=H3PEkCEAAAAJ&hl=en',
    });
  };

  const startScrapper = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch('/api/scrape', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ url: ranking.url }),
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
      <Virtuoso
        data={lecturers}
        totalCount={lecturers.length}
        itemContent={(index, lecturer) => (
          <>
            <div
              className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2 row-auto text-left stat-box"
              key={index}
            >
              <Image
                src={`${lecturer.avatar}`}
                alt={`${lecturer.firstname}`}
                width={90}
                height={90}
                className="float-left mr-2 imaged"
              />
              <ShowChartButton show={false} />
              <div className="title my-0">
                <strong className="text-black">
                  {
                    getDepartment(departments, lecturer.departmentId as string)
                      ?.name
                  }
                </strong>
              </div>
              <h4 className="h3 my-1">
                <Link href={`/dashboard/lecturers/${lecturer._id}/profile`}>
                  <strong className="text-green-700">
                    {lecturer.lastname}
                  </strong>
                  , {lecturer.firstname} {lecturer.middlename}
                </Link>
                <small>
                  <Link
                    href={'#'}
                    onClick={(e) => resetLecturerId(e, lecturer._id as string)}
                  >
                    <FontAwesomeIcon icon={faList} />
                  </Link>
                </small>
              </h4>
              <div className="text-md mt-0">
                <span>ID:</span>{' '}
                <span className="text-black">{lecturer.staffNumber}</span>
                <span className="text-gray-400"> | </span>
                <span>
                  {lecturer.gender === Gender.MALE ? 'Male' : 'Female'}
                </span>
              </div>
              <ScholarRatingLarge lecturer={lecturer} />
              <ScholarRatingSmall lecturer={lecturer} />
              {hasLecturerID && lecturerId === lecturer._id ? (
                <>
                  <div className="stat-box mt-2 min-h-[100px] w-full border-fuchsia-500 shadow bg-gray-400">
                    <div className="row">
                      <div className="col-12 mb-1">
                        <span className="text-lg">
                          Scrap International Ranking Data{' '}
                        </span>
                      </div>
                      <div className="col-7">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                          <input
                            type="text"
                            className="form-control relative flex-auto min-w-0 block text-md w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder={`https://metrics.com/profile/39wkui4jddj`}
                            value={ranking.url}
                            onChange={(e) =>
                              setRanking({ ...ranking, url: e.target.value })
                            }
                          />
                          <div className="input-group-append ">
                            <button
                              ref={scrapeButtonRef}
                              onClick={startScrapper}
                              className="btn btn-primary h-full relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:outline-none"
                            >
                              Scrape
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-5">
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
                              ref={saveButtonRef}
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
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      />
    </>
  );
};

export default LecturersListBox;

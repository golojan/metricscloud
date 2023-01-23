import React, { useRef, useState } from 'react';
import ShowChartButton from './../ShowChartButton';
import Image from 'next/image';

import { Virtuoso } from 'react-virtuoso';

import ScholarRankingLarge from './ScholarRankingLarge';
import ScholarRankingSmall from './ScholarRankingSmall';
import {
  ScholarsProps,
  Gender,
  AuthUserInfo,
} from '@metricsai/metrics-interfaces';
import { getDepartment } from '@metricsai/metrics-utils';
import Link from 'next/link';
import { authSchoolId } from '@metricsai/metrics-hocs';

type IProps = {
  lecturers: AuthUserInfo[];
  loading: boolean;
};
const LecturersDataTable = (props: IProps) => {
  const { lecturers, loading } = props;
  //
  const [busy, setBusy] = useState<boolean>(false);
  const schoolId = authSchoolId();

  return (
    <>
      <Virtuoso
        data={lecturers}
        totalCount={lecturers?.length}
        itemContent={(index, lecturer) => (
          <>
            <div
              className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2 row-auto text-left stat-box h-auto border-fuchsia-500 shadow bg-gray-400"
              key={index}
            >
              <Image
                src={`${lecturer.picture}`}
                alt={`${lecturer.firstname}`}
                width={70}
                height={70}
                className="float-left mr-2 imaged"
              />
              <ShowChartButton show={false} />
              <div className="title my-0">
                <strong className="text-black">MME</strong>
              </div>
              <h4 className="h3 my-1">
                <Link href={`/dashboard/lecturers/${lecturer._id}/profile`}>
                  <strong className="text-green-700">
                    {lecturer.lastname}
                  </strong>
                  , {lecturer.firstname} {lecturer.middlename}
                </Link>
              </h4>
              <div className="text-md mt-0">
                <span>ID:</span>{' '}
                <span className="text-black">{lecturer.username}</span>
                <span className="text-gray-400"> | </span>
                <span>
                  {lecturer.gender === Gender.MALE ? 'Male' : 'Female'}
                </span>
              </div>
              <ScholarRankingLarge lecturer={lecturer} />
              <ScholarRankingSmall lecturer={lecturer} />
            </div>
          </>
        )}
      />
    </>
  );
};

export default LecturersDataTable;

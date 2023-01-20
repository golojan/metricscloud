import React, { useRef, useState } from 'react';
import ShowChartButton from './ShowChartButton';
import Image from 'next/image';

import { Virtuoso } from 'react-virtuoso';

import ScholarRatingSmall from './ScholarRatingSmall';
import { ScholarsProps } from '@metricsai/metrics-interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@metricsai/metrics-store';
import { getDepartment } from '@metricsai/metrics-utils';
import { Gender } from '@metricsai/metrics-interfaces';
import Link from 'next/link';
import cookie from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { authSchoolId } from '@metricsai/metrics-hocs';

const LecturersListBox = ({ students }: ScholarsProps) => {
  //
  const dispatch = useDispatch<Dispatch>();
  const { departments } = useSelector((state: RootState) => state.departments);
  const { lecturerId } = useSelector((state: RootState) => state.lecturers);
  const hasLecturerID: boolean = lecturerId.length > 0 ? true : false;

  return (
    <>
      <Virtuoso
        data={students}
        totalCount={students.length}
        itemContent={(index, student) => (
          <>
            <div
              className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2 row-auto text-left stat-box"
              key={index}
            >
              <Image
                src={`${student.picture}`}
                alt={`${student.firstname}`}
                width={90}
                height={90}
                className="float-left mr-2 imaged"
              />
              <ShowChartButton show={false} />
              <div className="title my-0">
                <strong className="text-black">
                  {
                    getDepartment(departments, student.departmentId as string)
                      ?.name
                  }
                </strong>
              </div>
              <h4 className="h3 my-1">
                <Link href={`/dashboard/lecturers/${student._id}/profile`}>
                  <strong className="text-green-700">{student.lastname}</strong>
                  , {student.firstname} {student.middlename}
                </Link>
                <small>
                  <Link href={'#'}>
                    <FontAwesomeIcon icon={faList} />
                  </Link>
                </small>
              </h4>
              <div className="text-md mt-0">
                <span>ID:</span>{' '}
                <span className="text-black">{student.username}</span>
                <span className="text-gray-400"> | </span>
                <span>
                  {student.gender === Gender.MALE ? 'Male' : 'Female'}
                </span>
              </div>
              <ScholarRatingSmall lecturer={student} />
            </div>
          </>
        )}
      />
    </>
  );
};

export default LecturersListBox;

import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { perc } from '@metricsai/metrics-utils';
import { RootState } from '@metricsai/metrics-store';
import { useSelector } from 'react-redux';

const InternationalStudents = () => {
  const { statistics_students } = useSelector(
    (state: RootState) => state.students
  );

  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          {JSON.stringify(statistics_students)}
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">% International Students</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {perc(
              statistics_students.internationalStaff,
              statistics_students.totalStaff
            )}
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600 small">
              {perc(
                statistics_students.internationalStaff,
                statistics_students.totalStaff
              )}
            </strong>
            {'% '}
            of{' '}
            <strong className="text-green-600">
              {statistics_students.totalStaff}
            </strong>{' '}
            staff are Foreign Students
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default InternationalStudents;

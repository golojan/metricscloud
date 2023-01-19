import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { perc } from '@metricsai/metrics-utils';
import { authSchoolId } from '@metricsai/metrics-hocs';
import { RootState } from '@metricsai/metrics-store';
import { useSelector } from 'react-redux';

const InternationalStaff = () => {
  const { statistics_lecturers } = useSelector(
    (state: RootState) => state.lecturers
  );

  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">% International Staff</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {perc(
              statistics_lecturers.internationalStaff,
              statistics_lecturers.totalStaff
            )}
            %
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600 small">
              {perc(
                statistics_lecturers.internationalStaff,
                statistics_lecturers.totalStaff
              )}
            </strong>
            {'% '}
            of{' '}
            <strong className="text-green-600">
              {statistics_lecturers.totalStaff}
            </strong>{' '}
            staff are Foreign staff
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default InternationalStaff;

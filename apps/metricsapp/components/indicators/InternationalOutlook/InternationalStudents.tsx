import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { authSchoolId } from '@metricsai/metrics-hocs';
import useSWR from 'swr';
import { GSIRanking } from '@metricsai/metrics-interfaces';

const InternationalStudents = () => {

  const schoolId = authSchoolId();
  const { data: statistics, error, isLoading } = useSWR<GSIRanking>(`/api/schools/${schoolId}/stats`, () => fetch(`/api/schools/${schoolId}/stats`).then((res) => res.json()));

  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">% International Students</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {isLoading ? '...' : statistics.percentageOfInternationalStudents}%
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600 small">{isLoading ? '...' : statistics.percentageOfInternationalStudents}</strong>
            {'% '}
            of <strong className="text-green-600">{isLoading ? '...' : statistics.totalStudents}</strong> are Foreign
            students
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default InternationalStudents;

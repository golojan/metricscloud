import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { addCitations, loadLecturersRanking } from '@metricsai/metrics-utils';
import { GSIRanking } from '@metricsai/metrics-interfaces';
import useSWR from 'swr';
import { authSchoolId } from '@metricsai/metrics-hocs';

const PerCapitaAllCitations = () => {
  const schoolId = authSchoolId();
  const { data: lecturers, error, isLoading } = useSWR<GSIRanking[]>(`/api/lecturers/${schoolId}/ranking`, () => loadLecturersRanking(schoolId));
  const tTotal = addCitations(lecturers);
  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">Citations Per Capita</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {isLoading ? '...' : tTotal}
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600">{isLoading ? '...' : tTotal}</strong>{' '}
            citations by{' '}
            <strong className="text-green-600">{isLoading ? '...' : lecturers.length}</strong>{' '}
            staff
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default PerCapitaAllCitations;

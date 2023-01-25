import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GSIRanking, SchoolRank } from '@metricsai/metrics-interfaces';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { addCitations, addGooglePresence, loadLecturersRanking, perc } from '@metricsai/metrics-utils';
import useSWR from 'swr';
import { authSchoolId } from '@metricsai/metrics-hocs';

const GoogleScholarPresence = () => {
  const schoolId = authSchoolId();
  const { data: lecturers, error, isLoading } = useSWR<GSIRanking[]>(`/api/lecturers/${schoolId}/ranking`, () => loadLecturersRanking(schoolId));
  const tTotal = addGooglePresence(lecturers);
  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">% Google Scholar Presence</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {isLoading ? '...' : tTotal}%
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600 small">
              {isLoading ? '...' : tTotal}%
            </strong>
            {'% '}
            of <strong className="text-green-600">
              {isLoading ? '...' : lecturers.length}
            </strong>{' '}
            staff are Google Scholar
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default GoogleScholarPresence;

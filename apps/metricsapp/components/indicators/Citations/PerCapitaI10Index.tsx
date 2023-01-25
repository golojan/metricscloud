import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GSIRanking, SchoolRank } from '@metricsai/metrics-interfaces';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { loadLecturersRanking, addI10index } from '@metricsai/metrics-utils';
import useSWR from 'swr';
import { authSchoolId } from '@metricsai/metrics-hocs';

const PerCapitaI10Index = () => {
  const schoolId = authSchoolId();
  const { data: lecturers, error, isLoading } = useSWR<GSIRanking[]>(`/api/lecturers/${schoolId}/ranking`, () => loadLecturersRanking(schoolId));
  const tI10Index = addI10index(lecturers);
  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">i10-Index Per Capita</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {isLoading ? '...' : tI10Index}
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600">{isLoading ? '...' : tI10Index}</strong>{' '}
            i10-Index by{' '}
            <strong className="text-green-600">{isLoading ? '...' : lecturers.length}</strong>{' '}
            staff
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default PerCapitaI10Index;

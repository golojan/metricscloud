import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SchoolRank } from '@metricsai/metrics-interfaces';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { divide } from '@metricsai/metrics-utils';

interface IProps {
  ranking: SchoolRank;
}

const PerCapitaI10Index = (props: IProps) => {
  const { ranking } = props;
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
            {divide(ranking.i10hindex, ranking.totalStaff)}
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600">{ranking.i10hindex}</strong>{' '}
            i10-Index by{' '}
            <strong className="text-green-600">{ranking.totalStaff}</strong>{' '}
            staff
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default PerCapitaI10Index;
import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { SchoolRank } from '@metricsai/metrics-interfaces';

interface IProps {
  ranking: SchoolRank;
}

const InternationalColaborations = (props: IProps) => {
  const { ranking } = props;
  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">
              % Intnl. Colaborated Projects
            </strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {ranking.totalInternationalColaborations
              ? ranking.totalInternationalColaborations
              : 0}
            %
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600 small">
              {ranking.totalInternationalColaborations
                ? ranking.totalInternationalColaborations
                : 0}
            </strong>{' '}
            Intnl. projects
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default InternationalColaborations;

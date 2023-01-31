import React from 'react';
import { RootState } from '@metricsai/metrics-store';
import { useSelector } from 'react-redux';
import Wait from '../components/Wait';


const AppDashBoardTopMenuScores = () => {
  const { busy, statistics_school } = useSelector((state: RootState) => state.settings);
  return (
    <>
      <div className="balance">
        <div className="wallet-footer flex w-full border-t-0 border-0">
          <div className="item">
            <div>
              <span className="h1">{busy ? <Wait /> : statistics_school.citationsPerCapita?.toFixed(2)}</span>
              <strong>Citations Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{busy ? <Wait /> : statistics_school.hindexPerCapita?.toFixed(2)}</span>
              <strong>H-Index Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{busy ? <Wait /> : statistics_school.i10hindexPerCapita?.toFixed(2)}</span>
              <strong>i10-H-Index Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1 text-green-500">{busy ? <Wait /> : "~"}</span>
              <strong>Total</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDashBoardTopMenuScores;

import React from 'react';
import useSWR from 'swr';
import { authSchoolId } from '@metricsai/metrics-hocs';
import { GSIRanking } from '@metricsai/metrics-interfaces';


const AppDashBoardTopMenuScores = () => {

  const schoolId = authSchoolId();
  const { data: statistics, error, isLoading } = useSWR<GSIRanking>(`/api/schools/${schoolId}/stats`, () => fetch(`/api/schools/${schoolId}/stats`).then((res) => res.json()));
  return (
    <>
      <div className="balance">
        <div className="wallet-footer flex w-full border-t-0 border-0">
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : statistics.citationsPerCapita.toFixed(2)}</span>
              <strong>Citations Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : statistics.hindexPerCapita.toFixed(2)}</span>
              <strong>H-Index Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : statistics.i10hindexPerCapita.toFixed(2)}</span>
              <strong>i10-H-Index Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : statistics.total.toFixed(2)}</span>
              <strong>Total</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDashBoardTopMenuScores;

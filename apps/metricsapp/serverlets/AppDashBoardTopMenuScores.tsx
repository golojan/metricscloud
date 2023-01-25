import React from 'react';
import { loadLecturersStats } from '@metricsai/metrics-utils';
import useSWR from 'swr';
import { authSchoolId } from '@metricsai/metrics-hocs';
import { GSIRanking } from '@metricsai/metrics-interfaces';

const AppDashBoardTopMenuScores = () => {

  const schoolId = authSchoolId();

  const { data, error, isLoading } = useSWR<GSIRanking>('lecturers-stats', () => loadLecturersStats(schoolId));


  return (
    <>
      <div className="balance">
        <div className="wallet-footer flex w-full border-t-0 border-0">
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : data.citations}</span>
              <strong>Citations</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : data.hindex}</span>
              <strong>H-Index</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : data.i10hindex}</span>
              <strong>i10-H-Index</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : ((data.citations + data.hindex + data.i10hindex) / 3).toFixed(0)}</span>
              <strong>Total</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDashBoardTopMenuScores;

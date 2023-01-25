import React from 'react';
import { loadLecturersRanking } from '@metricsai/metrics-utils';
import useSWR from 'swr';
import { authSchoolId } from '@metricsai/metrics-hocs';
import { GSIRanking } from '@metricsai/metrics-interfaces';


const AppDashBoardTopMenuScores = () => {

  const schoolId = authSchoolId();

  const addCitations = (arr: Array<GSIRanking>): number => {
    return arr?.reduce((acc, obj) => acc + obj.citations, 0);
  }
  const addHindex = (arr: Array<GSIRanking>): number => {
    return arr?.reduce((acc, obj) => acc + obj.hindex, 0);
  }
  const addI10index = (arr: Array<GSIRanking>): number => {
    return arr?.reduce((acc, obj) => acc + obj.i10hindex, 0);
  }

  const addTotal = (arr: Array<GSIRanking>): number => {
    const cit = arr?.reduce((acc, obj) => acc + obj.citations, 0);
    const hin = arr?.reduce((acc, obj) => acc + obj.hindex, 0);
    const i10 = arr?.reduce((acc, obj) => acc + obj.i10hindex, 0);
    const total = ((cit + hin + i10) / 3).toFixed(0);
    return Number(total);
  };


  const { data: lecturers, error, isLoading } = useSWR<GSIRanking[]>(`/api/lecturers/${schoolId}/ranking`, () => loadLecturersRanking(schoolId));
  // i want to sum all the citations and hindex and i10hindex from the lecturers array

  const totalCitations = addCitations(lecturers);
  const totalHindex = addHindex(lecturers);
  const totalI10index = addI10index(lecturers);
  const total = addTotal(lecturers);

  return (
    <>
      <div className="balance">
        <div className="wallet-footer flex w-full border-t-0 border-0">
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : totalCitations}</span>
              <strong>Citations</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : totalHindex}</span>
              <strong>H-Index</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : totalI10index}</span>
              <strong>i10-H-Index</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{isLoading ? '...' : total}</span>
              <strong>Total</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDashBoardTopMenuScores;

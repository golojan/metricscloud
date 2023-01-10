import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  LecturerAnalitics,
  LecturerStats,
  StudentAnalitics,
  StudentStats,
} from '@metricsai/metrics-interfaces';
import ChartComponent from './ChartComponent';
import ShowChartButton from './ShowChartButton';

interface IProps {
  statistics_students?: StudentStats;
  analytics_students?: StudentAnalitics;
  statistics_lecturers?: LecturerStats;
  analytics_lecturers?: LecturerAnalitics;
}

const StudentTeacherRatio = ({
  statistics_students,
  analytics_students,
  statistics_lecturers,
  analytics_lecturers,
}: IProps) => {
  return (
    <>
      {' '}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box ">
          <ShowChartButton show={false} />
          <div className="title">
            <strong className="text-black">Student-Teacher Ratio</strong>
            <h1 className="total mt-2">
              <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
              {analytics_students?.STUDENT_TEACHER_RATIO}
            </h1>
            <ChartComponent
              labels={['Stud', 'Lects']}
              data={[statistics_students?.count, statistics_lecturers?.count]}
              color={['#3265af', 'black']}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { StudentTeacherRatio };

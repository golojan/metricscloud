import React from 'react';
import { StudentInfo } from '@metricsai/metrics-store';

type StudentProps = { student: StudentInfo };

const StudentRatingLarge = ({ student }: StudentProps) => {
  return (
    <>
      <div className="float-right text-center absolute top-9 right-5 flex">
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">
            {student.googlePresence}
          </strong>
          <br />
          <small>g.scholar</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">{student.citations}</strong>
          <br />
          <small>citations</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">{student.hindex}</strong>
          <br />
          <small>h-index</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">{student.i10hindex}</strong>
          <br />
          <small>i10-h-index</small>
        </h4>
      </div>
    </>
  );
};

export default StudentRatingLarge;

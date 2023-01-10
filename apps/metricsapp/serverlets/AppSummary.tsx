import Link from 'next/link';
import React from 'react';

import { Dispatch, RootState } from '@metricsai/metrics-store';
import { useDispatch, useSelector } from 'react-redux';

function AppSummary() {
  const { studentsCount } = useSelector((state: RootState) => state.students);
  const { lecturersCount } = useSelector((state: RootState) => state.lecturers);
  const { facultiesCount } = useSelector((state: RootState) => state.faculties);
  const { departmentsCount } = useSelector(
    (state: RootState) => state.departments
  );

  return (
    <>
      <div className="mx-5 mb-10  mt-4">
        <div className="section full">
          <div className="section-heading padding">
            <h3 className="title">
              Lecturers <span className="text-muted">({lecturersCount})</span>
            </h3>
            <Link href="/dashboard/lecturers" className="link">
              View All
            </Link>
          </div>
        </div>
        <div className="section full">
          <div className="section-heading padding">
            <h3 className="title">
              Students <span className="text-muted">({studentsCount})</span>
            </h3>
            <Link href="/dashboard/students" className="link">
              View All
            </Link>
          </div>
        </div>
        <div className="section full">
          <div className="section-heading padding">
            <h3 className="title">
              Faculties <span className="text-muted">({facultiesCount})</span>
            </h3>
            <Link href="/dashboard/faculties" className="link">
              View All
            </Link>
          </div>
        </div>

        <div className="section full">
          <div className="section-heading padding">
            <h3 className="title">
              Departments{' '}
              <span className="text-muted">({departmentsCount})</span>
            </h3>
            <Link href="/dashboard/departments" className="link">
              View All
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppSummary;

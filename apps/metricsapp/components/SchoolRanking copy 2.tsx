import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import ChartComponent from './ChartComponent';
import ShowChartButton from './ShowChartButton';
import { RootState, Dispatch } from '@metricsai/metrics-store';
import { useSelector, useDispatch } from 'react-redux';
import LooseBusy from './LooseBusy';
import Widget from '../widgets/Widget';
import PieChart from './charts/PieChart';

interface SRProps {
  schoolId: string;
}

const SchoolRanking = (props: SRProps) => {
  // const get the props;
  const { schoolId } = props;
  const { busy } = useSelector((state: RootState) => state.settings);
  const { ranking } = useSelector((state: RootState) => state.settings);

  const { analytics_students, statistics_students, sBusy } = useSelector(
    (state: RootState) => state.students
  );
  const { analytics_lecturers, statistics_lecturers, lBusy } = useSelector(
    (state: RootState) => state.lecturers
  );
  const { analytics_faculties, statistics_faculties, fBusy } = useSelector(
    (state: RootState) => state.faculties
  );
  const { analytics_departments, statistics_departments, dBusy } = useSelector(
    (state: RootState) => state.departments
  );

  const toggleChart = (indicator: string) => {
    return false;
  };

  return (
    <>
      <div className="section mb-10">
        <div className="row mt-2">
          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">Citations Per Capita</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {ranking.citations}
              </h1>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">H-index Per Capita</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {ranking.hindex}{' '}
                <sup>
                  <small>x/y</small>
                </sup>
              </h1>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box ">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">i-10-index Per Capita</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {ranking.i10hindex}
              </h1>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box relative">
              <ShowChartButton show={true} />
              <div className="title">
                <strong className="text-black">Google Scholar Presence</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {ranking.googlePresence}%
              </h1>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box relative">
              <ShowChartButton show={true} />
              <div className="title">
                <strong className="text-black">Knowledge Economy</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {45}
              </h1>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box ">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">Student-Teacher Ratio</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? (
                    <LooseBusy />
                  ) : (
                    analytics_students.STUDENT_TEACHER_RATIO
                  )}
                </h1>
                <ChartComponent
                  labels={['Stud', 'Lects']}
                  data={[statistics_students.count, statistics_lecturers.count]}
                  color={['#3265af', '#8494a8']}
                />
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box ">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">Female Students</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? <LooseBusy /> : analytics_students.PERCENTAGE_FEMALE}%
                </h1>
                <ChartComponent
                  labels={['M', 'F']}
                  data={[
                    statistics_students.countMale,
                    statistics_students.countFemale,
                  ]}
                  color={['#3265af', '#8494a8']}
                />
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box ">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">% Challanged Students</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? (
                    <LooseBusy />
                  ) : (
                    analytics_students.PERCENTAGE_CHALLANGED_STUDENTS
                  )}
                  %
                </h1>
                <ChartComponent
                  labels={['Chlg', 'All']}
                  data={[
                    statistics_students.count,
                    statistics_students.countChallanged,
                  ]}
                  color={['#3265af', '#8494a8']}
                />
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box ">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">Challanged-Student Ratio</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? (
                    <LooseBusy />
                  ) : (
                    analytics_students.CHALLANGED_STUDENTS_RATIO
                  )}
                </h1>
                <ChartComponent
                  labels={['Chlg', 'All']}
                  data={[
                    statistics_students.countChallanged,
                    statistics_students.count,
                  ]}
                  color={['#3265af', '#8494a8']}
                />
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">Full Professors</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? <LooseBusy /> : analytics_lecturers.FULL_PROFESSORS}%
                </h1>
                <ChartComponent
                  labels={['P.full', 'P.normal']}
                  data={[
                    statistics_lecturers.countFullProfessors,
                    statistics_lecturers.countProfessors,
                  ]}
                  color={['#3265af', '#8494a8']}
                />
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={true} />
              <div className="title">
                <strong className="text-black">% PHD</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? <LooseBusy /> : analytics_lecturers.PHD_LECTURERS}%
                </h1>
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">
                  % International Professors
                </strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? (
                    <LooseBusy />
                  ) : (
                    analytics_lecturers.INTERNATIONAL_PROFESSORS
                  )}
                  %
                </h1>
                <ChartComponent
                  labels={['Intl', 'Profs']}
                  data={[
                    statistics_lecturers.countIntlProfessors,
                    statistics_lecturers.countProfessors,
                  ]}
                  color={['#3265af', '#8494a8']}
                />
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">% Female Professors</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? <LooseBusy /> : analytics_lecturers.FEMALE_PROFESSORS}
                  %
                </h1>
                <ChartComponent
                  labels={['Female', 'Profs']}
                  data={[
                    statistics_lecturers.countProfessorsFemale,
                    statistics_lecturers.countProfessors,
                  ]}
                  color={['#3265af', '#8494a8']}
                />
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">International Students</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {busy ? (
                  <LooseBusy />
                ) : (
                  analytics_students.INTERNATIONAL_STUDENTS
                )}
                %
              </h1>
              <ChartComponent
                labels={['Int.St', 'Loc.St']}
                data={[
                  statistics_students.countIntl,
                  statistics_students.count,
                ]}
                color={['#3265af', '#8494a8']}
              />
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">International Lecturers</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {busy ? (
                  <LooseBusy />
                ) : (
                  analytics_lecturers.INTERNATIONAL_LECTURERS
                )}
                %
              </h1>
              <ChartComponent
                labels={['Int.St', 'Loc.St']}
                data={[
                  statistics_lecturers.countIntl,
                  statistics_lecturers.count,
                ]}
                color={['#3265af', '#8494a8']}
              />
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">Female Lecturers</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {busy ? <LooseBusy /> : analytics_lecturers.FEMALE_LECTURERS}%
              </h1>
              <ChartComponent
                labels={['Int.St', 'Loc.St']}
                data={[
                  statistics_lecturers.countFemale,
                  statistics_lecturers.count,
                ]}
                color={['#3265af', '#8494a8']}
              />
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">% Full Accreditation</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {busy ? (
                  <LooseBusy />
                ) : (
                  analytics_departments.FULL_ACCREDITATION
                )}
                %
              </h1>
              <ChartComponent
                labels={['full.accr', 'others']}
                data={[
                  statistics_departments.countAccredited,
                  statistics_departments.countNonAccredited,
                ]}
                color={['#3265af', '#8494a8']}
              />
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">% Senior Lecturers</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {busy ? (
                  <LooseBusy />
                ) : (
                  analytics_lecturers.PERCENTAGE_SENIOR_LECTURERS
                )}
                %
              </h1>
              <ChartComponent
                labels={['full.accr', 'others']}
                data={[
                  statistics_lecturers.countSeniorLecturers,
                  statistics_lecturers.count,
                ]}
                color={['#3265af', '#8494a8']}
              />
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={false} />
              <div className="title">
                <strong className="text-black">
                  Senior-Junior Teacher Ratio
                </strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {busy ? (
                  <LooseBusy />
                ) : (
                  analytics_lecturers.JUNIO_SENIOR_LECTURERS_RATIO
                )}
                %
              </h1>
              <ChartComponent
                labels={['full.accr', 'others']}
                data={[
                  statistics_lecturers.countJuniorLecturers,
                  statistics_lecturers.countSeniorLecturers,
                ]}
                color={['#3265af', '#8494a8']}
              />
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={true} />
              <div className="title">
                <strong className="text-black">% Adjunct Teachers</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? <LooseBusy /> : analytics_lecturers.ADJUNCT_LECTURERS}
                  %
                </h1>
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton show={true} />
              <div className="title">
                <strong className="text-black">% Adjunct Professors</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{' '}
                  {busy ? (
                    <LooseBusy />
                  ) : (
                    analytics_lecturers.ADJUNCT_PROFESSORS
                  )}
                  %
                </h1>
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box disabled">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">Efficiency</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {99.9}
              </h1>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">Citations Per Capita</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{' '}
                {ranking.citations}
              </h1>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default SchoolRanking;

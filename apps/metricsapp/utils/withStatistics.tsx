import React, { useEffect } from 'react';
import cookie from 'js-cookie';
import { SchoolStats, StudentStats } from '@metricsai/metrics-interfaces';

import { Dispatch } from '@metricsai/metrics-store';
import { useDispatch } from 'react-redux';

import { RootState } from '@metricsai/metrics-store';
import { useSelector } from 'react-redux';
import { div, perc } from '@metricsai/metrics-utils';
import { authlogout } from './withAuthSync';

import {
  loadSchoolsStats,
  loadStudents,
  loadStudentsStats,
  loadLecturers,
  loadLecturersStats,
  loadFaculties,
  loadFacultiesStats,
  loadDepartments,
  loadDepartmentsStats,
} from '@metricsai/metrics-utils';

export const withStatistics = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch<Dispatch>();
    const { statistics_students } = useSelector(
      (state: RootState) => state.students
    );
    const { statistics_lecturers } = useSelector(
      (state: RootState) => state.lecturers
    );
    const { statistics_faculties } = useSelector(
      (state: RootState) => state.faculties
    );
    const { statistics_departments } = useSelector(
      (state: RootState) => state.departments
    );
    const { statistics_school } = useSelector(
      (state: RootState) => state.settings
    );

    useEffect(() => {
      const token = cookie.get('token');
      const domain = cookie.get('domain');

      if (token && domain) {
        dispatch.settings.setBusy(true);

        loadSchoolsStats(domain as string)
          .then((stats: SchoolStats) => {
            // dispatch.schools.setStatistics(stats);
            //Do other students maths and Stat Displays//
            // dispatch.schools.setAnalytics({
            //   STUDENT_TEACHER_RATIO: div(
            //     statistics_students.count as number,
            //     statistics_lecturers.count as number
            //   ),
            // });
            //Do other students maths and Stat Displays//
          })
          .catch(); // Load All Students //
        // Get school info to state //

        // Load All Students //
        loadStudents(domain as string)
          .then((students) => {
            dispatch.students.setStudents(students.data);
            dispatch.students.setStudentsCount(students.data.length);
          })
          .catch();
        loadStudentsStats(domain as string)
          .then((stats: StudentStats) => {
            dispatch.students.setStatistics(stats);
            //Do other students maths and Stat Displays//
            dispatch.students.setAnalytics({
              STUDENT_TEACHER_RATIO: div(
                statistics_students.count as number,
                statistics_lecturers.count as number
              ),
              PERCENTAGE_FEMALE: perc(
                statistics_students.countFemale as number,
                statistics_students.count as number
              ),
              INTERNATIONAL_STUDENTS: perc(
                statistics_students.countIntl as number,
                statistics_students.count as number
              ),
              PERCENTAGE_CHALLANGED_STUDENTS: perc(
                statistics_students.countChallanged as number,
                statistics_students.count as number
              ),
              CHALLANGED_STUDENTS_RATIO: div(
                statistics_students.countChallanged as number,
                statistics_students.count as number
              ),
            });
            //Do other students maths and Stat Displays//
          })
          .catch(); // Load All Students //

        // Load All Lecturers //
        loadLecturers(domain as string)
          .then((lecturers) => {
            let lCts = lecturers.data;
            //Total GS //
            let totalGooglePresence = lCts.reduce(function (
              total: any,
              current: any
            ) {
              return total + current.googlePresence;
            },
            0);

            //Total Citation //
            let totalCitations = lCts.reduce(function (
              total: any,
              current: any
            ) {
              return total + current.citations;
            },
            0);

            //Total Hindex //
            let totalHindex = lCts.reduce(function (total: any, current: any) {
              return total + current.hindex;
            }, 0);

            //Total Hindex //
            let totalI10hindex = lCts.reduce(function (
              total: any,
              current: any
            ) {
              return total + current.i10hindex;
            },
            0);
            dispatch.settings.setRank({
              googlePresence: totalGooglePresence,
              citations: totalCitations,
              hindex: totalHindex,
              i10hindex: totalI10hindex,
            });
            const _total =
              totalGooglePresence +
              totalCitations +
              totalHindex +
              totalI10hindex;
            dispatch.settings.setTotal(_total);
            dispatch.lecturers.setLecturers(lecturers.data);
            dispatch.lecturers.setLecturersCount(lecturers.data.length);
          })
          .catch();
        loadLecturersStats(domain as string)
          .then((stats) => {
            dispatch.lecturers.setStatistics(stats);
            //Do other lecturers maths and Stat Displays//
            dispatch.lecturers.setAnalytics({
              INTERNATIONAL_LECTURERS: perc(
                statistics_lecturers.countIntl as number,
                statistics_lecturers.count as number
              ),
              FEMALE_LECTURERS: perc(
                statistics_lecturers.countFemale as number,
                statistics_lecturers.count as number
              ),
              PROFESSORS: perc(
                statistics_lecturers.countProfessors as number,
                statistics_lecturers.count as number
              ),
              FULL_PROFESSORS: perc(
                statistics_lecturers.countFullProfessors as number,
                statistics_lecturers.count as number
              ),
              INTERNATIONAL_PROFESSORS: perc(
                statistics_lecturers.countIntlProfessors as number,
                statistics_lecturers.count as number
              ),
              FEMALE_PROFESSORS: perc(
                statistics_lecturers.countProfessorsFemale as number,
                statistics_lecturers.count as number
              ),
              MALE_PROFESSORS: perc(
                statistics_lecturers.countProfessorsMale as number,
                statistics_lecturers.count as number
              ),
              PHD_LECTURERS: perc(
                statistics_lecturers.countPHDLecturers as number,
                statistics_lecturers.count as number
              ),
              ADJUNCT_LECTURERS: perc(
                statistics_lecturers.countAdjunct as number,
                statistics_lecturers.count as number
              ),
              ADJUNCT_PROFESSORS: perc(
                statistics_lecturers.countAdjunctProfessors as number,
                statistics_lecturers.count as number
              ),
              PERCENTAGE_JUNIOR_LECTURERS: perc(
                statistics_lecturers.countJuniorLecturers as number,
                statistics_lecturers.count as number
              ),
              PERCENTAGE_SENIOR_LECTURERS: perc(
                statistics_lecturers.countSeniorLecturers as number,
                statistics_lecturers.count as number
              ),
              JUNIO_SENIOR_LECTURERS_RATIO: div(
                statistics_lecturers.countJuniorLecturers as number,
                statistics_lecturers.countSeniorLecturers as number
              ),
            });
            //Do other lecturers maths and Stat Displays//
          })
          .catch();
        // Load All Lecturers //

        // Load All Faculties //
        loadFaculties(domain as string)
          .then((faculties) => {
            dispatch.faculties.setFaculties(faculties.data);
            dispatch.faculties.setFacultiesCount(faculties.data.length);
          })
          .catch();
        loadFacultiesStats(domain as string)
          .then((stats) => {
            dispatch.faculties.setStatistics(stats);
            //Do other faculties maths and Stat Displays//
            dispatch.faculties.setAnalytics({});
            //Do other faculties maths and Stat Displays//
          })
          .catch();
        // Load All Faculties //

        // Load All Departments //
        loadDepartments(domain as string)
          .then((departments) => {
            dispatch.departments.setDepartments(departments.data);
            dispatch.departments.setDepartmentsCount(departments.data.length);
          })
          .catch();
        loadDepartmentsStats(domain as string)
          .then(async (stats) => {
            await dispatch.departments.setStatistics(stats);
            //Do other departments maths and Stat Displays//
            await dispatch.departments.setAnalytics({
              FULL_ACCREDITATION: perc(
                statistics_departments.countAccredited as number,
                statistics_departments.count as number
              ),
            });
            //Do other departments maths and Stat Displays//
          })
          .catch(); // Load All Departments //
        dispatch.settings.setBusy(false);
      } else {
        authlogout();
      }
    }, [
      dispatch.settings,
      dispatch.students,
      dispatch.lecturers,
      dispatch.departments,
      dispatch.faculties,
      statistics_lecturers.count,
      statistics_students.count,
      statistics_students.countFemale,
      statistics_students.countIntl,
      statistics_departments.countAccredited,
      statistics_departments.countNonAccredited,
      statistics_departments.count,
      statistics_lecturers.countFemale,
      statistics_lecturers.countFullProfessors,
      statistics_lecturers.countIntl,
      // = //
      statistics_lecturers.countAdjunct,
      statistics_lecturers.countAdjunctProfessors,
      statistics_lecturers.countIntlProfessors,
      statistics_lecturers.countJuniorLecturers,
      statistics_lecturers.countPHDLecturers,
      statistics_lecturers.countProfessors,
      statistics_lecturers.countProfessorsFemale,
      statistics_lecturers.countProfessorsMale,
      statistics_lecturers.countSeniorLecturers,
      statistics_students.countChallanged,
    ]);

    return <WrappedComponent {...props} />;
  };
  Wrapper.getInitialProps = async (ctx: any) => {
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };
  return Wrapper;
};

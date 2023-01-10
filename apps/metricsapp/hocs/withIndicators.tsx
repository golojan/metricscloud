import React, { useEffect } from 'react';
import {
  SchoolStats,
  StudentStats,
  SchoolInfo,
  AuthUserInfo,
} from '@metricsai/metrics-interfaces';

import { Dispatch, RootState } from '@metricsai/metrics-store';
import { useDispatch, useSelector } from 'react-redux';
import { div, perc } from '@metricsai/metrics-utils';
import useSWR from 'swr';

import SiteBusy from '../components/SiteBusy';

const loadSchoolsStats = async (schoolId: string) => {
  const response = await fetch(`/api/schools/${schoolId}/stats`);
  const stats = await response.json();
  return stats;
};

const loadStudents = async (schoolId: string) => {
  const response = await fetch(`/api/students/${schoolId}/list`);
  const students = await response.json();
  return students.data;
};

const loadStudentsStats = async (schoolId: string) => {
  const response = await fetch(`/api/students/${schoolId}/stats`);
  const stats = await response.json();
  return stats;
};

const loadLecturers = async (schoolId: string) => {
  const response = await fetch(`/api/lecturers/${schoolId}/list`);
  const lecturers = await response.json();
  return lecturers.data;
};

const loadLecturersStats = async (schoolId: string) => {
  const response = await fetch(`/api/students/${schoolId}/stats`);
  const stats = await response.json();
  return stats;
};

const loadFaculties = async (schoolId: string) => {
  const response = await fetch(`/api/faculties/${schoolId}/list`);
  const faculties = await response.json();
  return faculties.data;
};

const loadDepartments = async (schoolId: string) => {
  const response = await fetch(`/api/departments/${schoolId}/list`);
  const departments = await response.json();
  return departments.data;
};

const loadFacultiesStats = async (schoolId: string) => {
  const response = await fetch(`/api/faculties/${schoolId}/stats`);
  const stats = await response.json();
  return stats;
};

const loadDepartmentsStats = async (schoolId: string) => {
  const response = await fetch(`/api/departments/${schoolId}/stats`);
  const stats = await response.json();
  return stats;
};

interface Props {
  isLoading: boolean;
  schoolId: string;
}

export const withIndicators = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P & Props) => {
    const { schoolId, isLoading, ...restProps } = props;
    const dispatch = useDispatch<Dispatch>();

    const {
      data: faculties,
      error: fError,
      isValidating: fValidation,
    } = useSWR(`/api/faculties/${schoolId}/list`, () =>
      loadFaculties(schoolId)
    );

    const {
      data: departments,
      error: dError,
      isValidating: dValidation,
    } = useSWR(`/api/departments/${schoolId}/list`, () =>
      loadDepartments(schoolId)
    );

    // const {
    //   data: statistics_faculties,
    //   error: sfError,
    //   isValidating: sfValidation,
    // } = useSWR(`/api/faculties/${schoolId}/stats`, () =>
    //   loadFaculties(schoolId)
    // );

    const {
      data: ranking,
      error: rError,
      isValidating: rValidation,
    } = useSWR<SchoolStats>(`/api/schools/${schoolId}/stats`, () =>
      loadSchoolsStats(schoolId)
    );

    const {
      data: students,
      error: sError,
      isValidating: sValidation,
    } = useSWR<SchoolInfo[]>(`/api/students/${schoolId}/list`, () =>
      loadStudents(schoolId)
    );

    const {
      data: statistics_students,
      error: stError,
      isValidating: stValidation,
    } = useSWR(`/api/students/${schoolId}/stats`, () =>
      loadStudentsStats(schoolId)
    );

    const {
      data: lecturers,
      error: lError,
      isValidating: lValidation,
    } = useSWR<AuthUserInfo[]>(`/api/lecturers/${schoolId}/list`, () =>
      loadLecturers(schoolId)
    );

    const {
      data: statistics_lecturers,
      error: ltError,
      isValidating: ltValidation,
    } = useSWR(`/api/lecturers/${schoolId}/stats`, () =>
      loadLecturersStats(schoolId)
    );

    useEffect(() => {
      dispatch.settings.setBusy(true);

      dispatch.settings.setStatistics(ranking);

      dispatch.students.setStudents(students);
      dispatch.students.setStudentsCount(students?.length);

      if (statistics_students) {
        dispatch.students.setStatistics(statistics_students);
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
      }
      if (lecturers) {
        let lCts = lecturers;
        //Total GS //
        let totalGooglePresence = lCts.reduce(function (
          total: any,
          current: any
        ) {
          return total + current.googlePresence;
        },
        0);

        //Total Citation //
        let totalCitations = lCts.reduce(function (total: any, current: any) {
          return total + current.citations;
        }, 0);

        //Total Hindex //
        let totalHindex = lCts.reduce(function (total: any, current: any) {
          return total + current.hindex;
        }, 0);

        //Total Hindex //
        let totalI10hindex = lCts.reduce(function (total: any, current: any) {
          return total + current.i10hindex;
        }, 0);

        dispatch.settings.setRank({
          googlePresence: totalGooglePresence,
          citations: totalCitations,
          hindex: totalHindex,
          i10hindex: totalI10hindex,
        });
        const _total =
          totalGooglePresence + totalCitations + totalHindex + totalI10hindex;
        dispatch.settings.setTotal(_total);
        dispatch.lecturers.setLecturers(lecturers);
        dispatch.lecturers.setLecturersCount(lecturers.length);
      }
      if (statistics_lecturers) {
        dispatch.statistics_lecturers.setStatistics(statistics_lecturers);
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
      }

      dispatch.settings.setBusy(false);
    }, [schoolId]);

    const othersStillLoading =
      rValidation ||
      rError ||
      sValidation ||
      sError ||
      stValidation ||
      stError ||
      lValidation ||
      lError ||
      ltValidation ||
      ltError;

    return isLoading ? (
      <div className="container my-[10%] text-center">
        <h1>Loading indicators, wait...</h1>
      </div>
    ) : (
      <WrappedComponent {...(restProps as P)} ranking={ranking} />
    );
  };
};

//         // Load All Faculties //
//         loadFaculties(domain as string)
//           .then((faculties) => {
//             dispatch.faculties.setFaculties(faculties.data);
//             dispatch.faculties.setFacultiesCount(faculties.data.length);
//           })
//           .catch();
//         loadFacultiesStats(domain as string)
//           .then((stats) => {
//             dispatch.faculties.setStatistics(stats);
//             //Do other faculties maths and Stat Displays//
//             dispatch.faculties.setAnalytics({});
//             //Do other faculties maths and Stat Displays//
//           })
//           .catch();
//         // Load All Faculties //

//         // Load All Departments //
//         loadDepartments(domain as string)
//           .then((departments) => {
//             dispatch.departments.setDepartments(departments.data);
//             dispatch.departments.setDepartmentsCount(departments.data.length);
//           })
//           .catch();
//         loadDepartmentsStats(domain as string)
//           .then(async (stats) => {
//             await dispatch.departments.setStatistics(stats);
//             //Do other departments maths and Stat Displays//
//             await dispatch.departments.setAnalytics({
//               FULL_ACCREDITATION: perc(
//                 statistics_departments.countAccredited as number,
//                 statistics_departments.count as number
//               ),
//             });
//             //Do other departments maths and Stat Displays//
//           })
//           .catch(); // Load All Departments //
//         dispatch.settings.setBusy(false);
//       } else {
//         authlogout();
//       }
//     }, [
//       dispatch.settings,
//       dispatch.students,
//       dispatch.lecturers,
//       dispatch.departments,
//       dispatch.faculties,
//       statistics_lecturers.count,
//       statistics_students.count,
//       statistics_students.countFemale,
//       statistics_students.countIntl,
//       statistics_departments.countAccredited,
//       statistics_departments.countNonAccredited,
//       statistics_departments.count,
//       statistics_lecturers.countFemale,
//       statistics_lecturers.countFullProfessors,
//       statistics_lecturers.countIntl,
//       // = //
//       statistics_lecturers.countAdjunct,
//       statistics_lecturers.countAdjunctProfessors,
//       statistics_lecturers.countIntlProfessors,
//       statistics_lecturers.countJuniorLecturers,
//       statistics_lecturers.countPHDLecturers,
//       statistics_lecturers.countProfessors,
//       statistics_lecturers.countProfessorsFemale,
//       statistics_lecturers.countProfessorsMale,
//       statistics_lecturers.countSeniorLecturers,
//       statistics_students.countChallanged,
//     ]);

//     return <WrappedComponent {...props} />;
//   };
//   Wrapper.getInitialProps = async (ctx: any) => {
//     const componentProps =
//       WrappedComponent.getInitialProps &&
//       (await WrappedComponent.getInitialProps(ctx));
//     return { ...componentProps };
//   };
//   return Wrapper;
// };

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
  schoolId: string;
}

export const withStatistics = (WrappedComponent: any) => {
  const Wrapper = (props: Props) => {
    const { schoolId, ...restProps } = props;
    const dispatch = useDispatch<Dispatch>();
    


    return <WrappedComponent {...props} />;
  };
  Wrapper.getInitialProps = async (ctx: any) => {
    // get token from server cookie
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };
  return Wrapper;
};

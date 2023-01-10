import {
  FakerStudent,
  StudentAnalitics,
  StudentInfo,
  StudentStats,
} from '@metricsai/metrics-interfaces';
import { createModel } from '@rematch/core';
import { RootModel } from '.';

import { loadStudents } from "@metricsai/metrics-utils";

export const students = createModel<RootModel>()({
  state: {
    studentId: '',
    studentsCount: 0,
    sBusy: false,
    students: [] as StudentInfo[],
    list: [] as StudentInfo[],
    loaded: false,
    maleStudents: 0,
    femaleStudents: 0,
    statistics_students: {} as StudentStats,
    analytics_students: {
      STUDENT_TEACHER_RATIO: 0,
      PERCENTAGE_FEMALE: 0,
      INTERNATIONAL_STUDENTS: 0,
      PERCENTAGE_CHALLANGED_STUDENTS: 0,
      CHALLANGED_STUDENTS_RATIO: 0,
    } as StudentAnalitics,
  },
  reducers: {
    setBusy(state, payload: boolean) {
      return { ...state, sBusy: payload };
    },
    setStatistics(state, payload: object) {
      return { ...state, statistics_students: payload };
    },
    setAnalytics(state, payload: object) {
      return { ...state, analytics_students: payload };
    },
    setStudents(state, payload: any) {
      return { ...state, students: payload };
    },
    setStudentId(state, payload: any) {
      return { ...state, studentId: payload };
    },
    setList(state, payload: StudentInfo[]) {
      return { ...state, list: payload };
    },
    setStudentsCount(state, payload: number) {
      return { ...state, studentsCount: payload };
    },
  },
  effects: (dispatch) => ({
    countStudents: async () => {
      const response = await fetch('/api/students/count');
      const {} = await response.json();
    },
    getMale: async () => {
      const response = await fetch('/api/students/count');
      const {} = await response.json();
    },
    async addFakeStudent(payload: FakerStudent, rootState) {
      this.setBusy(true);
      const response = await fetch(
        `/api/fakes/student?sex=${payload.sex}&type=${payload.type}&challanged=${payload.challanged}&departmentId=${payload.departmentId}`
      );
      const { status } = await response.json();
      if (status) {
        const domain = rootState.settings.domain;
        loadStudents(domain)
          .then((students) => {
            this.setStudents(students.data);
            this.setStudentsCount(students.data.length);
          })
          .catch();
      }
      this.setBusy(false);
      return status;
    },
    async loadStudents(domain: string, rootState) {
      const response = await fetch(`/api/students/${domain}/list`);
      const students = await response.json();
      this.setStudents(students.data);
      return students;
    },
    async loadStudentsStats(domain: string, rootState) {
      const response = await fetch(`/api/students/${domain}/stats`);
      const stats = await response.json();
      this.setStatistics(stats.data);
      return stats;
    },
  }),
});

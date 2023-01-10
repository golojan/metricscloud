import {
  FakerLecturer,
  LecturerAnalitics,
  LecturerInfo,
  LecturerStats,
} from '@metricsai/metrics-interfaces';
import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { loadLecturers } from '@metricsai/metrics-utils';

export const lecturers = createModel<RootModel>()({
  state: {
    updated: 0,
    lecturerId: "",
    lecturersCount: 0,
    lBusy: false,
    lecturers: [] as LecturerInfo[],
    list: [] as LecturerInfo[],
    loaded: false,
    statistics_lecturers: {} as LecturerStats,
    analytics_lecturers: {} as LecturerAnalitics,
  },
  reducers: {
    rankUp(state) {
      return { ...state, updated: ++state.updated };
    },
    setBusy(state, payload: boolean) {
      return { ...state, lBusy: payload };
    },
    setStatistics(state, payload: object) {
      return { ...state, statistics_lecturers: payload };
    },
    setAnalytics(state, payload: object) {
      return { ...state, analytics_lecturers: payload };
    },
    setLecturers(state, payload: any) {
      return { ...state, lecturers: payload };
    },
    setLecturerId(state, payload: any) {
      return { ...state, lecturerId: payload };
    },
    setList(state, payload: any) {
      return { ...state, list: payload };
    },
    setLecturersCount(state, payload: number) {
      return { ...state, lecturersCount: payload };
    },
  },
  effects: (dispatch) => ({
    countLecturers: async () => {
      const response = await fetch("/api/lecturers/count");
      const {} = await response.json();
    },
    async addFakeLecturer(payload: FakerLecturer, rootState) {
      this.setBusy(true);
      const response = await fetch(
        `/api/fakes/lecturer?sex=${payload.sex}&type=${payload.type}&isprofessor=${payload.isprofessor}&isfullprofessor=${payload.isfullprofessor}&adjunct=${payload.adjunct}&departmentId=${payload.departmentId}`
      );
      const { status } = await response.json();
      if (status) {
        const domain = rootState.settings.domain;
        loadLecturers(domain)
          .then((lecturers) => {
            this.setLecturers(lecturers.data);
            this.setLecturersCount(lecturers.data.length);
          })
          .catch();
      }
      this.setBusy(false);
      return status;
    },

    async loadLecturers(domain: string) {
      const response = await fetch(`/api/lecturers/${domain}/list`);
      const lecturers = await response.json();
      this.setLecturers(lecturers.data);
      return lecturers;
    },
    async loadLecturersStats(domain: string) {
      const response = await fetch(`/api/lecturers/${domain}/stats`);
      const stats = await response.json();
      this.setStatistics(stats.data);
      return stats;
    },
  }),
});

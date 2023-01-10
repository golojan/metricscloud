import { DepartmentsInfo, IStats } from "@metricsai/metrics-interfaces";
import { div, perc, sub } from "./math";


export const getRoleInfo = async (id: string) => {
  const response = await fetch(`/api/roles/${id}/info`);
  const role = await response.json();
  if (role.status) {
    return role.data;
  } else {
    return {};
  }
};

export const getMembershipInfo = async (id: string) => {
  const response = await fetch(`/api/memberships/${id}/info`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

export const getDataLists = async () => {
  const response = await fetch(`/api/lists`);
  const data = await response.json();
  return data;
};

export const getMemberships = async () => {
  const response = await fetch(`/api/memberships/list`);
  const data = await response.json();
  return data.indicators;
};

export const getIndicators = async () => {
  const response = await fetch(`/api/indicators/list`);
  const data = await response.json();
  return data.indicators;
};


export const getAccountInfo = async (_token: string) => {
  const response = await fetch(`/api/accounts/${_token}/info`);
  const userinfo = await response.json();
  return userinfo;
};

export const getSchoolInfo = async (domain: string) => {
  const response = await fetch(`/api/schools/${domain}/info`);
  const userinfo = await response.json();
  return userinfo;
};

export const getDomain = (host: string) => {
  const _domain: any = host?.split(":", 1).pop();
  const domain = _domain.replace("www.", "");
  return domain;
};

export const getDepartment = (arrData: Array<DepartmentsInfo>, id: string) => {
  return arrData.find((e) => e._id === id);
};

export const getLiveStats = (arrData: any, statVal: any) => {
  const max = Math.max(...arrData.map((o: any) => o.points));
  const min = Math.min(...arrData.map((o: any) => o.points));
  const mid = parseFloat(div(max, 2));
  const ndif = parseFloat(sub(statVal, mid));
  if (statVal > mid) {
    let _perc = perc(ndif, mid);
    return { max: max, min: min, mid: mid, dir: "up", perc: _perc };
  }
  if (statVal <= mid) {
    let _perc = perc(ndif, mid);
    return { max: max, min: min, mid: mid, dir: "down", perc: _perc };
  }
};

export const loadSchoolsStats = async (domain: string) => {
  const response = await fetch(`/api/schools/${domain}/stats`);
  const stats = await response.json();
  return stats;
};
export const loadStudents = async (domain: string) => {
  const response = await fetch(`/api/students/${domain}/list`);
  const students = await response.json();
  return students;
};
export const loadStudentsStats = async (domain: string) => {
  const response = await fetch(`/api/students/${domain}/stats`);
  const stats = await response.json();
  return stats;
};

export const loadLecturers = async (domain: string) => {
  const response = await fetch(`/api/lecturers/${domain}/list`);
  const lecturers = await response.json();
  return lecturers;
};

export const loadLecturersStats = async (domain: string) => {
  const response = await fetch(`/api/lecturers/${domain}/stats`);
  const stats = await response.json();
  return stats;
};

export const loadFaculties = async (domain: string) => {
  const response = await fetch(`/api/faculties/${domain}/list`);
  const faculties = await response.json();
  return faculties;
};
export const loadFacultiesStats = async (domain: string) => {
  const response = await fetch(`/api/faculties/${domain}/stats`);
  const stats = await response.json();
  return stats;
};

export const loadDepartments = async (domain: string) => {
  const response = await fetch(`/api/departments/${domain}/list`);
  const departments = await response.json();
  return departments;
};
export const loadDepartmentsStats = async (domain: string) => {
  const response = await fetch(`/api/departments/${domain}/stats`);
  const stats = await response.json();
  return stats;
};

export const loadUsers: any = async () => {
  const response = await fetch("/api/accounts/listusers");
  const users = await response.json();
  if (users.status) {
    return users.data;
  }
  return {};
};

export const getUserProfile: any = async (accid: string) => {
  const response = await fetch(`/api/accounts/${accid}/profile`);
  const user = await response.json();
  if (user.status) {
    return user.data;
  }
  return {};
};

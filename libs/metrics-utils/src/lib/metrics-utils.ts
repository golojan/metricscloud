import { DepartmentsInfo, IStats } from '@metricsai/metrics-interfaces';
import { WebWindow } from '@metricsai/metrics-interfaces';

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  let size = 'lg';
  if ((innerWidth as number) >= 1400) {
    // Size is XXL
    size = 'xxl';
  } else if ((innerWidth as number) >= 1200) {
    // Size is XL
    size = 'xl';
  } else if ((innerWidth as number) >= 992) {
    // Size is LG
    size = 'lg';
  } else if ((innerWidth as number) >= 768) {
    // Size is MD
    size = 'md';
  } else if ((innerWidth as number) >= 576) {
    // Size is SM
    size = 'sm';
  } else if ((innerWidth as number) < 576) {
    // Size is xs
    size = 'xs';
  } else {
    // Size is xs
    size = 'xxs';
  }
  return {
    width: width,
    height: height,
    size: size,
  } as WebWindow;
};

export const add = (a: number, b: number) => {
  return (a + b).toFixed(2);
};
export const sub = (a: number, b: number) => {
  return (a - b).toFixed(2);
};
export const mul = (a: number, b: number) => {
  return (a * b).toFixed(2);
};
export const div = (a: number, b: number) => {
  return (a / b).toFixed(2);
};
export const perc = (num: number, total: number) => {
  return ((num / total) * 100).toFixed(2);
};


export const genPassword = (length: number = 5) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomInt = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomInt);
  }
  return password;
};

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

export const getSchools = async () => {
  const response = await fetch(`/api/schools/list`);
  const data = await response.json();
  return data.schools;
};

export const getSchoolInfoById = async (id: string) => {
  const response = await fetch(`/api/schools/${id}/info`);
  const userinfo = await response.json();
  if (userinfo.status) {
    return userinfo.data;
  } else {
    return {};
  }
};

export const getIndicatorInfo = async (id: string) => {
  const response = await fetch(`/api/indicators/${id}/info`);
  const indicator = await response.json();
  if (indicator.status) {
    return indicator.data;
  } else {
    return {};
  }
};

export const getSchoolInfoByDomain = async (domain: string) => {
  const response = await fetch(`/api/schools/${domain}/info`);
  const userinfo = await response.json();
  return userinfo;
};

export const getSchoolInfo = async (domain: string) => {
  const response = await fetch(`/api/schools/${domain}/info`);
  const userinfo = await response.json();
  return userinfo;
};

export const getDomain = (host: string) => {
  const _domain: any = host?.split(':', 1).pop();
  const domain = _domain.replace('www.', '');
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
  let _perc = perc(ndif, mid);
  if (statVal > mid) {
    return { max: max, min: min, mid: mid, dir: 'up', perc: _perc };
  }
  if (statVal <= mid) {
    return { max: max, min: min, mid: mid, dir: 'down', perc: _perc };
  }
  return { max: max, min: min, mid: mid, dir: 'down', perc: _perc };
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
  const response = await fetch('/api/accounts/listusers');
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

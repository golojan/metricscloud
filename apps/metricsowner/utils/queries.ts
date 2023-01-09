export const genPassword = (length: number = 5) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
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

export const getCountStatistics = async () => {
  const response = await fetch(`/api/statistics`);
  const data = await response.json();
  return data;
};

export const getAccounts = async () => {
  const response = await fetch(`/api/accounts/list`);
  const data = await response.json();
  return data.accounts;
};

export const getOwnerInfo = async (_token: string) => {
  const response = await fetch(`/api/owners/${_token}/info`);
  const userinfo = await response.json();
  return userinfo;
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

export const getSchoolInfo = async (id: string) => {
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

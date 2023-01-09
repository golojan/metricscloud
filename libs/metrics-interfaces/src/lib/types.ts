import { ReactNode } from 'react';

export interface SchoolInfo {
  _id?: string;
  name?: string;
  domain?: string;
  shortname?: string;
  state?: string;
  location?: string;
  ownedBy?: string;
  founded?: Number;
  enabled?: boolean;
  indicators?: any;
}

export interface UserSnippet {
  status?: boolean;
  _id?: string;
  error?: string;
}

export interface AuthUserInfo {
  _id?: string;
  departmentId?: string;
  schoolId?: string;
  accountType?: string;
  picture?: string;
  firstname?: string;
  lastname?: string;
  aboutMe?: string;
  username?: string;
  role?: string;
  email?: string;
  gender?: string;
  mobile?: string;
  birthday?: string;
  smsNotification?: boolean;
  emailNotification?: boolean;
  schoolCode?: string;
  googleScholarId?: string;
  scopusId?: string;
  orcidId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResponseFunctions {
  GET?: Function;
  POST?: Function;
}

import { Gender, LecturerLevel, LecturerType, StudentType } from './enums';

export type DataLists = {
  schools?: SchoolInfo[];
  accounts?: AccountInfo[];
  indicators?: IndicatorInfo[];
  memberships?: MembershipsInfo[];
  roles?: RolesInfo[];
};

export type RolesInfo = {
  _id?: string;
  role?: string;
  description?: string;
  enabled?: boolean;
};

export type AccountInfo = {
  schoolid?: string;
  school?: SchoolInfo;
  status?: boolean;
  _id?: string;
  membership?: string;
  accountType?: string;
  role?: string;
  avatar?: string;
  university?: string;
  email?: string;
  mobile?: string;
  passwordKey?: string;
  sex?: string;
  birthday?: string;
  idtype?: string;
  idnumber?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  street?: string;
  city?: string;
  lga?: string;
  state?: string;
  zip?: string;
  country?: string;
  regfee?: number;
  referrer?: string;
  enabled?: boolean;
};

export type MembershipsInfo = {
  _id?: string;
  membership?: string;
  description?: string;
  enabled?: boolean;
};

export type IndicatorCount = {
  schoolsCount?: number;
  indicatorsCount?: number;
  accountsCount?: number;
  rolesCount?: number;
  membershipCount?: number;
};

export type IndicatorInfo = {
  _id?: string;
  shortname?: string;
  indicator?: string;
  criteria?: string;
  weight?: number;
  multiplier?: number;
  enabled?: boolean;
};

export interface IHistory {
  name?: string;
  lecturers?: LecturerInfo[];
  students?: StudentInfo[];
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  allschools?: [{}];
  adminId?: string;
}

export type GSRanking = {
  scrap?: boolean;
  url?: string;
  scrapper?: string;
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
};

export type SchoolRank = {
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
};

export type IStats = {
  max?: number;
  min: number;
  mid: number;
  dir: string;
  perc: number;
};

export type ScholarsProps = { lecturers: LecturerInfo[] };

export type WebWindow = {
  addEventListener(arg0: string, handleResize: () => void): unknown;
  width?: number;
  height?: number;
  size?: string;
};

export type FakerLecturer = {
  sex?: Gender;
  type?: LecturerType;
  isprofessor?: boolean;
  isfullprofessor?: boolean;
  adjunct?: boolean;
  departmentId?: string;
};

export type FakerStudent = {
  sex?: Gender;
  type?: StudentType;
  challanged?: boolean;
  departmentId?: string;
};

export type IndustryProps = {
  indystryType: string;
};

export type SchoolStats = {
  status?: boolean;
  count?: number;
  googlePresence?: number;
  citation?: number;
  hindex?: number;
  i10hindex?: number;
};

export type SchoolAnalitics = {};

export interface Props {
  children?: ReactNode;
}

export type Logon = {
  domain?: string;
  username: string;
  password: string;
};

export type LecturerInfo = {
  _id?: string;
  staffNumber?: number;
  avatar?: string;
  departmentId?: string;
  staffnumber?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  adjunct?: boolean;
  level?: LecturerLevel;
  withPhd?: boolean;
  professor?: {
    isProfessor?: boolean;
    isFullProfessor?: boolean;
  };
  email?: string;
  mobile?: string;
  gender?: Gender;
  lecturerType?: LecturerType;
  addresses?: {
    contact?: {
      street?: string;
      city?: string;
      lga?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
  };
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  enabled?: boolean;
};

export type LecturerStats = {
  status?: string;
  count?: number;
  countLocal?: number;
  countIntl?: number;
  countMale?: number;
  countFemale?: number;
  countLocalFemale?: number;
  countLocalMale?: number;
  countIntlFemale?: number;
  countIntlMale?: number;
  countProfessors?: number;
  countProfessorsMale?: number;
  countProfessorsFemale?: number;
  countIntlProfessors?: number;
  countFullProfessors?: number;
  countFullProfessorsMale?: number;
  countFullProfessorsFemale?: number;
  countAdjunct?: number;
  countAdjunctFemale?: number;
  countAdjunctMale?: number;
  countAdjunctProfessors?: number;
  countAdjunctProfessorsMale?: number;
  countAdjunctProfessorsFemale?: number;
  countPHDLecturers?: number;
  countSeniorLecturers?: number;
  countJuniorLecturers?: number;
};

export type LecturerAnalitics = {
  INTERNATIONAL_LECTURERS?: number;
  FEMALE_LECTURERS?: number;
  MALE_PROFESSORS?: number;
  PHD_LECTURERS?: number;
  ADJUNCT_LECTURERS?: number;
  ADJUNCT_PROFESSORS?: number;
  PROFESSORS?: number;
  FULL_PROFESSORS?: number;
  INTERNATIONAL_PROFESSORS?: number;
  FEMALE_PROFESSORS?: number;
  PERCENTAGE_JUNIOR_LECTURERS?: number;
  PERCENTAGE_SENIOR_LECTURERS?: number;
  JUNIO_SENIOR_LECTURERS_RATIO?: number;
};

export type FacultiesInfo = {
  _id?: string;
  domain?: string;
  name?: string;
  description?: string;
  enabled?: boolean;
};

export type DepartmentsInfo = {
  _id?: string;
  domain?: string;
  facultyId?: string;
  name?: string;
  description?: string;
  accredited?: boolean;
  enabled?: boolean;
};

export type StudentInfo = {
  _id?: string;
  avatar?: string;
  departmentId?: string;
  regNumber?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  email?: string;
  mobile?: string;
  gender?: Gender;
  studentType: StudentType;
  challanged?: boolean;
  addresses?: {
    contact?: {
      street?: string;
      city?: string;
      lga?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
  };
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex: number;
  enabled?: boolean;
};

export type StudentStats = {
  status?: boolean;
  count?: number;
  countLocal?: number;
  countIntl?: number;
  countMale?: number;
  countFemale?: number;
  countLocalMale?: number;
  countLocalFemale?: number;
  countIntlMale?: number;
  countIntlFemale?: number;
  countChallanged?: number;
  countChallangedMale?: number;
  countChallangedFemale?: number;
};

export type StudentAnalitics = {
  STUDENT_TEACHER_RATIO?: number;
  PERCENTAGE_FEMALE?: number;
  INTERNATIONAL_STUDENTS?: number;
  PERCENTAGE_CHALLANGED_STUDENTS?: number;
  CHALLANGED_STUDENTS_RATIO?: number;
};

export type FacultyAnalitics = {
  STUDENT_TEACHER_RATIO?: number;
};

export type FacultyStats = {
  status?: boolean;
  count?: number;
};

export type DepartmentAnalitics = {
  FULL_ACCREDITATION?: number;
};

export type DepartmentStats = {
  status?: boolean;
  count?: number;
  countAccredited?: number;
  countNonAccredited?: number;
};

export type UserInfo = {
  _id?: string;
  avatar?: string;
  accid?: string;
  membership?: string;
  role?: string;
  email?: string;
  mobile?: string;
  password?: string;
  sex?: string;
  birthday?: string;
  idtype?: string;
  idnumber?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  street?: string;
  city?: string;
  lga?: string;
  state?: string;
  zip?: string;
  country?: string;
  regfee?: number;
  referrer?: string;
  admin?: string;
};

export type Token = {
  domain?: string;
  token?: string;
  url?: string;
};

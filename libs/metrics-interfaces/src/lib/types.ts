import { ReactNode } from 'react';
import { Gender, LecturerLevel, LecturerType, StudentType } from './enums';
import { NextApiRequest, NextApiResponse } from 'next/types';
export interface IUserReactions {
  _id?: string;
  postFeedId?: string;
  commentId?: string;
  fromUser?: string;
  toUser?: string;
  like?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IPostComment {
  _id?: string;
  postFeedId: string;
  fromUser: string;
  toUser: string;
  comment?: string;
  image?: string;
  viewsCount?: number;
  likesCount?: number;
  commentsCount?: number;
  onReview?: boolean;
  approved?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Image {
  id?: string;
  name?: string;
  base64?: string;
}

export interface IPostFeed {
  _id?: string;
  postType?: string;
  accountId?: string;
  schoolId?: string;
  title?: string;
  shortname?: string;
  content?: string;
  image?: string;
  views?: number;
  onReview?: boolean;
  approved?: boolean;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SchoolInfo {
  _id?: string;
  logo?: string;
  name?: string;
  domain?: string;
  shortname?: string;
  state?: string;
  location?: string;
  ownedBy?: string;
  founded?: number;
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
  verified?: boolean;
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
  street?: string;
  city?: string;
  lga?: string;
  state?: string;
  zip?: string;
  country?: string;
  smsNotification?: boolean;
  emailNotification?: boolean;
  schoolCode?: string;
  googleScholarId?: string;
  scopusId?: string;
  orcidId?: string;
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResponseFunctions {
  GET?: (req: NextApiRequest, res: NextApiResponse) => void;
  POST?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
}

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
  schoolId?: string;
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
  allschools?: [object];
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
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
};

export type SchoolRank = {
  status?: boolean;
  ooglePresence?: number;
  cigtations?: number;
  hindex?: number;
  i10hindex?: number;
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
  highestCitations?: number;
  highestHindex?: number;
  highestI10hindex?: number;
  highestTotalPublications?: number;
  highestFirstPublicationYear?: number;
  highestLastPublicationYear?: number;
  lowestCitations?: number;
  lowestHindex?: number;
  lowestI10hindex?: number;
  lowestTotalPublications?: number;
  lowestFirstPublicationYear?: number;
  lowestLastPublicationYear?: number;
  averageCitations?: number;
  averageHindex?: number;
  averageI10hindex?: number;
  averageTotalPublications?: number;
  totalStaff?: number;
  totalGooglePresence?: number;
  totalStaffWithOutGooglePresence?: number;
  totalStaffWithGooglePresence?: number;
  internationalStaff?: number;
  localStaff?: number;
};

export type SchoolStats = {
  status?: boolean;
  count?: number;
  googlePresence?: number;
  citation?: number;
  hindex?: number;
  i10hindex?: number;
  total?: number;
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

export type SchoolAnalitics = object;

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

export type AccountsStats = {
  status?: boolean;
  googlePresence?: number;
  cigtations?: number;
  hindex?: number;
  i10hindex?: number;
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
  highestCitations?: number;
  highestHindex?: number;
  highestI10hindex?: number;
  highestTotalPublications?: number;
  highestFirstPublicationYear?: number;
  highestLastPublicationYear?: number;
  lowestCitations?: number;
  lowestHindex?: number;
  lowestI10hindex?: number;
  lowestTotalPublications?: number;
  lowestFirstPublicationYear?: number;
  lowestLastPublicationYear?: number;
  averageCitations?: number;
  averageHindex?: number;
  averageI10hindex?: number;
  averageTotalPublications?: number;
  totalStaff?: number;
  totalGooglePresence?: number;
  totalStaffWithOutGooglePresence?: number;
  totalStaffWithGooglePresence?: number;
  internationalStaff?: number;
  localStaff?: number;
};

export const accountInitialStats = {
  status: false,
  googlePresence: 0,
  cigtations: 0,
  hindex: 0,
  i10hindex: 0,
  totalPublications: 0,
  firstPublicationYear: 0,
  lastPublicationYear: 0,
  highestCitations: 0,
  highestHindex: 0,
  highestI10hindex: 0,
  highestTotalPublications: 0,
  highestFirstPublicationYear: 0,
  highestLastPublicationYear: 0,
  lowestCitations: 0,
  lowestHindex: 0,
  lowestI10hindex: 0,
  lowestTotalPublications: 0,
  lowestFirstPublicationYear: 0,
  lowestLastPublicationYear: 0,
  averageCitations: 0,
  averageHindex: 0,
  averageI10hindex: 0,
  averageTotalPublications: 0,
  totalStaff: 0,
  totalGooglePresence: 0,
  totalStaffWithOutGooglePresence: 0,
  totalStaffWithGooglePresence: 0,
  internationalStaff: 0,
  localStaff: 0,
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
  scoolId?: string;
  name?: string;
  description?: string;
  enabled?: boolean;
};

export type DepartmentsInfo = {
  _id?: string;
  scoolId?: string;
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
  schoolId?: string;
  token?: string;
  url?: string;
};

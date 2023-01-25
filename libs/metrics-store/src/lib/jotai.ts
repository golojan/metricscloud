import { atom } from 'jotai';
import {
  AuthUserInfo,
  SchoolInfo,
  GSRanking,
  SchoolSettingsType,
  DepartmentsInfo,
  GSIRanking,
} from '@metricsai/metrics-interfaces';

const cookie = require('js-cookie');

export const pageAtom = atom<string>('home');
export const showUserPostFeedDialogAtom = atom<boolean>(false);

export const schoolsAtom = atom<SchoolInfo[]>([]);
export const busyAtom = atom<boolean>(false);

export const tokenAtom = atom<string>(cookie.get('token') || '');

export const profileAtom = atom<AuthUserInfo>({} as AuthUserInfo);
export const publicProfileAtom = atom<AuthUserInfo>({} as AuthUserInfo);

export const totalWeightAtom = atom<number>(0);
export const schoolSettingsAtom = atom<SchoolSettingsType>({});
export const statistLecturersAtom = atom<GSIRanking>({});
export const schoolDepartmentsAtom = atom<DepartmentsInfo[]>([]);

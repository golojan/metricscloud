import { atom } from 'jotai';
import { AuthUserInfo, SchoolInfo } from '@metricsai/metrics-interfaces';
const cookie = require('js-cookie');

export const pageAtom = atom<string>('home');
export const showUserPostFeedDialogAtom = atom<boolean>(false);

export const schoolsAtom = atom<SchoolInfo[]>([]);
export const busyAtom = atom<boolean>(false);

export const tokenAtom = atom<string>(cookie.get('token') || '');

export const profileAtom = atom<AuthUserInfo>({});
export const publicProfileAtom = atom<AuthUserInfo>({});

export const totalWeightAtom = atom<number>(0);

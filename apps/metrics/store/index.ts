import { atom } from "jotai";
const cookie = require("js-cookie");

import { AuthUserInfo, SchoolInfo } from '@metricsai/metrics-interfaces';

export const schoolsAtom = atom<SchoolInfo[]>([]);
export const busyAtom = atom<boolean>(false);

export const tokenAtom = atom<string>(cookie.get("token") || "");

export const profileAtom = atom<AuthUserInfo>({});
export const publicProfileAtom = atom<AuthUserInfo>({});

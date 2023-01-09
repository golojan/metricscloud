import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { UserInfo, WebWindow } from '@metricsai/metrics-interfaces';

export const settings = createModel<RootModel>()({
  state: {
    windows: { width: 0, height: 0, size: 'xxl' } as WebWindow,
    menuOpened: false,
    page: 'home',
    token: '',
    isLogged: false,
    busy: false,
    user: {} as UserInfo,
    imageUrl: '../imgs/avatars/uploadholder.png',
    uploaded: false,
    idelTime: 0,
  },
  reducers: {
    setWebWindow(state, payload: WebWindow) {
      return { ...state, windows: payload };
    },
    toggleMenu(state, payload: boolean) {
      return { ...state, menuOpened: payload };
    },
    setToken(state, payload: string) {
      return { ...state, token: payload };
    },
    setPage(state, payload: string) {
      return { ...state, page: payload };
    },
    setIsLogged(state, payload: boolean) {
      return { ...state, isLogged: payload };
    },
    setBusy(state, payload: boolean) {
      return { ...state, busy: payload };
    },
    setUserInfo(state, payload: object) {
      return { ...state, user: payload };
    },
    setImageUrl(state, payload: string) {
      return { ...state, imageUrl: payload };
    },
    setIdelTime(state, payload: number) {
      return { ...state, idelTime: payload };
    },
  },
  effects: (dispatch) => ({
    async getAccountInfo(_token: string, RootState) {
      const response = await fetch(`/api/accounts/${_token}/info`);
      const userinfo = await response.json();
      this.setUserInfo(userinfo.data);
      return userinfo;
    },
    async getSchoolInfo(domain: string, RootState) {
      const response = await fetch(`/api/schools/${domain}/info`);
      const schoolinfo = await response.json();
      this.setSchool(schoolinfo.data);
      return schoolinfo;
    },
  }),
});

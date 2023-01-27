import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@metricsai/metrics-store';
import {
  getWindowDimensions,
  getSchoolInfoById,
  getProfileInfo,
  loadSchoolsStats,
  loadLecturersStats
} from '@metricsai/metrics-utils';
import { authSchoolId, authToken } from '@metricsai/metrics-hocs';
import { useRouter } from 'next/router';
import { authlogout } from '@metricsai/metrics-hocs';

interface MyProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: MyProps) => {
  const schoolid = authSchoolId();
  const token = authToken();

  const router = useRouter();

  const { school } = useSelector((state: RootState) => state.settings);

  const { name, shortname } = school;
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {

    if (!schoolid || !token) {
      authlogout();
      router.push('/auth');
    }

    const getSchool = async () => {
      dispatch.settings.setBusy(true);
      const school = await getSchoolInfoById(schoolid);
      dispatch.settings.setSchool(school);
      dispatch.settings.setBusy(false);
    };
    const getProfile = async () => {
      dispatch.settings.setBusy(true);
      const profile = await getProfileInfo(token);
      dispatch.settings.setUserInfo(profile);
      dispatch.settings.setBusy(false);
    };
    const loadSchoolsStatistics = async () => {
      dispatch.settings.setBusy(true);
      const data = await loadSchoolsStats(schoolid);
      dispatch.settings.setStatistics(data);
      dispatch.settings.setBusy(false);
    }
    const loadLecturersStatistics = async () => {
      dispatch.settings.setBusy(true);
      const data = await loadLecturersStats(schoolid);
      dispatch.lecturers.setStatistics(data);
      dispatch.settings.setBusy(false);
    }

    loadSchoolsStatistics();
    loadLecturersStatistics();
    getProfile();
    getSchool();

    dispatch.settings.setWebWindow(getWindowDimensions());
    const handleResize = () => {
      dispatch.settings.setWebWindow(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch.settings, schoolid, token]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>{`${shortname} | ${name}`}</title>
      </Head>
      {children}
    </>
  );
};
export default AdminLayout;

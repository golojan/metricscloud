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
      authlogout("/auth/");
    } else {
      const getSchool = async () => {
        const school = await getSchoolInfoById(schoolid);
        dispatch.settings.setSchool(school);
      };
      const getProfile = async () => {
        const profile = await getProfileInfo(token);
        dispatch.settings.setUserInfo(profile);
      };
      const loadSchoolsStatistics = async () => {
        const data = await loadSchoolsStats(schoolid);
        dispatch.settings.setStatistics(data);
      }
      loadSchoolsStatistics();
      getProfile();
      getSchool();
    }
    dispatch.settings.setWebWindow(getWindowDimensions());
    const handleResize = () => {
      dispatch.settings.setWebWindow(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [schoolid, token, dispatch]);

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

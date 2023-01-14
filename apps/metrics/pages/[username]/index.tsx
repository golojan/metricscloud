import { RefObject, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import PublicLayout from '../../components/PublicLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthUserInfo, SchoolInfo } from '@metricsai/metrics-interfaces';
import useSWR from 'swr';
import ProfilePage from '../../components/ProfilePage';
import NoProfilePage from '../../components/NoProfilePage';
import Head from 'next/head';
import {
  publicProfileAtom,
  busyAtom,
  schoolsAtom,
} from '@metricsai/metrics-store';
import { useAtom } from 'jotai';

const ProfileInfo = async (username: string) => {
  const response = await fetch(`/api/${username}/profile`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

const getSchools = async () => {
  const response = await fetch(`/api/schools/list`);
  const data = await response.json();
  if (data.status) {
    return data.schools;
  } else {
    return [];
  }
};

const Home: NextPage = () => {
  const [busy, setBusy] = useAtom(busyAtom);
  // Get the router object
  const router = useRouter();
  const { username } = router.query;

  const [publicProfile, setPublicProfile] = useAtom(publicProfileAtom);
  const [_, setSchools] = useAtom(schoolsAtom);

  useEffect(() => {
    setBusy(true);
    ProfileInfo(username as string).then((res) => {
      setPublicProfile(res);
    });
    getSchools().then((res) => {
      setSchools(res);
    });
    setBusy(false);
  }, [username]);

  return (
    <PublicLayout>
      {/* Head component with a title */}
      <Head>
        {publicProfile ? (
          <title>{`${publicProfile?.firstname} ${publicProfile?.lastname} @ MetricsAI`}</title>
        ) : (
          <title>{`Profiles@MetricsAI`}</title>
        )}
      </Head>
      <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div className="main-content">
          <div className="tab-content" id="pills-tabContent">
            {busy ? (
              'Busy...'
            ) : publicProfile?._id ? (
              <ProfilePage />
            ) : (
              <NoProfilePage />
            )}
          </div>
        </div>
      </main>
    </PublicLayout>
  );
};

export default Home;

import { RefObject, useEffect, useRef } from "react";
import { NextPage } from "next";
import PublicLayout from "../../components/PublicLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthUserInfo, SchoolInfo } from '@metricsai/metrics-interfaces';
import useSWR from "swr";
import ProfilePage from "../../components/ProfilePage";
import NoProfilePage from "../../components/NoProfilePage";
import Head from "next/head";
import {
  publicProfileAtom,
  busyAtom,
  schoolsAtom,
} from '@metricsai/metrics-store';
import {useAtom} from 'jotai';

const Home: NextPage = () => {
  const [busy, setBusy] = useAtom(busyAtom);
  // Get the router object
  const router = useRouter();
  const { username } = router.query;
  // Determine if the user is authenticated or not
  const { data: profile, isLoading: profileBusy } = useSWR<{
    status: boolean;
    data: AuthUserInfo;
  }>(`/api/${username}/profile`, (url) => fetch(url).then((res) => res.json()));
  const [publicProfile, setPublicProfile] = useAtom(publicProfileAtom);
  const _status = profile?.status;

  // const [schools, setSchools] = useState<>(false);
  const { data: dataschools, isLoading:schoolbusy } = useSWR<{status:boolean,schools:SchoolInfo[]}>(`/api/schools/list`, (url) => fetch(url).then((res) => res.json()));
  const [schools, setSchools] = useAtom(schoolsAtom);

  useEffect(() => {
    setBusy(true);
    if(!profileBusy && profile){
      setPublicProfile(profile.data);
    }
    if(!schoolbusy && dataschools){
      setSchools(dataschools.schools);
    }
    setBusy(false);
  }, [username, profileBusy,schoolbusy, _status]);

  return (
    <PublicLayout>
      {/* Head component with a title */}
      <Head>
        {_status ?
          <title>{`${publicProfile?.firstname} ${publicProfile?.lastname} @ MetricsAI`}</title>
          :
          <title>{`Profiles@MetricsAI`}</title>
        }
      </Head>
      <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div className="main-content">
          <div className="tab-content" id="pills-tabContent">
            {
            busy ? "Busy...":
            _status ? <ProfilePage /> : <NoProfilePage />
            }
          </div>
        </div>
      </main>
    </PublicLayout>
  );
};

export default Home;

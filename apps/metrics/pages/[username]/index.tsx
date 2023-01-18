import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import PublicLayout from '../../components/PublicLayout';
import { useRouter } from 'next/router';
import { IPostFeed } from '@metricsai/metrics-interfaces';
import ProfilePage from '../../components/ProfilePage';
import NoProfilePage from '../../components/NoProfilePage';
import Head from 'next/head';
import {
  publicProfileAtom,
  busyAtom,
  schoolsAtom,
  pageAtom,
} from '@metricsai/metrics-store';
import { useAtom } from 'jotai';
import { Virtuoso } from 'react-virtuoso';
import PostFeed from '../../components/PostFeed';

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

const getPostFeeds = async (token: string) => {
  const response = await fetch(`/api/accounts/${token}/post-feeds`);
  const data = await response.json();
  if (data.status) {
    return data.data;
  } else {
    return [];
  }
};

const Home: NextPage = () => {
  const [busy, setBusy] = useAtom(busyAtom);
  // Get the router object
  const router = useRouter();
  const { username } = router.query;
  const [, setPage] = useAtom(pageAtom);
  const [publicProfile, setPublicProfile] = useAtom(publicProfileAtom);
  const [, setSchools] = useAtom(schoolsAtom);
  const [isScrolling, setIsScrolling] = useState(false);
  const [postFeeds, setPostFeeds] = useState<IPostFeed[]>([]);

  useEffect(() => {
    setPage('metrics');
    setBusy(true);
    ProfileInfo(username as string).then((res) => {
      setPublicProfile(res);
    });
    getSchools().then((res) => {
      setSchools(res);
    });
    getPostFeeds(publicProfile?._id).then((res) => {
      setPostFeeds(res);
    });
    setBusy(false);
  }, [busy]);

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
              <>
                <ProfilePage />
                <div className="ui-block feeds mt-4">
                  <Virtuoso
                    style={{ height: '800px' }}
                    data={postFeeds}
                    totalCount={postFeeds?.length}
                    isScrolling={setIsScrolling}
                    itemContent={(index, post) => (
                      <PostFeed
                        key={index}
                        username={username as string}
                        post={post}
                        isScrolling={isScrolling}
                      />
                    )}
                  />
                </div>
              </>
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

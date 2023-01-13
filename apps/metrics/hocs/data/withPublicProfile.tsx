// HOC
import React, { useState, useEffect } from 'react';
import { AuthUserInfo } from '@metricsai/metrics-interfaces';
import { getUserInfo } from '../../libs/queries';
const cookie = require('js-cookie');

const withProfile = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<P> = (props) => {
    const [profile, setProfile] = useState<AuthUserInfo>({});
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      const token = cookie.get('token');
      if (token) {
        setLoading(true);
        getUserInfo(token).then((res) => {
          setProfile(res);
          setLoading(false);
        });
      }
    }, []);
    return (
      <WrappedComponent
        {...props}
        profile={profile}
        setProfile={setProfile}
        loading={loading}
      />
    );
  };
  return HOC;
};

export default withProfile;

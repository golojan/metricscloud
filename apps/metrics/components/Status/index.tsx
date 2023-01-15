import React, { useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { publicProfileAtom } from '@metricsai/metrics-store';
import { AuthUserInfo } from '@metricsai/metrics-interfaces';

const ProfileInfo = async (username: string) => {
  const response = await fetch(`/api/${username}/profile`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

export const UserStatus: React.FC = () => {
  const [profile] = useAtom(publicProfileAtom);

  const accountType = profile.accountType;
  const isVerified = profile.verified as boolean;

  type TStatusColors = {
    verified?: string;
    unverified?: string;
  };

  let colors: TStatusColors = {};

  if (accountType == 'STUDENT') {
    colors = {
      verified: 'bg-blue-600',
      unverified: 'bg-blue-300',
    };
  } else if (accountType == 'LECTURER') {
    colors = {
      verified: 'bg-green-600',
      unverified: 'bg-green-300',
    };
  } else if (accountType == 'ALUMNI') {
    colors = {
      verified: 'bg-yellow-600',
      unverified: 'bg-yellow-300',
    };
  } else {
    colors = {
      verified: 'bg-gray-600',
      unverified: 'bg-gray-300',
    };
  }

  const bgSnippet = isVerified ? colors.verified : colors.unverified;

  return (
    <>
      <span
        className={`ms-2 material-icons ${bgSnippet} p-0 md-16 fw-bold text-white rounded-circle ov-icon`}
      >
        done
      </span>
    </>
  );
};

type TOSProps = {
  username?: string;
};

export const OwnerStatus = (props: TOSProps) => {
  const { username } = props;
  const [profile, setProfile] = useState<AuthUserInfo>({});
  useEffect(() => {
    ProfileInfo(username).then((res) => {
      setProfile(res);
    });
  }, []);
  const accountType = profile.accountType;
  const isVerified = profile.verified as boolean;
  type TStatusColors = {
    verified?: string;
    unverified?: string;
  };
  let colors: TStatusColors = {};
  if (accountType == 'STUDENT') {
    colors = {
      verified: 'bg-blue-600',
      unverified: 'bg-blue-300',
    };
  } else if (accountType == 'LECTURER') {
    colors = {
      verified: 'bg-green-600',
      unverified: 'bg-green-300',
    };
  } else if (accountType == 'ALUMNI') {
    colors = {
      verified: 'bg-yellow-600',
      unverified: 'bg-yellow-300',
    };
  } else {
    colors = {
      verified: 'bg-gray-600',
      unverified: 'bg-gray-300',
    };
  }
  const bgSnippet = isVerified ? colors.verified : colors.unverified;
  return (
    <>
      <span
        className={`ms-2 material-icons ${bgSnippet} p-0 md-16 fw-bold text-white rounded-circle ov-icon`}
      >
        done
      </span>
    </>
  );
};

export const GSStatus: React.FC = () => {
  const [profile] = useAtom(publicProfileAtom);
  return (
    <>
      <span
        className={`ms-2 material-icons bg-${
          profile.googlePresence ? 'blue' : 'gray'
        }-500 p-0 md-16 fw-bold text-white rounded-circle ov-icon`}
      >
        done
      </span>
    </>
  );
};

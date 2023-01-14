import React from 'react';

import { useAtom } from 'jotai';
import { publicProfileAtom } from '@metricsai/metrics-store';

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

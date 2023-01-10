import React from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { useSelector } from 'react-redux';
import { RootState } from '@metricsai/metrics-store';

function SiteBusy() {
  const busy = useSelector((state: RootState) => state.settings.busy);
  return (
    <>
      {busy && (
        <BarLoader
          color="#66789c"
          loading={busy}
          width="100%"
          height={5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
}

export default SiteBusy;

import React from 'react';
import Link from 'next/link';

const AdBox = () => {
  return (
    <>
      <div className="input-group my-3 shadow-sm min-h-[50px] overflow-hidden bg-gradient-to-b from-[#556c91] to-[#3266af]">
        <Link href={'#'}>
          <img
            src="https://support.content.office.net/en-us/media/3490b636-e76f-4c9b-83a6-1a132c94433e.png"
            className="w-full"
            alt="Metrics"
          />
        </Link>
      </div>
    </>
  );
};

const AdBoxSlim = () => {
  return (
    <>
      <div className="input-group my-3 shadow-sm rounded-4 min-h-[50px] overflow-hidden bg-gradient-to-b from-[#556c91] to-[#3266af] relative p-2"></div>
    </>
  );
};
const AdBoxMidium = () => {
  return (
    <>
      <div className="input-group mb-3 shadow-sm rounded-4 min-h-[50px] overflow-hidden py-2 bg-gradient-to-b from-[#556c91] to-[#3266af]">
        <div className="text-white text-center w-full min-h-[100px]">
          <h3 className="text-4xl my-3">Ad</h3>
          <p className="text-sm">Ad space available</p>
        </div>
      </div>
    </>
  );
};

const AdBoxLarge = () => {
  return (
    <>
      <div className="input-group mb-3 shadow-sm rounded-4 min-h-[50px] overflow-hidden py-2 bg-gradient-to-b from-[#556c91] to-[#3266af]">
        <div className="text-white text-center w-full min-h-[200px]">
          <h3 className="text-4xl my-3">Ad</h3>
          <p className="text-sm">Ad space available</p>
        </div>
      </div>
    </>
  );
};
export { AdBox, AdBoxMidium, AdBoxLarge, AdBoxSlim };

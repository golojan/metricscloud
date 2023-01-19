import { NextPage } from 'next';
import React from 'react';
import { withAuth } from '@metricsai/metrics-hocs';
import { compose } from 'redux';

const Stats: NextPage = () => {
  return (
    <div className="row h-screen w-screen absolute top-0 right-0 bg-gradient-to-br from-[#25265e] to-black">
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
      <div className="col-1 min-h-[50px] bg-slate-600"></div>
    </div>
  );
};

export default compose(withAuth)(Stats);

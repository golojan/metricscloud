import React from 'react';

const AppDashBoardTopMenuScores = () => {
  return (
    <>
      <div className="balance">
        <div className="wallet-footer flex w-full border-t-0 border-0">
          <div className="item">
            <div>
              <span className="h1">{0}</span>
              <strong>Citations</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{0}</span>
              <strong>H-Index</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{0}</span>
              <strong>i10-H-Index</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">{0}</span>
              <strong>Total</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDashBoardTopMenuScores;

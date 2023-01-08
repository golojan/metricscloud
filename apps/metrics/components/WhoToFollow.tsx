import React from "react";
import FellowBox from "./FellowBox";

function WhoToFollow() {
  return (
    <>
      <div className="bg-white rounded-4 overflow-hidden shadow-sm account-follow mb-4">
        <h6 className="fw-bold text-body p-3 mb-0 border-bottom">
          Who to follow
        </h6>
        <FellowBox />
        <FellowBox />
      </div>
    </>
  );
}

export default WhoToFollow;

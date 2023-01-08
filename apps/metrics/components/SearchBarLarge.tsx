import React from "react";

function SearchBarLarge() {
  return (
    <>
      <div className="input-group mb-2 shadow-sm rounded-4 overflow-hidden py-2 bg-white relative">
        <span className="input-group-text material-icons border-0 bg-white text-primary text-2xl">
          search
        </span>
        <input
          type="text"
          className="form-control border-0 fw-light ps-1  text-xl"
          placeholder="Search metrics"
        />
      </div>
    </>
  );
}

export default SearchBarLarge;

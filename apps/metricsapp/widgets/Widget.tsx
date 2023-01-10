import { faAreaChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import ShowChartButton from "../components/ShowChartButton";
import PieChart from "./charts/PieChart";

type WidgetProps = {
  title?: string;
  value?: number;
  prefix?: string;
  showChartButton?: boolean;
  children?: any;
};


function Widget({
  title,
  value,
  prefix = "%",
  showChartButton = false,
  children
}: WidgetProps) {
  return (
    <>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box">
          <ShowChartButton show={showChartButton} />
          <div className="title">
            <strong className="text-black">{title}</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{" "}
            {value}
            {prefix}
          </h1>
          {children}
        </div>
      </div>
    </>
  );
}

export default Widget;

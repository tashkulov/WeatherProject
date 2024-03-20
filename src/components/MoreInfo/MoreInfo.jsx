import React from "react";
import Menu from "../Menu/Menu";
import Activities from "../Activities/Activities";
import Forecast from "../Forecast/Forecast";
import Details from "../Details/Details";
import "./MoreInfo.css";

const MoreInfo = () => {
  return (
    <div className="more_detailed_info">
      <Menu />
      <div className="activities_forecast">
        <Activities />
        <Forecast />
      </div>
      <Details className="details_air" />
    </div>
  );
};

export default MoreInfo;

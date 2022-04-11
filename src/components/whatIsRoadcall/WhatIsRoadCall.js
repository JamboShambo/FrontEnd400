import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../whatIsRoadcall/WhatIsRoadCall.css";

function WhatIsRoadCall() {
  return (
    <div className="" style={{}}>
      <div className="col"></div>

      <div className="col l12">
        <div
          style={{ padding: "2%", margin: "" }}
          class="card-panel grey z-depth-3"
        >
          <span class="white-text">
            Welcome to RoadCall! Here is where you can help your local
            communities by reporting infastructure related problems like pot
            holes or broken streetlamps! After you have reported your issue, the
            data will be passed over to the local county council. With this
            information they can make better decisions on what to address! So
            keep reporting and lets get our communities in tip top shape!
            <b style={{ color: "#145d89" }}> - Team RoadCall </b>
          </span>
        </div>
      </div>

      <div className="col"></div>
    </div>
  );
}
export default WhatIsRoadCall;

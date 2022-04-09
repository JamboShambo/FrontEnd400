import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../whatIsRoadcall/WhatIsRoadCall.css";

function WhatIsRoadCall() {
  return (
    <div style={{}}>
      <div className="col l3"></div>

      <div className="col l6">
        <div class="card-panel grey">
          <span class="white-text">
            Welcome to RoadCall! Here is where you can help your local
            communities by reporting infastructure related problems like pot
            holes or broken streetlamps! After you have reported your issue, the
            data will be passed over to the local county council. With this
            information they can make better decisions on what to address! So
            keep reporting and lets get our communities in tip top shape!
            <b style={{ color: "Black" }}> - Team RoadCall </b>
          </span>
        </div>
      </div>

      <div className="col l3"></div>
    </div>
  );
}
export default WhatIsRoadCall;

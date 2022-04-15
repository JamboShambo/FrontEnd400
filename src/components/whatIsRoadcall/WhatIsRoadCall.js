import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../whatIsRoadcall/WhatIsRoadCall.css";

function WhatIsRoadCall() {
  return (
    <div className=" center" style={{}}>
      <div className="col">
        <div
          style={{ padding: ".5%", margin: "" }}
          class="card-panel grey z-depth-3"
        >
          <span class="white-text">
            <p>
              Welcome to RoadCall! Here is where you can help your local
              communities by reporting infastructure related problems like pot
              holes or broken streetlamps! To send a report please login and
              head to your profile!
            </p>
            <p>
              The data will be passed over to the local county council. With
              this information they can make better decisions on what to
              address! So keep reporting and lets get our communities in tip top
              shape!
              <b style={{ color: "#145d89" }}> - Team RoadCall </b>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
export default WhatIsRoadCall;

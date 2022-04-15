import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../whatIsRoadcall/WhatIsRoadCall.css";

function WhatIsProfile() {
  return (
    <div className=" center" style={{}}>
      <div className="col">
        <div
          style={{ padding: ".5%", margin: "" }}
          class="card-panel grey z-depth-3"
        >
          <span class="white-text">
            <p>
              This is your profile where you can see your own reports and make
              new ones! To make a report please click on the location on the map
              and fill in fill in some details!
              <b style={{ color: "#145d89" }}> - Team RoadCall </b>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
export default WhatIsProfile;

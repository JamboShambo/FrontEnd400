import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Row } from "react-materialize";
import Foot from "../foot/Foot";

import Maps from "../maps/Maps";
import WhatIsRoadCall from "../whatIsRoadcall/WhatIsRoadCall";
import ReportTable from "../reportTable/ReportTable";
import { padding } from "@mui/system";

function Categories() {
  //sets a state to whether a submited booking has been posted

  return (
    <div style={{ backgroundColor: "#e0e0e0", marginTop: "5px" }}>
      <div class="chip grey">
        <img src="./graffiti.svg" alt="graffiti"></img>
        Graffiti
      </div>
      <div class="chip grey">
        <img src="./road.svg" alt="road"></img>
        Road or Path
      </div>
      <div class="chip grey">
        <img src="./street-light.svg" alt="street-light"></img>
        Street lighting
      </div>
      <div class="chip grey">
        <img src="./trash.svg" alt="trash"></img>
        Litter and Illegal Dumping
      </div>
      <div class="chip grey">
        <img src="./tree.svg" alt="tree"></img>
        Tree and Grass
      </div>
    </div>
  );
}
export default Categories;

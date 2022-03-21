import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Row } from "react-materialize";
import Foot from "../foot/Foot";

import ProfileMap from "../profileMap/ProfileMap";

function Profile() {
  //sets a state to whether a submited booking has been posted

  return (
    <div>
      {/* <Row style={{ marginBottom: "10%" }}>
        <Header></Header>
      </Row> */}

      <Row style={{ marginBottom: "0%", marginTop: "0%" }}>
        <ProfileMap></ProfileMap>
      </Row>
      <Row style={{ marginBottom: "0%", marginTop: "0%" }}>
        <Foot></Foot>
      </Row>
    </div>
  );
}
export default Profile;

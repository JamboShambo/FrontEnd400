import React, { useState } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Row } from "react-materialize";
import Header from "../header/Header";
import Foot from "../foot/Foot";

import ProfileMap from "../profileMap/ProfileMap";
import DetailsModal from "../detailsModal/DetailsModal";

function Profile() {
  //sets a state to whether a submited booking has been posted
  const [userID, setUserID] = useState("");

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

import React, { useEffect } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Row } from "react-materialize";
import Foot from "../foot/Foot";
import Header from "../header/Header";
import WhatIsRoadCall from "../whatIsRoadcall/WhatIsRoadCall";
import ProfileMap from "../profileMap/ProfileMap";
import CategoriesProfile from "../categoryProfile/CategoriesProfile";

function Profile() {
  useEffect(() => {
    var isLoggedIn = window.localStorage.getItem("isAuthenticated");
    if (isLoggedIn === "false") {
      window.location.pathname = "/login";
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#e0e0e0" }}>
      <div style={{ paddingBottom: "10px" }} class="col l8 s12">
        <Header></Header>
      </div>

      <div className="container">
        <div class="row">
          <div class="col l6 s12">
            {/* <WhatIsRoadCall></WhatIsRoadCall> */}
          </div>
        </div>
      </div>

      <div className="container">
        <div class="row">
          <div class="col l12 s12">
            <CategoriesProfile></CategoriesProfile>
            <ProfileMap></ProfileMap>
          </div>
        </div>
      </div>

      <Row
        className="container"
        style={{
          marginBottom: "0%",
          marginTop: "0%",
          height: "1000px",
        }}
      ></Row>

      <Row style={{ marginBottom: "0%", marginTop: "0%" }}>
        <Foot></Foot>
      </Row>
    </div>
  );
}
export default Profile;

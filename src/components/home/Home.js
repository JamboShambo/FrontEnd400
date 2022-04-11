import React, { useEffect } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Row } from "react-materialize";
import Foot from "../foot/Foot";
import Maps from "../maps/Maps";
import WhatIsRoadCall from "../whatIsRoadcall/WhatIsRoadCall";
import ReportTable from "../reportTable/ReportTable";
import Categories from "../categories/Categories";
import Header from "../header/Header";

function Home() {
  //sets a state to whether a submited booking has been posted

  useEffect(() => {
    var isLoggedIn = window.localStorage.getItem("isAuthenticated");
    if (isLoggedIn === "false") {
      // window.location.pathname = "/login";
    }
  }, []);

  return (
    // <div style={{ backgroundColor: "#e0e0e0" }}>

    <div style={{ backgroundColor: "" }}>
      <div style={{ paddingBottom: "10px" }} class="col l8 s12">
        <Header></Header>
      </div>

      <div className="container">
        <div class="row">
          <div class="col l12 s12">
            <WhatIsRoadCall></WhatIsRoadCall>
          </div>
        </div>
      </div>

      <div className="container">
        <div class="row">
          <div class="col l12 s12">
            <Maps />
          </div>

          <div class="col l8 s12">
            <ReportTable></ReportTable>
          </div>

          <div class="col l4 s12">
            <Categories></Categories>
          </div>
          <div class="col l4 s12">
            <ReportTable></ReportTable>
          </div>
        </div>
      </div>

      {/* <div className="container">
        <div class="row">
          <div style={{ border: "2px solid green" }} class="col s4">
            NEWS
          </div>
        </div>
      </div> */}

      <Row
        className="container"
        style={{
          marginBottom: "0%",
          marginTop: "0%",
          height: "150%",
        }}
      ></Row>

      <Row style={{ marginBottom: "0%", marginTop: "3%" }}>
        <Foot></Foot>
      </Row>
    </div>
  );
}
export default Home;

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
import envVars from "../../config";
import axios from "axios";

function Home() {
  //sets a state to whether a submited booking has been posted
  const [getEvents, setGetEvents] = React.useState([]);
  var OneMonthCount = window.localStorage.getItem("monthReports");

  useEffect(() => {
    var isLoggedIn = window.localStorage.getItem("isAuthenticated");
    if (isLoggedIn === "false") {
      // window.location.pathname = "/login";

      getTheEvents();
    }
  }, []);

  const getTheEvents = () => {
    axios
      .get(envVars.GetAllEvents, {
        headers: {
          "x-api-key": envVars.CustomerApiKeyGateway, // api key for API gateway
        },
      })
      .then((response) => {
        response.data.events.forEach((el) => {
          el.lat = parseFloat(el.lat);
          el.lng = parseFloat(el.lng);
        });
        setGetEvents(response.data.events);
        localStorage.setItem(
          "homePageEvents",
          JSON.stringify(response.data.events)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <div style={{ backgroundColor: "#e0e0e0" }}>

    <div style={{ backgroundColor: "" }}>
      <div style={{ paddingBottom: "10px" }} class="col l8 s12">
        <Header></Header>
      </div>

      <div className="container">
        <div class="row">
          <div class="col l3"></div>
          <div class="col l6 s12">
            <WhatIsRoadCall></WhatIsRoadCall>
          </div>

          <div class="col l4">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text center">
                <span class="card-title">Reports in previous Month </span>
                {OneMonthCount}
              </div>
            </div>
          </div>
          <div class="col l3"></div>
        </div>
      </div>

      <div className="container">
        <div class="row">
          <div class="col l12 s12">
            <Maps />
          </div>

          <div class="col l8 s12">
            {/* <ReportTable getEvents={getEvents}></ReportTable> */}
          </div>

          <div class="col l4 s12">
            <Categories></Categories>
          </div>
          <div class="col l4 s12">{/* <ReportTable></ReportTable> */}</div>
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

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React, { useState } from "react";
import envVars from "../../config";
import axios from "axios";
import {
  eventTypeErrorMsg,
  eventNameErrorMsg,
  eventDespErrorMsg,
} from "../../componentText/regexError";

function DetailsModal({
  latToPost,
  lngToPost,
  open,
  setOpen,
  reverseGeoStateFromProfile,
}) {
  const [eventType, setEventType] = useState("");
  // const [eventTypeImg, setEventTypeImg] = useState("");
  const [eventTypeErr, setEventTypeErr] = useState(false);

  const [eventName, setEventName] = useState("");
  // const [eventNameImg, setEventNameImg] = useState("");
  const [eventNameErr, setEventNameErr] = useState(false);

  const [eventDescription, setEventDescription] = useState("");
  // const [eventDescriptionImg, setEventDescriptionImg] = useState("");
  const [eventDescriptionErr, setEventDescriptionErr] = useState(false);

  const [reverseGeoState, setReverseGeoState] = useState([]);

  var graffitiImg = "/graffiti.svg";
  var roadImg = "/road.svg";
  var lightingImg = "/street-light.svg";
  var dumpingImg = "/trash.svg";
  var treeImg = "/tree.svg";

  const localReverseGeo = window.localStorage.getItem("reverseGeo");

  if (localReverseGeo === "undefined") {
    console.log("it is undefined");

    window.alert("Invalid click, please try again.");

    window.location.reload();
  } else {
    var localReverseGeoParse = JSON.parse(localReverseGeo);

    if (!localReverseGeoParse.road) {
      localReverseGeoParse.road = "";
    }
    if (!localReverseGeoParse.suburb) {
      localReverseGeoParse.suburb = "";
    }
    if (!localReverseGeoParse.city_district) {
      localReverseGeoParse.city_district = "";
    }
    if (!localReverseGeoParse.region) {
      localReverseGeoParse.region = "";
    }
    if (!localReverseGeoParse.county) {
      localReverseGeoParse.county = "";
    }
    if (!localReverseGeoParse.state_district) {
      localReverseGeoParse.state_district = "";
    }
    if (!localReverseGeoParse.postcode) {
      localReverseGeoParse.postcode = "";
    }
    if (!localReverseGeoParse.suburb) {
      localReverseGeoParse.suburb = "";
    }
    if (!localReverseGeoParse.town) {
      localReverseGeoParse.town = "";
    }
  }

  var dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(event);

    if (eventType === "") {
      setEventTypeErr(true);
    }
    if (eventName === "") {
      setEventNameErr(true);
    }
    if (eventDescription === "") {
      setEventDescriptionErr(true);
    }

    if (eventType === "Graffiti") {
      localStorage.setItem("setEventTypeImg", graffitiImg);
    }
    if (eventType === "Road or Path") {
      localStorage.setItem("setEventTypeImg", roadImg);
    }
    if (eventType === "Street Lighting") {
      localStorage.setItem("setEventTypeImg", lightingImg);
    }
    if (eventType === "Litter and Illegal Dumping") {
      localStorage.setItem("setEventTypeImg", dumpingImg);
    }
    if (eventType === "Tree and Grass") {
      localStorage.setItem("setEventTypeImg", treeImg);
    }

    // if (
    //   eventTypeErr === false &&
    //   eventNameErr === false &&
    //   eventDescriptionErr === false
    // ) {
    //   console.log("hii" + eventType);

    //post
    getTheReversGeo();

    postTheReversGeo();

    //close modal
    setOpen(false);
    // } else {
    // setEventTypeErr(false);
    // setEventNameErr(false);
    // setEventDescriptionErr(false);
    // }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const getTheReversGeo = () => {
    var config2 = {
      method: "GET",
      url:
        "https://nominatim.openstreetmap.org/reverse?lat=" +
        latToPost +
        "&" +
        "lon=" +
        lngToPost +
        "&format=json",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config2)
      .then(function (response) {
        console.log(reverseGeoStateFromProfile);

        console.log(response.data.address);
        localStorage.setItem(
          "reverseGeo",
          JSON.stringify(response.data.address)
        );
        setReverseGeoState(response.data.address);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postTheReversGeo = () => {
    // const localReverseGeo = window.localStorage.getItem("reverseGeo");
    var n = JSON.parse(localReverseGeo);

    if (!n.road) {
      n.road = "";
    }
    if (!n.suburb) {
      n.suburb = "";
    }
    if (!n.city_district) {
      n.city_district = "";
    }
    if (!n.region) {
      n.region = "";
    }
    if (!n.county) {
      n.county = "";
    }
    if (!n.state_district) {
      n.state_district = "";
    }
    if (!n.postcode) {
      n.postcode = "";
    }

    setReverseGeoState(n);
    console.log(JSON.parse(localReverseGeo));
    console.log(reverseGeoState);

    var rngID = getRandomInt(99999);
    rngID = rngID.toString();

    var dataToPost = JSON.stringify({
      eventID: rngID,
      eventType: eventType,
      eventTypeImg: window.localStorage.getItem("setEventTypeImg"),
      eventName: eventName,
      eventTime: new Date().toLocaleDateString("en-US", dateOptions),
      eventTimeDetail: new Date().toLocaleDateString("en-GB"),
      eventTimeDefault: new Date(),
      eventDescription: eventDescription,
      lat: latToPost,
      lng: lngToPost,
      userID: localStorage.getItem("userID"),
      road: n.road,
      suburb: n.suburb,
      city_district: n.city_district,
      region: n.region,
      county: n.county,
      state_district: n.state_district,
      postcode: n.postcode,
    });

    var config = {
      method: "post",
      url: envVars.PostEventInConfig,
      headers: {
        "x-api-key": envVars.CustomerApiKeyGateway,
        "Content-Type": "application/json",
      },
      data: dataToPost,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.pathname = "/profile";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div style={{ width: "50%", padding: "" }} className="row">
      <form className="col s12" method="post" onSubmit={onSubmit}>
        <div className="row center">
          <label className="center">Report Type</label>

          <div style={{ marginBottom: "10px" }} className="regex">
            <p>{eventTypeErr && eventTypeErrorMsg}</p>
          </div>

          <div class="input-field col s12">
            <select
              id="eventType"
              type="text"
              value={eventType}
              onChange={(event) => setEventType(event.target.value)}
              className="browser-default"
            >
              <option value="" disabled selected></option>
              <option value="Graffiti">Graffiti </option>
              <option value="Road or Path">Road or Path</option>
              <option value="Street Lighting">Street Lighting</option>
              <option value="Litter and Illegal Dumping">
                Litter and Illegal Dumping
              </option>
              <option value="Tree and Grass">Tree and Grass</option>
            </select>
          </div>
        </div>
        <div className="row center">
          <label htmlFor="eventName">Report Name</label>

          <p style={{ color: "red", width: "" }}>
            {" "}
            {eventNameErr && eventNameErrorMsg}
          </p>

          <div className="input-field col s12">
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="row center">
          <label htmlFor="eventDescription">Report Description</label>

          <p style={{ color: "red", width: "" }}>
            {" "}
            {eventDescriptionErr && eventDespErrorMsg}
          </p>

          <div className="input-field col s12">
            <input
              id="eventDescription"
              type="text"
              value={eventDescription}
              onChange={(event) => setEventDescription(event.target.value)}
            ></input>
          </div>
        </div>

        <div className="row center">
          <label htmlFor="eventDescription">Report Location</label>

          <div className="input-field col s12">
            <input
              readOnly={true}
              id="coOrds"
              type="text"
              value={
                // JSON.stringify(localReverseGeo)
                localReverseGeoParse.road +
                " " +
                localReverseGeoParse.suburb +
                " " +
                localReverseGeoParse.county
              }
            ></input>
          </div>
        </div>

        <div className="row center">
          {/* <button
            onClick={submitEvent()}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </button> */}

          <button
            id="submitBtn123"
            type="submit"
            name="btnSubmitEvent"
            className="center submitBtn123 btn btn-large waves-effect black"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DetailsModal;

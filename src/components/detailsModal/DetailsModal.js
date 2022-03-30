import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React, { useState } from "react";
import envVars from "../../config";
import axios from "axios";

function DetailsModal({ latToPost, lngToPost, open, setOpen }) {
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [reverseGeoState, setReverseGeoState] = useState([]);

  var dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //close modal
    setOpen(false);

    //post

    getTheReversGeo();

    postTheReversGeo();

    //response

    //check response

    //if good

    //if bad
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
    const localReverseGeo = window.localStorage.getItem("reverseGeo");
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
      eventName: eventName,
      eventTime: new Date().toLocaleDateString("en-US", dateOptions),
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
    <div style={{ width: "50%", paddingTop: "5%" }} className="row">
      <form className="col s12" method="post" onSubmit={onSubmit}>
        <div className="row">
          <div class="input-field col s12">
            <label>Event Type</label>
            <select
              id="eventType"
              type="text"
              value={eventType}
              onChange={(event) => setEventType(event.target.value)}
              className="browser-default"
            >
              <option value="" disabled selected></option>
              <option value="Graffiti">Graffiti</option>
              <option value="Road or Path">Road or Path</option>
              <option value="Street Lighting">Street Lighting</option>
              <option value="Litter and Illegal Dumping">
                Litter and Illegal Dumping
              </option>
              <option value="Tree and Grass">Tree and Grass</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
            ></input>
            <label htmlFor="eventName">Event Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="eventDescription"
              type="text"
              value={eventDescription}
              onChange={(event) => setEventDescription(event.target.value)}
            ></input>
            <label htmlFor="eventDescription">Event Description</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              readOnly={true}
              id="coOrds"
              type="text"
              value={latToPost + " " + lngToPost}
            ></input>
          </div>
        </div>

        <div className="row">
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
            type="submit"
            name="btnSubmitEvent"
            className="col btn btn-large waves-effect indigo"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DetailsModal;

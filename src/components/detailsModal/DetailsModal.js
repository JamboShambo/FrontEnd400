import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React, { useState } from "react";
import envVars from "../../config";
import axios from "axios";

function DetailsModal({ latToPost, lngToPost, open, setOpen }) {
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [coordinantes, setCoordinantes] = useState("");

  const theUserID = window.localStorage.getItem("userID");

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
    var rngID = getRandomInt(99999);
    rngID = rngID.toString();
    var data = JSON.stringify({
      eventID: rngID,
      eventType: eventType,
      eventName: eventName,
      eventTime: new Date().toLocaleDateString("en-US", dateOptions),
      eventDescription: eventDescription,
      lat: latToPost,
      lng: lngToPost,
      userID: localStorage.getItem("userID"),
    });

    console.log(data);
    var config = {
      method: "post",
      url: envVars.PostEventInConfig,
      headers: {
        "x-api-key": envVars.CustomerApiKeyGateway,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    // setGetEvents((current) => [
    //   ...current,
    //   {
    //     lat: e.latLng.lat(),
    //     lng: e.latLng.lng(),
    //     eventTime: new Date(),
    //   },
    // ]);

    //response

    //check response

    //if good

    //if bad
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div style={{ width: "50%", paddingTop: "5%" }} className="row">
      <form className="col s12" method="post" onSubmit={onSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="eventType"
              type="text"
              value={eventType}
              onChange={(event) => setEventType(event.target.value)}
            ></input>
            <label htmlFor="eventType">Event Type</label>
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

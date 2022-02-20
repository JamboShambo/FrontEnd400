import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import React, { useState } from "react";

function DetailsModal({ loggedInEmail, setLoggedInEmail }) {
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [coordinantes, setCoordinantes] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(eventType);
    console.log(eventName);
    console.log(eventDescription);
    console.log(coordinantes);
  };

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
              id="coOrds"
              type="text"
              value={coordinantes}
              onChange={(event) => setCoordinantes(event.target.value)}
            ></input>
            <label htmlFor="coOrds">Coordinates</label>
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

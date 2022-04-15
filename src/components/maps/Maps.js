/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import axios from "axios";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../maps/Maps.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import { style1, style2, style3, style4 } from "../maps/MapsStyle";
import envVars from "../../config";

const libraries = ["places"];

const mapContainerStyle = {
  height: "500px",
  width: "100%",
};

const center = {
  lat: 53.52647,
  lng: -7.433293,
  //53.3942357,-10.1983269
  //53.52647,-7.433293 ireland more center
};

// const theUserID = window.localStorage.getItem("userID");

function Maps({ setUserID, userID }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: envVars.gmapkey,
    libraries,
  });

  const [selected, setSelected] = React.useState(null);
  const [getEvents, setGetEvents] = React.useState([]);
  const [newMapStyle, setNewMapStyle] = React.useState("");

  var options = {
    styles: newMapStyle,
    disableDefaultUI: true,
    zoomControl: true,
  };
  useEffect(() => {}, []);

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

    //------------------------------------------------

    var homePageEvents = window.localStorage.getItem("homePageEvents");

    //filter by one month ago
    var startDateMonth = new Date();
    var pastMonthDate = startDateMonth.getDate() - 30; // -30 days
    startDateMonth.setDate(pastMonthDate);
    var endDateMonth = new Date(); //todays date

    var resultOneMonthAgo = homePageEvents.filter((a) => {
      var date = new Date(a.eventTimeDefault);
      return date >= startDateMonth && date <= endDateMonth;
    });
    console.log(resultOneMonthAgo);
    var OneMonthCount = resultOneMonthAgo.length;

    window.localStorage.setItem("monthReports", OneMonthCount);

    //------------------------------------------------
  };

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    localStorage.setItem("mapStyleChoice", style1);
    // var mapChoice = window.localStorage.getItem("mapStyleChoice");
    setNewMapStyle(style1);

    mapRef.current = map;
    getTheEvents();

    // var mapChoice = window.localStorage.getItem("mapStyleChoice");

    // if (mapChoice !== "default") {
    //   localStorage.setItem("mapStyleChoice", "default");
    //   setNewMapStyle()
    // }
    // else{
    //   localStorage.setItem("mapStyleChoice", "default");
    // }
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  const mapStyleChange = (e) => {
    const value1 = e.currentTarget.getAttribute("data-value1");

    if (value1 === "1") {
      setNewMapStyle(style1);
      var ele = document.getElementById("1");
      ele.classList.add("red");
    }
    if (value1 === "2") {
      setNewMapStyle(style2);
    }
    if (value1 === "3") {
      setNewMapStyle(style3);
    }
    if (value1 === "4") {
      setNewMapStyle(style4);
    }
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="z-depth-5" style={{ border: "3px solid black" }}>
      <div
        className="container"
        style={{
          backgroundColor: "#145d89",
          width: "100%",
          borderBottom: "3px solid black",
        }}
      >
        <div className="row" style={{ marginBottom: "0%" }}>
          <div className="col l6 s12 center">
            <h6 style={{ marginTop: "0.5%" }}>
              <b>Choose a Map style</b>
            </h6>
            <a
              id="1"
              style={{ margin: "0.5%" }}
              class="waves-effect waves-light btn-small black"
              onClick={mapStyleChange}
              data-value1="1"
            >
              Default
            </a>
            <a
              id="2"
              style={{ margin: "0.5%" }}
              class="waves-effect waves-light btn-small black"
              onClick={mapStyleChange}
              data-value1="2"
            >
              Bright
            </a>
            <a
              id="3"
              style={{ margin: "0.5%" }}
              class="waves-effect waves-light btn-small black"
              onClick={mapStyleChange}
              data-value1="3"
            >
              Dark
            </a>
            <a
              id="4"
              style={{ margin: "0.5%" }}
              class="waves-effect waves-light btn-small black"
              onClick={mapStyleChange}
              data-value1="4"
            >
              Corporate
            </a>
          </div>

          <div className="col l2 s12 center" style={{ marginTop: "0.25%" }}>
            <h6 style={{ marginTop: "0.5%" }}>
              <b>Current Location</b>
            </h6>

            <a
              style={{}}
              class="waves-effect waves-light btn-small black center"
            >
              <Locate panTo={panTo} />
            </a>
          </div>

          <div className="col s1"> </div>

          <div style={{ marginTop: "0.5%" }} className="col l2 s10 center">
            <Search panTo={panTo} />
          </div>
          <div className="col s1"> </div>

          <div className="col l1"> </div>
        </div>
      </div>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={7.3}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {getEvents.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: marker.eventTypeImg,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>
                <b>Date: </b> {selected.eventTime}
              </p>
              <p>
                <b>Type: </b>
                {selected.eventType}
              </p>
              {/* <p><b>Date: </b>{selected.eventName}</p> */}
              {selected.road !== "" ? (
                <p>
                  <b>Street: </b>
                  {selected.road}
                </p>
              ) : (
                <p></p>
              )}

              <p>
                <b>{selected.county} </b>
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      style={{ color: "white" }}
      className="locate waves-effect waves-light btn-small black"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      Locate
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 53.3942357, lng: () => -10.1983269 },
      radius: 100 * 100,
      componentRestrictions: { country: "IE" },
    },
  });

  //53.3942357,-10.1983269
  //https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      setValue("", false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="search" style={{}}>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          style={{ color: "White" }}
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Maps;

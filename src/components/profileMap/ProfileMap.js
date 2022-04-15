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
import DetailsModal from "../detailsModal/DetailsModal";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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

const theUserID = window.localStorage.getItem("userID");

function ProfileMap({ setUserID, userID }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: envVars.gmapkey,
    libraries,
  });

  const [selected, setSelected] = React.useState(null);
  const [getEvents, setGetEvents] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [latToPost, setLatToPost] = React.useState("");
  const [lngToPost, setLngToPost] = React.useState("");
  const [newMapStyle, setNewMapStyle] = React.useState("");
  const [reverseGeoState, setReverseGeoState] = React.useState([]);

  const options = {
    styles: newMapStyle,
    disableDefaultUI: true,
    zoomControl: true,
  };

  // const [userID, setUserID] = React.useState("");

  useEffect(() => {}, []);

  const getTheEvents = () => {
    axios
      .get(envVars.GetUsersEvents + theUserID, {
        headers: {
          "x-api-key": envVars.CustomerApiKeyGateway, // api key for API gateway
        },
      })
      .then((response) => {
        response.data.Items.forEach((el) => {
          el.lat.N = parseFloat(el.lat.N);
          el.lng.N = parseFloat(el.lng.N);
        });
        setGetEvents(response.data.Items);
        console.log(response.data.Items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getTheReversGeo = () => {
  //   var theLat = window.localStorage.getItem("setLatToPost");
  //   var theLng = window.localStorage.getItem("setLngToPost");

  //   var config2 = {
  //     method: "GET",
  //     url:
  //       "https://nominatim.openstreetmap.org/reverse?lat=" +
  //       theLat +
  //       "&" +
  //       "lon=" +
  //       theLng +
  //       "&format=json",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   axios(config2)
  //     // .then((response) => {
  //     //   console.log(response);
  //     //   localStorage.setItem("reverseGeo",JSON.stringify(response.data.address));
  //     //   setReverseGeoState(response.data.address);
  //     // })
  //     .then((response) => {
  //       setReverseGeoState(
  //         {
  //           response: response.data.address,
  //         },
  //         () =>
  //           localStorage.setItem(
  //             "reverseGeo",
  //             JSON.stringify(response.data.address)
  //           )
  //       );
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   console.log(reverseGeoState);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const onMapClick = React.useCallback((e) => {
    console.log(e);
    setLatLngState(e);

    var theLat = window.localStorage.getItem("setLatToPost");
    var theLng = window.localStorage.getItem("setLngToPost");

    var config2 = {
      method: "GET",
      url:
        "https://nominatim.openstreetmap.org/reverse?lat=" +
        theLat +
        "&" +
        "lon=" +
        theLng +
        "&format=json",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config2)
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "reverseGeo",
          JSON.stringify(response.data.address)
        );
        setReverseGeoState(response.data.address);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(reverseGeoState);

    handleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    localStorage.setItem("mapStyleChoice", style1);
    // var mapChoice = window.localStorage.getItem("mapStyleChoice");
    setNewMapStyle(style1);

    mapRef.current = map;
    getTheEvents();
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
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

  const handleClose = () => {
    setOpen(false);
  };

  function setLatLngState(e) {
    setLatToPost(e.latLng.lat());
    setLngToPost(e.latLng.lng());

    localStorage.setItem("setLatToPost", e.latLng.lat());
    localStorage.setItem("setLngToPost", e.latLng.lng());
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "5px solid #000",
    boxShadow: 24,
    // pt: 2,
    // px: 4,
    // pb: 3,
  };

  return (
    <div style={{ border: "3px solid black" }}>
      {/* <button onClick={testme}>click</button> */}
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

            <a class="waves-effect waves-light btn-small black center">
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
        onClick={(event) => {
          // handleOpen();
          onMapClick(event);
        }}
        onLoad={onMapLoad}
      >
        {getEvents.map((marker) => (
          <Marker
            key={`${marker.lat.N}-${marker.lng.N}`}
            position={{ lat: marker.lat.N, lng: marker.lng.N }}
            onClick={() => {
              setSelected(marker);
              console.log(marker);
            }}
            icon={{
              url: marker.eventTypeImg.S,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat.N, lng: selected.lng.N }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>{selected.eventTime.S}</p>
              <p>{selected.eventType.S}</p>
              <p>{selected.eventName.S}</p>
              <p>{selected.road.S}</p>
              <p>{selected.suburb.S}</p>
              <p>{selected.county.S}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>

      <div style={{ display: "none" }}>
        <Button id="postEventClick" onClick={handleOpen}>
          Open modal
        </Button>
        <Modal
          style={
            {
              // opacity: "0.5",
            }
          }
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box style={{}} sx={{ ...style, width: 600 }}>
            <h2
              style={{
                backgroundColor: "#145d89",
                borderBottom: "5px solid #000",
                margin: "0%",
              }}
              className="center"
              id="parent-modal-title"
            >
              Send a Report!
            </h2>
            <p
              // style={{ border: "5px solid #000" }}
              id="parent-modal-description"
            >
              <DetailsModal
                latToPost={latToPost}
                lngToPost={lngToPost}
                open={open}
                setOpen={setOpen}
                reverseGeoState={reverseGeoState}
              ></DetailsModal>
            </p>
            {/* <ChildModal /> */}
          </Box>
        </Modal>
      </div>
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
            console.log(position);

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

export default ProfileMap;

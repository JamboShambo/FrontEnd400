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
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./MapsStyle";
import envVars from "../../config";
import DetailsModal from "../detailsModal/DetailsModal";
// import NestedModal from "../modal/Modal";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const libraries = ["places"];

const mapContainerStyle = {
  height: "95vh",
  width: "100vw",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 53.52647,
  lng: -7.433293,
  //53.3942357,-10.1983269
  //53.52647,-7.433293 ireland more center
};

const theUserID = window.localStorage.getItem("userID");

function Maps({ setUserID, userID }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: envVars.gmapkey,
    libraries,
  });

  const [selected, setSelected] = React.useState(null);
  const [getEvents, setGetEvents] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [latToPost, setLatToPost] = React.useState("");
  const [lngToPost, setLngToPost] = React.useState("");

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

    var zero = 0;
    getEvents.forEach((el) => {
      // el.lat = parseFloat(el.lat);
      // el.lng = parseFloat(el.lng);
      // getEvents.filter((e) => e.userID === theUserID);
      // if (el.userID === theUserID) {
      //   // el.splice(zero, 1);
      // }
      zero++;
    });
  };

  const onMapClick = React.useCallback((e) => {
    // var rngID = getRandomInt(99999);
    // rngID = rngID.toString();
    // var data = JSON.stringify({
    //   eventID: rngID,
    //   eventType: "1",
    //   eventName: "Rubbish on path",
    //   eventTime: new Date(),
    //   eventDescription: "On mainstreet beside post office!",
    //   lat: e.latLng.lat(),
    //   lng: e.latLng.lng(),
    //   userID: theUserID,
    // });

    console.log(e);
    // console.log(data);
    // var config = {
    //   method: "post",
    //   url: envVars.PostEventInConfig,
    //   headers: {
    //     "x-api-key": envVars.CustomerApiKeyGateway,
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    setLatLngState(e);

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // setGetEvents((current) => [
    //   ...current,
    //   {
    //     lat: e.latLng.lat(),
    //     lng: e.latLng.lng(),
    //     eventTime: new Date(),
    //   },
    // ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    getTheEvents();
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(8);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function setLatLngState(e) {
    setLatToPost(e.latLng.lat());
    setLngToPost(e.latLng.lng());
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div>
      <Locate panTo={panTo} />

      {/* <DetailsModal></DetailsModal> */}
      {/* <NestedModal></NestedModal> */}
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        // onClick={handleOpen; onMapClick}
        onClick={(event) => {
          handleOpen();
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
            }}
            icon={{
              url: `/map-pin.svg`,
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
              <h2>
                {/* <span role="img" aria-label="">

                </span>{" "} */}
                Alert
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>

      {/* <Locate panTo={panTo} /> */}
      <div>
        <Button id="postEventClick" onClick={handleOpen}>
          Open modal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 600 }}>
            <h2 id="parent-modal-title">Event Log</h2>
            <p id="parent-modal-description">
              <DetailsModal
                latToPost={latToPost}
                lngToPost={lngToPost}
                open={open}
                setOpen={setOpen}
              ></DetailsModal>
            </p>
            {/* <ChildModal /> */}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

// function NestedModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     pt: 2,
//     px: 4,
//     pb: 3,
//   };

//   return (
//     <div>
//       <Button id="postEventClick" onClick={handleOpen}>
//         Open modal
//       </Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box sx={{ ...style, width: 600 }}>
//           <h2 id="parent-modal-title">Event Log</h2>
//           <p id="parent-modal-description">
//             <DetailsModal></DetailsModal>
//           </p>
//           {/* <ChildModal /> */}
//         </Box>
//       </Modal>
//     </div>
//   );
// }

function Locate({ panTo }) {
  return (
    <button
      className="locate"
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
      <img src="/compass.svg" alt="compass" style={{ width: "80px" }} />
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
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search" style={{ float: "left" }}>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
          style={{
            // textColor: "White",
            // textDecorationColor: "red",
            // backgroundColor: "Black",
            color: "Black",
          }}
        />
        <ComboboxPopover
          style={
            {
              // textColor: "red",
              // textDecorationColor: "red",
              // backgroundColor: "red",
              // color: "red",
            }
          }
        >
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

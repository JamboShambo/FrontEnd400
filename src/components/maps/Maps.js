import React, { useEffect } from "react";
import axios from "axios";
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

function Maps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: envVars.gmapkey,
    libraries,
  });

  const [selected, setSelected] = React.useState(null);
  const [getEvents, setGetEvents] = React.useState([]);

  useEffect(() => {
    getTheEvents();
  }, []);

  const getTheEvents = () => {
    axios
      .get(envVars.GetAllEvents, {
        headers: {
          "x-api-key": envVars.CustomerApiKeyGateway, //the token is a variable which holds the token
        },
      })
      .then((response) => {
        console.log("Response " + response);
        setGetEvents(response.data.events);
        console.log(response.data.events);
      })
      .catch((error) => {
        console.log(error);
      });

    getEvents.forEach((el) => {
      el.lat = parseFloat(el.lat);
      el.lng = parseFloat(el.lng);
    });

    console.log("Events " + getEvents.toString());
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const onMapClick = React.useCallback((e) => {
    var rngID = getRandomInt(9999);
    rngID = rngID.toString();

    var data = JSON.stringify({
      eventID: rngID,
      eventType: "1",
      eventName: "Rubbish on path",
      eventTime: new Date(),
      eventDescription: "On mainstreet beside post office!",
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      user: "TestUser1",
    });

    console.log(e);

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

    setGetEvents((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        eventTime: new Date(),
      },
    ]);
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

  return (
    <div className="">
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
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

      <Locate panTo={panTo} />
    </div>
  );
}

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
  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

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

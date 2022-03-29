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
import mapStyles from "./MapsStyle";
import envVars from "../../config";

const libraries = ["places"];

const mapContainerStyle = {
  height: "95.5vh",
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
    <div>
      <Locate panTo={panTo} />

      <Search panTo={panTo} />

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

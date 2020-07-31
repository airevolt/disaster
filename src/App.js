import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import DatatablePage from "./table.js";
import "./App.css";
import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import Countdown from "react-countdown";
import Table from "react-bootstrap/Table";

const mapContainerStyle = { width: "100vw", height: "50vh" };
const center = { lat: 43.653225, lng: -79 };
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const onLoad = (marker) => {
  console.log("marker: ", marker);
};
const circleOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 120000,
  zIndex: 1,
};

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const mapRef = React.useRef();
  function getDate() {
    let end = new Date(2020, 11, 3);
    let rn = Date.now();
    return end - rn;
  }
  const [selected, setSelected] = React.useState(null);
  const mapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("http://localhost:8091/events");
      const jsonResponse = await response.json();
      setEvents(jsonResponse);
    }
    fetchEvents();
    console.log("fetching");
  }, []);

  return (
    <React.Fragment>
      <div style={{ position: "fixed" }}>
        <LoadScript
          googleMapsApiKey="AIzaSyBza-PvQwGIPnChp15q3RwQ66cvgsCZmA8"
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={3}
            center={center}
            options={options}
            onClick={(event) => {
              setMarkers((current) => [
                ...current,
                {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                  time: new Date(),
                },
              ]);
            }}
            onLoad={mapLoad}
          >
            {markers.map((marker) => (
              <Marker
                icon={{url:"/doomIcons/user.png",
                scaledSize: new window.google.maps.Size(30,30),
                }}
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))}
            {events.map((e) => (
              <Circle
                center={{
                  lat: e.coordinatesY,
                  lng: e.coordinatesX,
                }}
                options={circleOptions}
                onClick={() => {
                  setSelected(e);
                }}
              />
            ))}

            {selected ? (
              <InfoWindow
                position={{
                  lat: selected.coordinatesY,
                  lng: selected.coordinatesX,
                }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h2>{selected.title}</h2>
                  <img height="30px" width="30px" src={"/doomIcons/"+ selected.category+".png"} />
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </LoadScript>
        <body>
          <ul>
            <li>
              <h2 style={{ color: "white" }}>Disaster Tracker</h2>
            </li>
   
     
            <li>
              <Countdown date={Date.now() + getDate()} />
            </li>
          </ul>
        </body>
      </div>
      <div style={{ height: "575px", width: "100%", clear: "both" }}></div>

      {/* <Table responsive striped bordered hover variant="dark"> */}

      <table className="tableData">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Title</th>
            <th>Date</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr
              onClick={(event) => {
                setSelected(e);
              }}
            >
              <td>{e.id}</td>
              <td>{e.category}</td>
              <td>{e.title}</td>
              <td>{e.date}</td>
              <td>{e.coordinatesX}</td>
              <td>{e.coordinatesY}</td>
              <td>
                <a href={e.source} target="_blank">
                  {e.source}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </Table> */}

      {/* <DatatablePage info = {events} fx = {setSelected}/> */}
    </React.Fragment>
  );
}

export default App;

import React, { useState, useMemo, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import moment from "moment";
import "./minimap.css";
import { Context } from "../../../context/context";
const photos = require("../../../photos.json");

function MiniMap(props) {
  const context = useContext(Context);
  const { lat, long, flights } = props;
  const [suggestedCards, setSuggestedCards] = useState([]);
  //Map State
  const [selectedCity, setSelectedCity] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: context.lat,
    longitude: context.long,
    zoom: 3,
  });

  //Liked Trip//

  const suggested = flights.slice(0, 10);

  useEffect(() => {
    setSuggestedCards(
      suggested.map((flight) => {
        flight["photo"] = photos[Math.floor(Math.random() * photos.length)].url;
        return (
          <div key={flight.QuoteId} className="miniMap-flight-card">
            <span className="image-container">
              <img
                className="flight-card-image"
                src={flight.photo}
                alt="preview"
              />
            </span>
            <span className="mini-info-container">
              <div className="mini-info-div">
                <h1>
                  {flight.CityName}{" "}
                  <button
                    onClick={() => context.goToCarrier(flight.Name)}
                    className="book-button"
                  >
                    Book Flight
                  </button>
                </h1>
                <h4>
                  {moment(flight.OutboundLeg.DepartureDate).format(
                    "MMM Do YYYY"
                  )}
                </h4>
                <h4>{`${flight.Direct ? "Direct - " : ""}${flight.name}`}</h4>
                <h4>{flight.Name}</h4>
              </div>
              <div className="mini-price">
                <h1>
                  <h6>From</h6> ${flight.MinPrice}
                </h1>
              </div>
            </span>
          </div>
        );
      })
    );
  }, [flights]);

  const markers = useMemo(
    () =>
      flights.map((city) => (
        <div>
          {city.lon ? (
            <Marker
              key={city.CityName}
              longitude={parseFloat(city.lon)}
              latitude={parseFloat(city.lat)}
              className="marker"
            >
              <div className="marker-container">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCity(city);
                  }}
                  className="marker-btn"
                >
                  <p className="price">${city.MinPrice}</p>
                  <img
                    className="marker-icon"
                    src="https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png"
                  />
                </button>
              </div>
            </Marker>
          ) : null}
        </div>
      )),
    [flights]
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setViewport({
        latitude: lat,
        longitude: long,
        width: "100%",
        height: "100%",
        zoom: 3,
      });
    });
    return () => {
      window.removeEventListener("resize", setViewport);
    };
  }, []);

  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };
  // console.log(flights);
  return (
    <div className="mini-map-container">
      <div className="mini-map-side-bar">
        <div className="suggestion-title">
          {selectedCity ? (
            <div>
              <div className="sticky-marker">
                <div
                  key={selectedCity.QuoteId}
                  className="map-flight-card-selected"
                >
                  <span className="map-image-container">
                    <img
                      className="map-flight-card-image"
                      src="https://i.pinimg.com/originals/08/1f/0a/081f0a864808d6efc0883014e802bc25.jpg"
                    />
                  </span>
                  <span className="map-info-container">
                    <div className="selected-map-info-div">
                      <h1>{selectedCity.CityName}</h1>
                      <h4>
                        {moment(selectedCity.OutboundLeg.DepartureDate).format(
                          "MMM Do YYYY"
                        )}
                      </h4>
                      <h4>{`${selectedCity.Direct ? "Direct - " : ""}${
                        selectedCity.name
                      }`}</h4>
                    </div>
                    <h1>
                      <h6>From</h6> ${selectedCity.MinPrice}
                    </h1>
                  </span>
                </div>
              </div>
              <div className="mini-map-line"></div>
            </div>
          ) : null}
          <h1 className="suggested-header">Suggested Trips</h1>
          {<div>{suggestedCards}</div>}
        </div>
      </div>

      <div className="mini-map">
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/nickloverde/ckkew55if03e817o5o2je6rkp"
          //allows us to drag map around and zoom in/out
          onViewportChange={(viewport) => {
            setViewport({ ...viewport });
          }}
        >
          {markers}
          {/* {flights.map((flight, index) => (
            <Marker latitude={+flight.lat} longitude={+flight.lon}>
              <h1>{flight.CityName}</h1>
            </Marker>
          ))} */}

          <GeolocateControl
            style={geolocateControlStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            fitBoundsOptions={{ linear: true, maxZoom: 3 }}
            auto
          />
        </ReactMapGL>
      </div>
    </div>
  );
}
export default withRouter(MiniMap);

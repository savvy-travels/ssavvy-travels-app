import React, { useContext, useEffect, useState, useMemo } from "react";
import { withRouter } from "react-router-dom";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import { ClipLoader } from "react-spinners";
import "./map.css";
import SearchField from "./Search Field/SearchField";
import moment from "moment";
import axios from "axios";
import { Context } from "../../context/context";
import Header2 from "../Landing/Header/Header2";
import MapKey from "./MapKey/MapKey";
const photos = require("../../photos.json");

function Map(props) {
  const {
    quotes,
    places,
    carriers,
    allAirports,
    setAllAirports,
    budget,
    location,
    departureDate,
    returnDate,
    setQuotes,
    setPlaces,
    setCarriers,
    goToCarrier,
  } = useContext(Context);
  //Filters on the Search Results
  const [passengers, setPassengers] = useState(1);
  const [filterNonStop, setFilterNonStop] = useState(false);
  //Loading state for spinner
  const [loading, setLoading] = useState(true);

  //Map State
  const [viewport, setViewport] = useState({
    latitude: +localStorage.getItem("lat"),
    longitude: +localStorage.getItem("long"),
    width: "100%",
    height: "100%",
    zoom: 4,
  });
  const useSetViewport = () => {
    setViewport({
      latitude: +localStorage.getItem("lat"),
      longitude: +localStorage.getItem("long"),
      width: "100%",
      height: "100%",
      zoom: 3,
    });
  };
  //Map Window event listener
  useEffect(() => {
    window.addEventListener("resize", useSetViewport);
    return () => {
      window.removeEventListener("resize", useSetViewport);
    };
  }, []);
  //Flight cards state//
  const [selectedCity, setSelectedCity] = useState(null);

  //Geolocate Controls//
  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/skyscanner/${location}/anywhere/${
          departureDate ? departureDate : "anytime"
        }/${returnDate ? returnDate : "anytime"}`
      )
      .then((res) => {
        const { Quotes, Places, Carriers } = res.data;
        setQuotes(Quotes);
        setPlaces(Places);
        setCarriers(Carriers);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [budget, location, departureDate, returnDate]);

  const flights = quotes
    .map((quote) => {
      let destinationId = places.findIndex(
        (place) => place.PlaceId === quote.OutboundLeg.DestinationId
      );
      let carrierId = carriers.findIndex(
        (carrier) => carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]
      );
      return {
        ...quote,
        ...places[destinationId],
        ...carriers[carrierId],
      };
    })
    .map((flight) => {
      let airportId = allAirports.findIndex(
        (airport) => airport.code == flight.IataCode
      );
      return { ...flight, ...allAirports[airportId] };
    });

  const directFlights = flights.filter((flight) => flight.Direct);

  const flightCards = (filterNonStop ? directFlights : flights).map(
    (flight) => {
      const totalPrice = flight.MinPrice * passengers;
      flight["photo"] = photos[Math.floor(Math.random() * photos.length)].url;
      return (
        <div key={flight.QuoteId} className="map-flight-card">
          <span className="map-image-container">
            <img
              className="map-flight-card-image"
              src={flight.photo}
              alt="preview"
            />
          </span>
          <span className="map-info-container">
            <div className="map-info-div">
              <h1>
                {flight.CityName}{" "}
                <button
                  onClick={() => goToCarrier(flight.Name)}
                  className="book-button"
                >
                  Book Flight
                </button>
              </h1>
              <h4>
                {moment(flight.OutboundLeg.DepartureDate).format("MMM Do YYYY")}
              </h4>
              <h4>{`${flight.Direct ? "Direct - " : ""}${flight.name}`}</h4>
              <h4>{flight.Name}</h4>
            </div>
            <div className="mini-price">
              <h2>
                from
                <strong>${totalPrice}</strong>
              </h2>
            </div>
          </span>
        </div>
      );
    }
  );

  const markers = useMemo(
    () =>
      (filterNonStop ? directFlights : flights).map((city) => (
        <div>
          {city.lon ? (
            <Marker
              key={city.CityName}
              longitude={+city.lon}
              latitude={+city.lat}
              className={"marker"}
            >
              <div className="marker-container">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCity(city);
                  }}
                  className="marker-btn"
                >
                  <p
                    className={
                      city.MinPrice <= 100
                        ? "hun-price"
                        : city.MinPrice > 100 && city.MinPrice < 200
                        ? "two-price"
                        : city.MinPrice > 200 && city.MinPrice < 400
                        ? "four-price"
                        : city.MinPrice > 400 && city.MinPrice < 600
                        ? "six-price"
                        : city.MinPrice > 600 && city.MinPrice < 800
                        ? "eight-price"
                        : city.MinPrice > 800 && city.MinPrice < 1000
                        ? "thou-price"
                        : city.MinPrice > 1000
                        ? "high-price"
                        : "price"
                    }
                  >
                    ${city.MinPrice}
                  </p>
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

  return (
    <div className="map-view">
      <Header2 />
      <div className="lower-map-view">
        <div className="controllers-container">
          {/* <div className='filter-container'>

                    </div> */}
          <div className="results-search-container">
            <SearchField
              passengers={passengers}
              setPassengers={setPassengers}
              filterNonStop={filterNonStop}
              setFilterNonStop={setFilterNonStop}
            />
            <div className="map-line"></div>
            <div className="map-side-container">
              {selectedCity ? (
                <>
                  <div>
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
                      <span className="selected-map-info-container">
                        <div className="selected-map-info-div">
                          <h1>
                            {selectedCity.CityName}{" "}
                            <button
                              onClick={() => goToCarrier(selectedCity.Name)}
                              className="book-button"
                            >
                              Book Flight
                            </button>
                          </h1>
                          <h4>
                            {moment(
                              selectedCity.OutboundLeg.DepartureDate
                            ).format("MMM Do YYYY")}
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
                  <div className="map-line"></div>
                </>
              ) : null}
              {loading ? (
                <>
                  <h1 className="loading-text">Finding your results...</h1>
                  <ClipLoader style={{ marginTop: "3rem" }} />
                </>
              ) : (
                <div className="results">
                  {/* <div className='suggested-header'>Trips in Your Budget</div> */}
                  <div>{flightCards}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <MapKey />
        <div className="map-container">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/nickloverde/ckkew55if03e817o5o2je6rkp"
            //allows us to drag map around and zoom in/out
            onViewportChange={(viewport) => {
              setViewport(viewport);
            }}
          >
            {markers}
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
    </div>
  );
}

export default withRouter(Map);

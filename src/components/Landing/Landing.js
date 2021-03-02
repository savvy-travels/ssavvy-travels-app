import React, { useContext, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { airportSearch } from "../../Redux/searchReducer";
import { connect } from "react-redux";
import "./landing.css";
import { Context } from "../../context/context";
import NewSearch from "./NewSearch/NewSearch";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import MiniMap from "./MiniMap/MiniMap";
import Work from "./Works/Works";
import CarouselComp from "./Carousel/Carousel";
import { ClipLoader } from "react-spinners";
import Header from "./Header/Header";
require("dotenv").config();

function Landing(props) {
  const {
    quotes,
    places,
    loading,
    carriers,
    lat,
    long,
    allAirports,
  } = useContext(Context);

  // Find Flights based off of your airport location
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
        (airport) =>
          airport.code.toLowerCase() === flight.IataCode.toLowerCase()
      );
      return { ...flight, ...allAirports[airportId] };
    });

  return (
    <div className="landing">
      <Header />
      <video
        className="video"
        src="https://colab-image-assets.s3-us-west-1.amazonaws.com/DevMtn-Air-New.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
      >
        {" "}
      </video>

      {!loading ? (
        <Switch>
          <Route exact path="/" component={NewSearch} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      ) : (
        <div className="landing-welcome-message">
          <h1>Welcome to Savvy Travels</h1>
          <img
            src="https://colab-image-assets.s3-us-west-1.amazonaws.com/Savvy-Travels-logo.png"
            alt="logo"
          />
        </div>
      )}

      {/* <div className='triangle'></div> */}

      <div className="mini-map-div">
        {!loading ? (
          <MiniMap wait={8000} long={long} lat={lat} flights={flights} />
        ) : (
          <>
            <ClipLoader color={"#cae00d"} />
            <br></br>
            <h1>Loading Map...</h1>
          </>
        )}
      </div>
      <div className="landing-line"></div>
      <CarouselComp flights={flights} />
      <div className="landing-line"></div>
      <Work />
    </div>
  );
}

function mapStateToProps(reduxState) {
  return {
    username: reduxState.username,
    preferred: reduxState.preferred,
  };
}

export default withRouter(connect(mapStateToProps, { airportSearch })(Landing));

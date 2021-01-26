import axios from "axios";
import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../Redux/userReducer";
import Header from "./Header/Header";
import "./landing.css";
import NewSearch from "./NewSearch/NewSearch";
import heroVideo from "./DevMtn-Air.mp4";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
require("dotenv").config();

function Landing(props) {
  const ipstackKey = process.env.REACT_APP_IPSTACK_KEY;
  const geoDbKey = process.env.REACT_APP_GEODB_KEY;

  const [cities, setCities] = useState([]);
  const [lat,  setLat] = useState('')
  const [lon, setLon] = useState('')

  useEffect(
    () => {
      //gets the latitude and longitude of the user based on their IP address with an api call
      async function getLoc() {
        setLat(await axios.get(`http://api.ipstack.com/check?access_key=${ipstackKey}`)
          .then((res) => {
            return `${res.data.latitude.toFixed(4)}`;
            })
        
    , []);

    const getCities = (location) => {
        setCities(axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${location}/nearbyCities?minPopulation=500000&limit=5&offset=0&radius=100`,{
                    headers: {
                        "x-rapidapi-key":
                        "293c8f1306mshd1179b84f5495fdp1624a6jsn253fcf20a6a7",
                        },
                    }
                  ).then((res) => res.data)
                )                
            }

  //Get user info//
  useEffect(() => {
    axios
      .get("/api/auth/user")
      .then((res) => {
        props.loginUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);


  // const metro = cities.filter((place) => place.type === 'CITY').map((city) => city.city) //filters the results of the second useEffect to only include cities, maps those results to return the nearest city.

  //still need to find a way to get the nearest airports - there are some apis, but they are difficult to work with or cost $.  will keep researching.

  return (
    <div className="landing">
      <Header />
      <video
        className="video"
        src={heroVideo}
        type="video/mp4"
        autoPlay
        loop
        muted
      ></video>

      <Switch>
        <Route exact path="/" component={NewSearch} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>

      <div className="triangle"></div>
      <p>{}</p>
    </div>
  );
}

function mapStateToProps(reduxState) {
  return;
}

export default withRouter(connect(mapStateToProps, { loginUser })(Landing));

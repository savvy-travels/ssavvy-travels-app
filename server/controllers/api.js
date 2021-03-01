const fetch = require("node-fetch");

const {
  REACT_APP_GEODB_KEY,
  REACT_APP_SKYSCANNER_KEY,
  REACT_APP_GOOGLEMAPS_KEY,
} = process.env;

module.exports = {
  //Gets Lat and Long of User
  location: async (req, res) => {
    const location_url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_GOOGLEMAPS_KEY}`;
    const fetch_location = await fetch(location_url, {
      method: "POST",
      headers: {
        Content_Type: "application/json",
      },
    });
    const myLocationJson = await fetch_location.json();
    res.send(myLocationJson);
  },

  //Uses users Lat and Long to find nearest major Metros
  city: async (req, res) => {
    const latLong = req.params.latLong.split(",");
    const lat = +latLong[0];
    const long = +latLong[1];
    const city_url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${lat}${long}/nearbyCities?minPopulation=100000&limit=5&offset=0&radius=100&sort=-population`;
    const fetch_city = await fetch(city_url, {
      headers: {
        "x-rapidapi-key": REACT_APP_GEODB_KEY,
        Content_Type: "application/json",
      },
    });
    const myCityJson = await fetch_city.json();
    console.log(myCityJson)
    const cityFilter = await myCityJson.data
      .filter((place) => place.type === "CITY")
      .map((city) => city.city);
    res.send(cityFilter);
  },

  //Uses users major metro to find nearest Int Airports
  airport: async (req, res) => {
    const { city } = req.params;
    const airport_url = `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${city}&limit=5&withFlightInfoOnly=true`;
    const fetch_airport = await fetch(airport_url, {
      headers: {
        "x-rapidapi-key": "293c8f1306mshd1179b84f5495fdp1624a6jsn253fcf20a6a7",
        "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
      },
    });
    const myAirportJson = await fetch_airport.json();
    console.log(myAirportJson)
    res.send(myAirportJson);
  },

  //Uses the users airport to find all flights from that Airport
  skyScanner: async (req, res) => {
    const { airport, from, depart_date, return_date } = req.params;
    const sky_url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${airport}-iata/${from}/${depart_date}/`;
    const fetch_flights = await fetch(sky_url, {
      headers: {
        "x-rapidapi-key": REACT_APP_SKYSCANNER_KEY,
      },
    });
    const myFlightsJson = await fetch_flights.json();
    res.send(myFlightsJson);
  },
};

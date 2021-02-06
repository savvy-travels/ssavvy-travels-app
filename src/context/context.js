import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export function LatProvider(props) {
  const geoDbKey = process.env.REACT_APP_GEODB_KEY;
  const skyscannerKey = process.env.REACT_APP_SKYSCANNER_KEY;
  const googleKey = process.env.REACT_APP_GOOGLEMAPS_KEY;

  const [latLong, setLatLong] = useState({ lat: undefined, long: undefined });
  const [location, setLocation] = useState("");
  const [cities, setCities] = useState([]);
  const [airports, setAirports] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [places, setPlaces] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [airport, setAirport] = useState("");
  const [allAirports, setAllAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleKey}`
      )
      .then((res) => {
        setLatLong({ lat: res.data.location.lat, long: res.data.location.lng });
        localStorage.setItem("lat", res.data.location.lat);
        localStorage.setItem("long", res.data.location.lng);
        axios
          .get(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${res.data.location.lat.toFixed(
              4
            )}${res.data.location.lng.toFixed(
              4
            )}/nearbyCities?minPopulation=100000&limit=5&offset=0&radius=100&sort=-population`,
            {
              headers: {
                "x-rapidapi-key": `${geoDbKey}`,
              },
            }
          )
          .then((res) => {
            // console.log(res.data.data)
            setCities(
              res.data.data
                .filter((place) => place.type === "CITY")
                .map((city) => city.city)
            );
            const city = res.data.data
              .filter((place) => place.type === "CITY")
              .map((city) => city.city);
            axios
              .get(
                `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${city[0]}&limit=5&withFlightInfoOnly=true`,
                {
                  headers: {
                    "x-rapidapi-key":
                      "293c8f1306mshd1179b84f5495fdp1624a6jsn253fcf20a6a7",
                    "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
                  },
                }
              )
              .then((res) => {
                // console.log(res.data.items)
                setAirports(res.data.items);
                setAirport(res.data.items.map((airport) => airport));

                axios
                  .get(
                    `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${res.data.items[0].iata}-iata/anywhere/anytime/`,
                    {
                      headers: {
                        "x-rapidapi-key": `${skyscannerKey}`,
                      },
                    }
                  )
                  .then((res) => {
                    setQuotes(res.data.Quotes);
                    setPlaces(res.data.Places);
                    setCarriers(res.data.Carriers);
                    axios.get("/api/airports").then((res) => {
                      setLoading(false);
                      setAllAirports(res.data);
                    });
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => [console.log(err)]);
  }, []);

  const goToCarrier = (carrier) => {
    switch (carrier) {
      case "Gulf Air":
        window.open("https://www.gulfair.com/", "_blank");
        break;
      case "Oman Air":
        window.open("https://www.omanair.com/cn/en", "_blank");
        break;
      case "Qatar Airways":
        window.open(
          "https://www.qatarairways.com/en-us/homepage.html",
          "_blank"
        );
        break;
      case "Sun Country Airlines":
        window.open("https://suncountry.com/", "_blank");
        break;
      case "Qantas":
        window.open("https://www.qantas.com/us/en.html", "_blank");
        break;
      case "Volaris":
        window.open("https://www.volaris.com/", "_blank");
        break;
      case "French Bee":
        window.open("https://www.frenchbee.com/", "_blank");
        break;
      case "GOL Linhas Aéreas":
        window.open("https://www.voegol.com.br/en", "_blank");
        break;
      case "Spirit Airlines":
        window.open("https://www.spirit.com/", "_blank");
        break;
      case "Alaska Airlines":
        window.open("https://www.alaskaair.com/", "_blank");
        break;
      case "Lufthansa":
        window.open("https://www.lufthansa.com/us/en/homepage", "_blank");
        break;
      case "Avianca":
        window.open("https://www.avianca.com/us/en/", "_blank");
        break;
      case "Emirates":
        window.open("https://www.emirates.com/us/english/", "_blank");
        break;
      case "Aeromexico":
        window.open("https://aeromexico.com/en-us", "_blank");
        break;
      case "SAS":
        window.open("https://www.flysas.com/us-en/", "_blank");
        break;
      case "Iberia":
        window.open("https://www.iberia.com/us/", "_blank");
        break;
      case "Brussels Airlines":
        window.open("https://www.brusselsairlines.com/", "_blank");
        break;
      case "British Airways":
        window.open(
          "https://www.britishairways.com/travel/home/public/en_us",
          "_blank"
        );
        break;
      case "Frontier Airlines":
        window.open("https://www.flyfrontier.com/", "_blank");
        break;
      case "United":
        window.open("https://www.united.com/en/us", "_blank");
        break;
      case "jetBlue":
        window.open("https://www.jetblue.com/", "_blank");
        break;
      case "Turkish Airlines":
        window.open("https://www.turkishairlines.com/", "_blank");
        break;
      case "Air Canada":
        window.open("https://www.aircanada.com/us/en/aco/home.html", "_blank");
        break;
      case "Japan Airlines":
        window.open("https://www.jal.co.jp/ar/en/", "_blank");
        break;
      case "China Air":
        window.open("https://www.china-airlines.com/us/en", "_blank");
        break;
      case "Finnair":
        window.open("https://www.finnair.com/", "_blank");
        break;
      case "Korean Air":
        window.open("https://www.koreanair.com/us/en", "_blank");
        break;
      case "Air France":
        window.open("https://www.airfrance.com/indexCom_en.html", "_blank");
        break;
      case "Ethiopian Airlines":
        window.open("https://www.ethiopianairlines.com/us", "_blank");
        break;
      case "Copa":
        window.open("https://www.copaair.com/en/web/us", "_blank");
        break;
      case "Iceland Air":
        window.open("https://www.icelandair.com/", "_blank");
        break;
      case "Viva Aerobus":
        window.open("https://www.vivaaerobus.com/en");
      default:
        window.location.href = "/";
    }
  };

  //Modal Logic and state//
  const [modal, setModal] = useState(false);

  const selectModal = (info) => {
    setModal(!modal);
  };
  return (
    <Context.Provider
      value={{
        ...latLong,
        location,
        quotes,
        places,
        carriers,
        airports,
        allAirports,
        airport,
        cities,
        loading,
        goToCarrier,
        modal,
        selectModal,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

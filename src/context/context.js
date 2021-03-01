import axios from "axios";
import { createContext, useEffect, useState } from "react";
const { REACT_APP_GOOGLEMAPS_KEY } = process.env;

export const Context = createContext(null);

export function LatProvider(props) {
  const [latLong, setLatLong] = useState({ lat: undefined, long: undefined });
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
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_GOOGLEMAPS_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        const { lat } = res.data.location;
        const { lng } = res.data.location;
        setLatLong({ lat: lat, long: lng });
        localStorage.setItem("lat", lat);
        localStorage.setItem("long", lng);
        axios
          .get(`/api/city/${lat},${lng}`)
          .then((res) => {
            console.log(res.data);
            const city = res.data[0];
            setCities(res.data);
            axios
              .get(`/api/landing/airport/${city}`)
              .then((res) => {
                const { items } = res.data;
                console.log(res.data)
                const airport = items[0].iata;
                setAirport(airport);
                setAirports(items);
                axios
                  .get(`/api/skyscanner/${airport}/anywhere/anytime/anytime`)
                  .then((res) => {
                    console.log(res);
                    const { Quotes, Places, Carriers } = res.data;
                    setQuotes(Quotes);
                    setPlaces(Places);
                    setCarriers(Carriers);
                    axios.get("airports.json").then((res) => {
                      setLoading(false);
                      setAllAirports(res.data);
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
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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

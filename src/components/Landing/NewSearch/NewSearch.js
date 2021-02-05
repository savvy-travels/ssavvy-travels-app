import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { newSearch } from "../../../Redux/searchReducer";
import allAirports from "../../airports.json";
import AsyncSelect from "react-select/async";
import "./newSearch.css";
import { Context } from "../../../context/context";

//Functions used to filter through the airport results
//First we grab all the airports from the data.json file and map them to a new variable
const options = allAirports.map((airport) => {
  return {
    value: airport.code,
    label: `${airport.code}-${airport.name}-${airport.city}`,
  };
});

//We are then able to filter through these results only loading the specified airports saving rendering time.
const filterAirports = (inputValue) => {
  return options.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};
//This is the 'asynchronous' function that sets the loading.
const loadOptions = (inputValue, cb) => {
  setTimeout(() => {
    cb(filterAirports(inputValue));
  }, 1000);
};
//Styles
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Montserrat",
    fontWeight: 200,
  }),
  control: () => ({
    position: "relative",
    zIndex: 10000,
    height: "2rem",
    borderRadius: 3,
    border: "2px solid transparent",
    backgroundColor: "#fcfffd",
    display: "flex",
    width: "95=8%",
    color: "#fcfffd",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

function NewSearch(props) {
  const context = useContext(Context);

  const [input, setInput] = useState("");
  const [budget, setBudget] = useState("");
  const [departureDate, setDepartureDate] = useState(undefined);
  const [returnDate, setReturnDate] = useState(undefined);
  const [location, setLocation] = useState(context.airport.iata);
  const [next, setNext] = useState(false);
  const [myAirportsFiltered, setMyAirportsFiltered] = useState([]);

  //This function handles the input change that is used in the filter function above. //
  function handleInputChange(newValue) {
    const inputValue = newValue.replace(/\W/g, "");
    setInput(inputValue);
  }
  function search() {
    props.newSearch({ budget, location, departureDate, returnDate });
    props.history.push("/map");
  }

  const myAirports = context.airports.map((airport) => {
    let airportId = allAirports.findIndex((ap) => ap.code == airport.iata);
    return { ...airport, ...allAirports[airportId] };
  });

  useEffect(() => {
    myAirports.forEach((airport) => {
      allAirports.forEach((ap) => {
        if (ap.code === airport.code) {
          setMyAirportsFiltered((previousState) => [...previousState, airport]);
        }
      });
    });
  }, []);

  const myOptions = myAirportsFiltered.map((airport) => {
    return {
      value: airport.iata,
      label: `${airport.name} ${airport.iata}-${airport.city}`,
    };
  });

  const today = moment().format().replace(/T.*$/, "");

  return (
    <span className="search-field">
      <div className="slogan-container">
        <h1>
          You tell us the budget.<br></br>We'll tell you where.
        </h1>
      </div>
      <div className="input-field">
        <input
          onChange={(e) => setBudget(e.target.value)}
          onFocus={() => setNext(true)}
          className="budget-input"
          type="text"
          placeholder="Whats Your Budget?"
        />
        {next ? (
          <div className="where-when-inputs">
            <AsyncSelect
              onChange={(e) => (!e ? null : setLocation(e.value))}
              className="airport-select"
              loadOptions={loadOptions}
              isClearable={true}
              onInputChange={handleInputChange}
              placeholder={"From..."}
              styles={customStyles}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#cae00d",
                  primary: "#cae00d",
                  color: "#000",
                },
              })}
              defaultValue={location}
              defaultOptions={input ? input : myOptions}
            />

            <div className="vert-line-a"></div>
            <div className="depart-arrive-container">
              <input
                style={{ outline: "none" }}
                onChange={(e) => setDepartureDate(e.target.value)}
                min={today}
                max={returnDate}
                type="date"
                placeholder="When?"
              />
              <div className="between-arrow-left"></div>
              <div className="between-arrow-right"></div>
              <input
                style={{ outline: "none" }}
                onChange={(e) => setReturnDate(e.target.value)}
                min={departureDate}
                type="date"
                placeholder="When?"
              />
            </div>
          </div>
        ) : null}
      </div>
      <button onClick={() => search()} className="search-button">
        Let's Go!
      </button>
      <div class="downArrow bounce">
        <img
          width="100"
          height="100"
          alt=""
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNC4yODUsMTEuMjg0TDE2LDE5LjU3MWwtOC4yODUtOC4yODhjLTAuMzk1LTAuMzk1LTEuMDM0LTAuMzk1LTEuNDI5LDAgIGMtMC4zOTQsMC4zOTUtMC4zOTQsMS4wMzUsMCwxLjQzbDguOTk5LDkuMDAybDAsMGwwLDBjMC4zOTQsMC4zOTUsMS4wMzQsMC4zOTUsMS40MjgsMGw4Ljk5OS05LjAwMiAgYzAuMzk0LTAuMzk1LDAuMzk0LTEuMDM2LDAtMS40MzFDMjUuMzE5LDEwLjg4OSwyNC42NzksMTAuODg5LDI0LjI4NSwxMS4yODR6IiBmaWxsPSIjMTIxMzEzIiBpZD0iRXhwYW5kX01vcmUiLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz4="
        />
      </div>
    </span>
  );
}

export default withRouter(connect(null, { newSearch })(NewSearch));

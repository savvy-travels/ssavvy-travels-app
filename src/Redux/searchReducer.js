const initialState = {
  budget: 0,
  location: "",
  airports: [],
  departureDate: "",
  arrivalDate: "",
};

const NEW_SEARCH = "NEW_SEARCH";
const AIRPORT_SEARCH = "AIRPORT_SEARCH";

export function airportSearch(search) {
  return {
    type: AIRPORT_SEARCH,
    payload: search,
  };
}

export function newSearch(search) {
  console.log(search);
  return {
    type: NEW_SEARCH,
    payload: search,
  };
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case AIRPORT_SEARCH:
      return { ...state, airports: action.payload };
    case NEW_SEARCH:
      const { budget, location, departureDate, returnDate } = action.payload;
      return {
        ...state,
        budget: budget,
        location: location,
        departureDate: departureDate,
        returnDate: returnDate,
      };
    default:
      return state;
  }
}

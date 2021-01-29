const initialState = {
    budget: '',
    location: '',
    airports: [],
    departureDate: '',
    arrivalDate: '',
    long: '',
    lat: ''
}

const NEW_SEARCH = 'NEW_SEARCH'
const AIRPORT_SEARCH = "AIRPORT_SEARCH"
const UPDATE_LOCATION = 'UPDATE_LOCATION'

export function updateLocation(location) {
    return {
        type: UPDATE_LOCATION,
        payload: location
    }
}

export function airportSearch(search) {
    return {
        type: AIRPORT_SEARCH,
        payload: search
    }
}

export function newSearch(search) {
    return {
        type: NEW_SEARCH,
        payload: search
    }
}


export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOCATION:
            const { long, lat } = action.payload
            return { ...state, long: long, lat: lat }
        case AIRPORT_SEARCH:
            return { ...state, airports: action.payload }
        case NEW_SEARCH:
            const { budget, location, departureDate, arrivalDate } = action.payload
            return { ...state, budget: budget, location: location, departureDate: departureDate, arrivalDate: arrivalDate }
        default:
            return state
    }
}
const initialState = {
    budget: '',
    location: '',
    departureDate: '',
    arrivalDate: '',
    long: '',
    lat: ''
}

const NEW_SEARCH = 'NEW_SEARCH'
const UPDATE_LOCATION = 'UPDATE_LOCATION'

export function updateLocation(location) {
    return {
        type: UPDATE_LOCATION,
        payload: location
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
        case NEW_SEARCH:
            const { budget, location, departureDate, arrivalDate } = action.payload
            return { ...state, budget: budget, location: location, departureDate: departureDate, arrivalDate: arrivalDate }
        default:
            return state
    }
}
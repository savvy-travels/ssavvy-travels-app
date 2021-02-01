const initialState = {
    long: '',
    lat: ''
}

const UPDATE_LOCATION = 'UPDATE_LOCATION'

export function updateLocation(location) {
    // console.log(location)
    return {
        type: UPDATE_LOCATION,
        payload: location
    }
}

export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOCATION:
            const { long, lat } = action.payload
            return { ...state, long: long, lat: lat }
        default:
            return initialState
    }
}
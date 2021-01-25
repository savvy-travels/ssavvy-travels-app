const initialState = {
    username: '',
    location:null,
    id:0,
    isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT = 'LOGOUT'

export function loginUser(username){
    return {
        type: LOGIN_USER,
        payload: username,
    }
}

export function logout(){
    return {
        type: LOGOUT
    }
}

export default function reducer(state = intialState, action){
    switch (action.type) {
        case LOGIN_USER:
            const {username, location, id} = action.payload
            return {...state, username: username, location: location, id: id, isLoggedIn: true}
        case LOGOUT:
            return initialState
        default:
            return state
    }
}
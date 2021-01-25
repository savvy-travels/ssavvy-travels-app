const intialState = {
    username: '',
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
            return {...state, username: action.payload, isLoggedIn: true}
        case LOGOUT:
            return initialState
        default:
            return state
    }
}
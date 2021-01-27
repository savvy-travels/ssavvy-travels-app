const initialState = {
    email: '',
    username: '',
    preferred: null,
    isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT = 'LOGOUT'

export function loginUser(username) {
    console.log(username)
    return {
        type: LOGIN_USER,
        payload: username,
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            const { email, username, preferred } = action.payload
            return { ...state, email: email, username: username, preferred: preferred, isLoggedIn: true }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}
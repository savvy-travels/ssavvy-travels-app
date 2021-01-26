const initialState = {
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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            const { username, preferred } = action.payload
            return { ...state, username: username, preferred: preferred, isLoggedIn: true }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}
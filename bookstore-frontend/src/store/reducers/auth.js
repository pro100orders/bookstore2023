const INITIAL_STATE = {
    token: '',
    user: {
        id: null,
        email: '',
        roles: [],
        enabled: true,
        exp: null
    }
}

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_AUTH":
            return {...state, token: action.payload.token, user: action.payload.user};
        default:
            return state;
    }
}
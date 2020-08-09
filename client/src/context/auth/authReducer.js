import { ActionTypes } from "../../actions/types";

export const authReducer = (state, action) => {
    switch (action.types) {
        case ActionTypes.USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        };
        case ActionTypes.REGISTER_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS: {
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        };
        case ActionTypes.REGISTER_FAIL:
        case ActionTypes.AUTH_ERROR:
        case ActionTypes.LOGIN_FAIL:
        case ActionTypes.LOGOUT: {
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        };
        case ActionTypes.CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        };
        default:
            return state;
    }
};



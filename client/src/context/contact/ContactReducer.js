import { ActionTypes } from "../../actions/types";

export const ContactReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTACTS:
            return {
                ...state,
                contact: action.payload,
                loading: false
            };
        case ActionTypes.ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
        case ActionTypes.UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) => {
                    if (contact._id === action.payload._id) {
                        action.payload
                    } else {
                        contact
                    }
                }),
                loading: false
            };
        case ActionTypes.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact) => 
                    contact._id !== action.payload),
                loadig: false
            };
        case ActionTypes.CLEAR_CONTACTS:
            return {
                ...state,
                contact: null,
                filtered: null,
                error: null,
                current: null
            };
        case ActionTypes.SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case ActionTypes.CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case ActionTypes.FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
        case ActionTypes.CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case ActionTypes.CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};



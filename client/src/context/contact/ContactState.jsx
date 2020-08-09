import React from "react";
import axios from "axios";
import { ActionTypes } from "../actions/types";
import { ContactReducer } from "./ContactReducer";

export const ContactContext = React.createContext();
export const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = React.useReducer(ContactReducer, initialState);
    const getContacts = async () => {
        try {
            const res = await axios.get("http://localhost:9000/api/contacts");
            dispatch({
                type: ActionTypes.GET_CONTACTS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ActionTypes.CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    };

    const addContact = async (contact) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const res = await axios.post("http://localhost:9000/api/contacts", contact, config);
            dispatch({
                type: ActionTypes.ADD_CONTACT,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ActionTypes.CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    };

    const updateContact = async (contact) => {
        const config = {
            headers: { "Content-Type": "application/json" }
        }
        try {
            const res = await axios.put(
                `http://localhost:9000/api/contacts/${contact._id}`,
                    contact,
                    config
            );
            dispatch({
                type: ActionTypes.UPDATE_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type: ActionTypes.DELETE_CONTACT,
                payload: id
            })
        } catch (error) {
            dispatch({
                type: ActionTypes.CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    };

    const clearContacts = () => {
        dispatch({ type: ActionTypes.CLEAR_CONTACTS });
    };

    const setCurrent = (contact) => {
        dispatch({
            type: ActionTypes.SET_CURREN, 
            payload: contact
        })
    };

    const clearCurrent = () => {
        dispatch({ type: ActionTypes.CLEAR_CURRENT });
    };

    const filterContacts = (text) => {
        dispatch({
            type: ActionTypes.FILTER_CONTACTS,
            payload: text
        })
    };

    const clearFilter = () => {
        dispatch({ type: ActionTypes.CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    );
};



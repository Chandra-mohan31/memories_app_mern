import * as api from "../api";

//Actions Creators

import {AUTH} from "../constants/actionTypes"


export const signup = (formData,history) =>  async (dispatch) => {
    try {
        //
        history.push('/');
    } catch (error) {
        console.log(error)
    }
}

export const signin = (formData,history) =>  async (dispatch) => {
    try {
        history.push('/');
        
    } catch (error) {
        console.log(error)
        
    }
}
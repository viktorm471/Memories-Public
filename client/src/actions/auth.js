import * as api from '../api';
import { AUTH,AUTH_LOCAL} from "../constants/constants";
// action creators

export const signup = (formData,history) => async (dispatch) => {
    try {
        const {data} = await api.signup(formData);
        dispatch({type:AUTH_LOCAL, payload:data});
        history.push("/");
    } catch (error) {
        console.log(error)
    }
    
    
}
export const signin = (formData,history) => async (dispatch) => {
    try {
        const {data} = await api.signin(formData);
        dispatch({type:AUTH_LOCAL, payload:data});
        history.push("/");
    } catch (error) {
        console.log(error)
    }
    
    
}
export const signGoogle = (credentials) => async (dispatch) => {
    try {
        
        dispatch({type:AUTH, payload:credentials});
        
    } catch (error) {
        console.log(error)
    }
    
    
}
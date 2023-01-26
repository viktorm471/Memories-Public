import { AUTH, LOGOUT, AUTH_LOCAL } from "../constants/constants";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";

export const auth = (state ="", action) => {
    switch (action.type) {
        case AUTH:
            
            const decode = jwt_decode(action?.payload);
            
            const token = jwt.sign({email: decode.email, _id: decode.sub, name: decode.given_name + " " + decode.family_name}, process.env.REACT_APP_JWT_SECRET , {expiresIn:'1h'} );
            
            const userGoogle = {
                result:{name: decode.given_name + " " + decode.family_name, 
                picture: decode.picture, 
                _id: decode.sub},token }
            localStorage.setItem('profile',JSON.stringify(userGoogle) );
            
            return decode;

        case AUTH_LOCAL:
            
            const userLocal = action?.payload
            localStorage.setItem('profile',JSON.stringify(userLocal) );
            
            
            return userLocal;
        case LOGOUT:
            localStorage.clear();
            return ""

        default:
            return state;
    }
}
export default auth;
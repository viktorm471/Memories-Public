 import { combineReducers } from "redux";
import { update,posts } from "./posts";
import{ auth} from "./auth";
 export default combineReducers({
    posts,update,auth
 });
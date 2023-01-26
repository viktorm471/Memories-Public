import {CREATE, UPDATE, FETCH_ALL, DELETE, UPDATEID, START_LOADING, END_LOADING, FETCH_POST, FETCH_SEARCH} from "../constants/constants"
export const posts = (state= {isLoading:true, post: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        case DELETE:

            return {...state,posts:state.posts.filter(post => post._id !== action.payload._id )};
        case UPDATE:

            return {...state,posts:state.posts.map(post => post._id === action.payload._id ? action.payload : post)};
        
        case FETCH_ALL:

            return {
                ...state,
                posts : action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case FETCH_POST:
            
            return {...state, post: action.payload};
        case FETCH_SEARCH:
            return {...state, posts: action.payload};
        case CREATE:
           
                return {...state, posts:[...state.posts, action?.payload]};
           

        default:
            return state;
    }
}

export const update = (update = "", action) => {
    switch (action.type) {
        case UPDATEID:
            
            return action.payload;
       

        default:
            return update;
    }
}
import activity from "../components/Containers/activity";
import { GET_COUNTRIES, GET_DETAILS, GET_NAME, GET_COUNTRY, GET_ACTIVITIES} from "./actions";

let initialState = {
    countries: [],
    country: [],
    detail: {},
    names: [],
    activities: []
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case GET_COUNTRIES: 
            return {
               ...initialState,
               countries: action.payload
            };
        case GET_ACTIVITIES:
            return {
                ...initialState,
                activities: action.payload
            };
        case GET_COUNTRY: 
        return {
            ...initialState,
            country: action.payload
        }
        case GET_DETAILS:
            return {
                ...initialState,
                detail: action.payload
            };
        case GET_NAME:
            return {
                ...initialState,
                names: action.payload
            };
        default:
            return {...state}
    }
}
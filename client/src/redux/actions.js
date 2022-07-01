import axios from 'axios'
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_NAME = "GET_NAME";
export const GET_ACTIVITIES = 'GET_ACTIVITIES'



export function getCountries(){
    return function(dispatch) {
        return axios.get("http://localhost:3001/countries")
        .then((r) => 
        dispatch({type: GET_COUNTRIES, payload: r.data})
        )
        .then(r => console.log(r))
    }
}

export function getCountryByName(nombre){
    return function(dispatch) {
        return axios.get(`http://localhost:3001/countries?name=${nombre}`)
        .then((r) => 
        dispatch({type:GET_COUNTRY, payload: r.data})
        )
        .then(r => console.log(r))
    }
}

export function getDetails(id){
        return function (dispatch) {
          return axios.get(`http://localhost:3001/countries/${id}`)
            .then((res) => {dispatch({ type: GET_DETAILS , payload: res.data })
           
        }
        )};
      
}

export function getName(){
    return function (dispatch) {
        return axios.get(`http://localhost:3001/activities`)
          .then((res) => {dispatch({ type: GET_NAME, payload: res.data })
         
      }
      )};
}

export function getActivities(){
    return function (dispatch){
        return axios.get('http://localhost:3001/activitiesTotal')
        .then((r) => 
        dispatch({type: GET_ACTIVITIES, payload: r.data})
        )
        .then(r => console.log(r))
    }
}

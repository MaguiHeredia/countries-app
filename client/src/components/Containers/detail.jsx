import React, { useEffect } from "react";
import { connect } from "react-redux";
import {getDetails} from '../../redux/actions'
import Det from '../Dumbs/det'
import './detail.css'
import Nav from "./nav";

function CountryDetails ({detail, getDetails, id}){
    
  useEffect(() => {
    getDetails(id)
  },[])
  console.log(detail)
  console.log('soy actividad', detail.activities);
  console.log('soy name', detail.name)
  return (
    <div>
      <Nav />
  <div className='detail'>
    <div className='leftDetail'>
    <h1>{detail.name}</h1>
    <img src={detail.Bandera} className='imgDetail'/>
    </div>
    <div className='centerDetail'>
    <h3 className='info' key='capital'>Capital: {!detail.Capital ? 'unknown' : detail.Capital}</h3>
    <h3 className='info' key='continente'>Continent: {!detail.Continente ? 'unknown' : detail.Continente}</h3>
    <h3 className='info' key='subregion'>Subregion: {!detail.Subregion ? 'unknown' : detail.Subregion}</h3>
    <h3 className='info' key='area'>Area: {!detail.Area ? 'unknown' : detail.Area} km<sup>2</sup></h3>
    <h3 className='info' key='poblacion'>Population: {!detail.Poblacion ? 'unknown' : detail.Poblacion}</h3>
    </div>
    <div className='rightDetail'>
    <h2 key='actividad'>Activities</h2>
    <div>
    {detail.activities?.length === 0 ? 
      <h3>Has no activities</h3> : 
      detail.activities?.map(e => {
      return <Det key={e.ID} name={e.name} Dificultad={e.Dificultad} Duracion={e.Duracion} Temporada={e.Temporada} className='rightDetail'/>
    })}
    </div>
    </div>
  </div>
  </div>
  );
};

function mapStateToProps(state) {
  return {
    detail: state.detail,
  };
}

export default connect(mapStateToProps, {getDetails})(CountryDetails);
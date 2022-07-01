import React from 'react';


export default function Det({name, Dificultad, Duracion, Temporada}){
    return (
        <div className='details'>           
            <h3 key='name' >Name: {name}</h3> 
            <h3 key='difficulty' >Difficulty: {Dificultad}</h3>
            <h3 key='duration'>Duration: {Duracion}</h3>
            <h3 key='season'>Season: {Temporada}</h3>      
        </div>
    )
}
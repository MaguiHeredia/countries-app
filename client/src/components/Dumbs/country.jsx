import React from 'react';
import {Link} from 'react-router-dom';
import './country.css'

export default function Country({name, ID, Bandera, Continente, Capital, Subregion, Area, Poblacion}){
    return (
        // <div className='country'>
        //     {/* <div className='countryCard'>
        //     <Link to={`country/${ID}`} className='name'>
        //     <img src={Bandera} alt='flag' className='bandera'/>
        //       <div className='info'>
        //           <h5 className="name">{name}</h5>
        //       <p className='cont'>{Continente}</p>
        //     </div>
        //     </Link>
        //     </div> */}
        //     {/* <div className='fondo'>

        //     </div> */}

        // </div>
        <Link to={`country/${ID}`} className='card'>
            <div className='imagenContainer'>
                <img src={Bandera} alt='flag'/>
            </div>
            <div className='info'>
                <h5 className="name">{name}</h5>
                <p className='cont'>{Continente}</p>
            </div>
        </Link>
    )
}
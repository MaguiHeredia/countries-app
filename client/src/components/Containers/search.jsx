import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getActivities, getCountries, getCountryByName} from '../../redux/actions'
import {connect} from 'react-redux'
import './search.css'
import Country from '../Dumbs/country'

let id = 10

// function SortArray(x, y){
//     return x.name.localeCompare(y.name, 'fr', {ignorePunctuation: true});
// }

// function SortArrayDec(x, y){
//     return y.name.localeCompare(x.name, 'fr', {ignorePunctuation: true});
// }

// function buscar (continente, countries){
//     let find= countries?.filter((e) => {
//         return e.Continente == continente
//     })
//     return find
// }

// function buscarActividad (name, activities){
//     let find = activities?.filter((e) => {
//         return e.name == name
//     })
//     return find
// }

// function ordenarPorPoblacion(forma, arreglo){
//     if(forma === 'Asc'){
//         console.log(arreglo.sort(function(a, b){return a.Poblacion - b.Poblacion}))
//         return arreglo.sort(function(a, b){return a.Poblacion - b.Poblacion})
//     }else if(forma === 'Dec'){
//         console.log(arreglo.sort(function(a, b){return a.Poblacion - b.Poblacion}))
//         return arreglo.sort(function(a, b){return b.Poblacion - a.Poblacion})
//     }
    
// }

function Search({getCountryByName, country, countries, paisesHome, setPaisesHome}){
    const [pais, setPais] = useState('')
    const [name, setName] = useState({find: []})
    const [activity, setActivity] = useState({find: []})
    const [resultActivity, setResultActivity]= useState([])

    function SortArray(x, y){
        return x.name.localeCompare(y.name, 'fr', {ignorePunctuation: true});
    }
    
    function SortArrayDec(x, y){
        return y.name.localeCompare(x.name, 'fr', {ignorePunctuation: true});
    }
    
    function buscar (continente, countries){
        let find= countries?.filter((e) => {
            return e.Continente == continente
        })
        return find
    }
    
    function buscarActividad (name, activities){
        let find = activities?.filter((e) => {
            return e.name == name
        })
        return find
    }
    function ordenarPorPoblacion(forma, arreglo){
            if(forma === 'Asc'){
                console.log(arreglo.sort(function(a, b){return a.Poblacion - b.Poblacion}))
                return arreglo.sort(function(a, b){return a.Poblacion - b.Poblacion})
            }else if(forma === 'Dec'){
                console.log(arreglo.sort(function(a, b){return a.Poblacion - b.Poblacion}))
                return arreglo.sort(function(a, b){return b.Poblacion - a.Poblacion})
            }
            
        }
    
   
    useEffect(async () => {
        let resultado = await axios.get('http://localhost:3001/activitiesTotal')
        if(resultado.status == 200){
            setActivity({find: resultado.data})
            let nombres=[]
            for(let i = 0; i < resultado.data.length; i++){
                nombres.push(resultado.data[i].name)
            }
            const filtrados = [...new Set(nombres)]
            console.log('filt', filtrados)
            setName({find: filtrados})
        }
    },[resultActivity])


     function handleChangeActivity(ev) {
        ev.preventDefault()
        let encontrados = buscarActividad(ev.target.value, activity.find)
        setResultActivity(encontrados)
        setActivity({find: []})
        setPaisesHome([])
    }

    function handleChange(ev) {
        ev.preventDefault()
        if(ev.target.name == 'Continentes'){
        console.log(countries)
        let encontrados = buscar(ev.target.value, countries)
        setPaisesHome(encontrados)
        setActivity({find: []})
        setResultActivity([])
        } else if (ev.target.name == 'Acomodados'){
            if(ev.target.value === 'Asc'){
                let orden = countries.sort(SortArray)
                setActivity({find: []})
                setResultActivity([])
                setPaisesHome([...orden])
            } else if(ev.target.value === 'Dec') {
                let ordenDec = countries.sort(SortArrayDec)
                setActivity({find: []})
                setResultActivity([])
                setPaisesHome([...ordenDec])
            }
        }else if(ev.target.name == 'AcomodadosPoblacion'){
            console.log('paisesss',paisesHome)
            let encontrados = ordenarPorPoblacion(ev.target.value, countries)
            console.log('soy orden por poblacion',encontrados)
            setPaisesHome([...encontrados])
            setActivity({find: []})
            setResultActivity([])
        }
    }

    function handleChangeInput(ev){
        ev.preventDefault()
        setPais(ev.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(pais){
        getCountryByName(pais)
        setActivity({find: []})
        setResultActivity([])
        setPaisesHome([])
        } 
    }
    return(
        <div className='todo'>
        <div className='buscadores'>
            <div className='izquierda'>
            <select key='5' name='Acomodados' onChange={ handleChange} className='input'>
                <option key='value123' value='Asc'>Alphabetically Asc</option>
                <option key='value234' value='Dec'>Alphabetically Dec</option>
            </select>

            <select key='8' name='AcomodadosPoblacion' onChange={ handleChange} className='input'>
                <option key='value129' value='Asc'> Population Asc</option>
                <option key='value2345' value='Dec'>Population Dec</option>
            </select>

            <select key='6' name='Activities' onChange={ handleChangeActivity} className='input'>
                <option key='33'>Activities</option>
                {name?.find.length > 0 ? 
                name?.find.map(e => {
                    id++
                    return <option key={id}>{e}</option>
                }): <option key='value1234'>There are no activities</option>
                }
            </select>

            <select key='4' name='Continentes' onChange={ handleChange} className='input'>
                <option key='value11' value='Asia'>Asia</option>
                <option key='value21' value='Africa'>Africa</option>
                <option key='value31' value='Europe'>Europe</option>
                <option key='value41' value='Oceania'>Oceania</option>
                <option key='value51' value='Antarctica'>Antarctica</option>
                <option key='value61' value='North America'>North America</option>
                <option key='value71' value='South America'>South America</option>
            </select>
            </div>
            <div className='ul'>
            <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                           type="text"
                           id="country"
                           autoComplete="off"
                           value= {pais}
                           placeholder='Enter a country'
                           className='input'
                           onChange={(e) => handleChangeInput(e)}
                       />
                    <button type="submit" className='boton'>SEARCH</button>
                    </form>
            </div>
         </div>
            <ul className='paises'>
                {country.length > 0 ? country?.map(e => {
                    return (
                    <Country key={e.cca3} name={e.name.official} ID={e.cca3} Bandera={e.flags[0]} Continente={e.continents[0]}/>
                    )
                }) : resultActivity?.length > 0 ? resultActivity?.map(e => {
                    return (
                        <div key={e.ID} className='actividades'>
                            <h2>Name: {e.name}</h2>
                            <h3>Difficulty: {e.Dificultad}</h3>
                            <h3>Duration: {e.Duracion}</h3>
                            <h3>Season: {e.Temporada}</h3>
                        </div>
                    )
                }) 
                :  null}
            </ul>
        </div>
    )
}


function mapStateToProps(state) {
    return {
      country: state.country,
      countries: state.countries,
      activities: state.activities
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getCountryByName: nombre => dispatch(getCountryByName(nombre)),
        getCountries: () => dispatch(getCountries),
        getActivities: () => dispatch(getActivities),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search);

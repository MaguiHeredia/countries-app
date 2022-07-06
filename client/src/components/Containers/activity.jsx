import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { getName, getCountries } from '../../redux/actions'
import axios from "axios";
import './activity.css'
import Nav from './nav'

function SoloLetras(input) {

    var ExpRegLetrasEspacio = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";

    if (input.length >= 35) {
        return ("Only 35 letters are allowed for the name");
    }
    else if (input.match(ExpRegLetrasEspacio) != null) {
        return true;
    }
    else if (input.match(ExpRegLetrasEspacio) == null) {
        return ("Only letters are allowed")
    }
    else {
        return true;
    }
}

export function validate(activities) {
    let errors = {};
    let nameValidation = SoloLetras(activities.name)
    if (!activities.name) {
        errors.name = "Name is required";
    } else if (nameValidation !== true) {
        errors.name = nameValidation
    } else if (!activities.Dificultad) {
        errors.Dificultad = 'Difficulty is required';
    } else if (activities.Dificultad < 0 || activities.Dificultad > 6) {
        errors.Dificultad = 'Difficulty must be a number between 0 and 5'
    } else if (!activities.Duracion) {
        errors.Duracion = "Duration is required";
    } else if (!activities.Temporada) {
        errors.Temporada = "Season is required";
    } else if (activities.Paises.length === 0) {
        errors.Paises = "Paises is required";
    }
    return errors;
}

function Activity({ names, getName, getCountries }) {
    const [errors, setErrors] = useState({ name: 'Name is required' })
    const [activities, setActivity] = useState({
        name: '',
        Dificultad: '',
        Duracion: '',
        Temporada: '',
        Paises: []
    });
    useEffect(() => {
        getName()
    }, [activities])
    console.log(names)


    function handleChange(e) {
        // console.log(e.target.value)
        setActivity({
            ...activities,
            [e.target.name]: e.target.value
        })
        let errors = validate({ ...activities, [e.target.name]: e.target.value });
        setErrors(errors);
        console.log(errors)
    }

    function handleChangeCountry(ev) {
        if (ev.target.value) {
            if (!activities.Paises?.includes(ev.target.value)) {
                setActivity({
                    ...activities,
                    Paises: [...activities.Paises, ev.target.value]
                })
                let errors = validate({ ...activities, [ev.target.name]: ev.target.value });
                setErrors(errors);
                console.log(errors)
            }
        }
    };

    function removeCountry(e) {
        setActivity({
            ...activities,
            Paises: activities.Paises?.filter(elem => {
                return elem !== e
            })
        })
    }

    console.log('soy el set:', activities)

    function handleSubmit(ev) {
        console.log('soy el handleSubmit')
        ev.preventDefault();
        if (activities.name && activities.Dificultad && activities.Duracion && activities.Temporada && activities.Paises.length > 0) {
            axios.post("http://localhost:3001/activities", {
                name: activities.name,
                Dificultad: parseInt(activities.Dificultad),
                Duracion: activities.Duracion.toString(),
                Temporada: activities.Temporada,
                paises: activities.Paises
            }).then((res) => {
                if (res.status === 200) {
                    setActivity({
                        name: '',
                        Dificultad: '',
                        Duracion: '',
                        Temporada: '',
                        Paises: []
                    });
                    console.log('creado con exito')
                    alert('Activity created successfully')
                }
            })
                .catch(() => {
                    setActivity({
                        name: '',
                        Dificultad: '',
                        Duracion: '',
                        Temporada: '',
                        temperaments: []
                    });
                    setErrors({name:'Name is required'})
                    console.log('no se creo')
                    alert('The activity is not created')
                })
        }
    }
    return (
        <div>
            <Nav />
            <div className='activity'>
                <div className='inputs'>
                    <h2>Created Activity</h2>
                    <form onSubmit={handleSubmit} className='formulario'>
                        <p>Name:</p>
                        <input
                            className='in'
                            key='1'
                            name='name'
                            type='text'
                            placeholder="Name"
                            value={activities.name}
                            onChange={handleChange}
                        />
                        {!errors.name ? null : <span>{errors.name}</span>}
                        <p>Difficulty:</p>
                        <input
                            className='in'
                            key='2'
                            name='Dificultad'
                            type='number'
                            min='0'
                            max='5'
                            value={activities.Dificultad}
                            placeholder="Difficulty"
                            onChange={handleChange}
                        />
                        {!errors.Dificultad ? null : <span>{errors.Dificultad}</span>}
                        <p>Duration:</p>
                        <input
                            className='inDuracion'
                            key='3'
                            name='Duracion'
                            type='time'
                            value={activities.Duracion}
                            placeholder='Duration'
                            onChange={handleChange}
                        />
                        {!errors.Duracion ? null : <span>{errors.Duracion}</span>}
                        <p>Season:</p>
                        <select className='inSelect' key='4' name='Temporada' onChange={handleChange} value={activities.Temporada}>
                            <option key='value1' value='Spring'>Spring</option>
                            <option key='value2' value='Summer'>Summer</option>
                            <option key='value3' value='Autumn'>Autumn</option>
                            <option key='value4' value='Winter'>Winter</option>
                        </select>
                        {!errors.Temporada ? null : <span>{errors.Temporada}</span>}
                        <p>Countries:</p>
                        <select className='inSelect' key='5' name='Paises' onChange={handleChangeCountry} value={activities.Paises}>
                            {names?.map(e => {
                                return <option key={e.ID} value={e.name}>{e.name}</option>
                            })}
                        </select>
                        {!errors.Paises ? null : <span>{errors.Paises}</span>}

                        <button className='enviar' type="submit" disabled={
                            errors.name ||
                                errors.Dificultad ||
                                errors.Duracion ||
                                errors.Temporada ||
                                errors.Paises
                                ? true : false}>Submit</button>
                    </form>
                </div>
                <div className='rigth'>
                    <img src='https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' className='imagen' />
                    <div>
                        {activities.Paises?.map(e => {
                            return (
                                <div key={e} className='paisElegido'>
                                    <h3 key={e} className='nombre'>{e}</h3>
                                    <button onClick={() => removeCountry(e)} className='botoncito'>x</button>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )

}
function mapStateToProps(state) {
    return {
        names: state.names
    };
}

export default connect(mapStateToProps, { getName, getCountries })(Activity);


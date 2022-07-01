import React from "react";
import {Link} from 'react-router-dom'
import Search from './search'
import './nav.css'

export default function Nav(){
    return(
        <nav className="contenedor">
            <div className='left'>
                <img width='50' src="https://img.icons8.com/color/48/000000/earth-planet.png"/>
            </div>
            <div className="center">
                {/* <Link to='/home' className='link'> */}
                   <a href="/home" className='link'>Home</a>
                    {/* </Link> */}
                <Link to='/createdActivity' className='link'>New Activity</Link>
            </div>
            {/* <div className="right"> <Search/></div> */}
            {/* <img src="https://img.icons8.com/color/48/000000/earth-planet.png"/>
            <ul className="nav">
                <li className='ul'><Link to='/home' className='link'>Home</Link></li>
                <li className='ul'><Link to='/createdActivity' className='link'>Created Activity</Link></li>
            </ul>
            <Search/> */}
            <div className='right'>
                <a className='rightEfect' href="https://www.linkedin.com/in/marianela-heredia-" key='linkedin' target='_BLANCK'><img src="https://img.icons8.com/color/48/000000/linkedin.png"/></a>
                <a className='rightEfect' href="https://www.instagram.com/magui_heredia17/" key='instagram' target='_BLANCK'><img src="https://img.icons8.com/fluency/48/000000/instagram-new.png"/></a>
                <a className='rightEfect' href="https://github.com/MaguiHeredia" key='github' target='_BLANCK'><img src="https://img.icons8.com/fluency/48/000000/github.png"/></a>

            </div>
        </nav>
    )
}
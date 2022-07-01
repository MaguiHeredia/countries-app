import React from 'react';
import {Link} from 'react-router-dom';
import './loading.css'

export default function Loading() {
    return (
      <div className='loading'>
          <h2 className='h2'>Exploring the Countries</h2>
          <Link to='/home' className="access-btn">
                    Explore 
                    <img width='40' src="https://img.icons8.com/wired/64/000000/rocket.png" className='img'/>
           </Link>
      </div>
    );
  }
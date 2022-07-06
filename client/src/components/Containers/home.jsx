import React, { useEffect, useState } from 'react'
import { getCountries, } from '../../redux/actions';
import Country from '../Dumbs/country'
import { connect } from 'react-redux';
import './home.css'
import Search from './search';
import Pagination from '../Dumbs/pagination';


function Home({ countries, getCountries }) {
    const [paisesHome, setPaisesHome] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        getCountries()
    }, [])

    const indexOfLastPost = currentPage * postsPerPage;
    // 1 * 10 = 10
    // 2 * 10 = 20
    // 3 * 10 = 30

    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // 10 - 10 = 0
    // 20 - 10 = 10

    let currentPosts = paisesHome.slice(indexOfFirstPost, indexOfLastPost);
    /*
    [
      0:{}
      1:{}
      2:{}
      3:{}
      4:{}
      5:{}
      6:{}
      7:{}
    ]
    */

    useEffect(() => {
        setCurrentPage(1)
    }, [paisesHome])

    // useEffect(() => {
    //     console.log('soy currentPost',currentPosts)
    // },[])
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => {
        setPaisesHome([...countries])
    }, [countries])
    console.log('soy home', countries)

    return (
        <div className='home'>
            <div className='barra'>
                <Search setPaisesHome={setPaisesHome} paisesHome={paisesHome} />
            </div>
            <div className='cartas'>
                {currentPosts.length > 0 ?
                    currentPosts.map(e => {
                        return <Country key={e.ID} name={e.name} ID={e.ID} Bandera={e.Bandera} Continente={e.Continente} />
                    })
                    : null}
            </div>
            {
        Math.ceil(paisesHome.length / postsPerPage) > 1 
        ?  <Pagination currentPage={currentPage} paisesHome={paisesHome} postsPerPage={postsPerPage} totalPosts={paisesHome.length} paginate={paginate} />
        : null
        }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        countries: state.countries
    };
}

export default connect(mapStateToProps, { getCountries })(Home);
import React, { useEffect } from "react";
import './pagination.css';

export default function Pagination({ paisesHome, currentPage, postsPerPage, totalPosts, paginate }){
  const pageNumbers = [];
// useEffect(() => {
//     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//         pageNumbers.push(i);
//       }
// })
useEffect(() => {
paginaActual = currentPage;
},[currentPage])
let paginaActual = 1
for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ol className='pagination'>
        {/* {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-button'>
              {number}
            </button>
          </li>
        ))} */}
        {currentPage > 1 ? <button onClick={() => paginate(paginaActual-1)} className='page-button'><img src="https://img.icons8.com/material-outlined/24/000000/chevron-left.png" className='flechita'/></button> : null}
        {currentPage > 1 ? <button onClick={() => paginate(paginaActual-1)} className='page-button'>{currentPage-1}</button>: null}
        <h5 className='numeroPagina'>{currentPage}</h5>
        {currentPage < Math.ceil(paisesHome.length / postsPerPage) ? <button onClick={() => paginate(paginaActual+1)} className='page-button'>{currentPage+1}</button>  : null}
        {currentPage < Math.ceil(paisesHome.length / postsPerPage) ? <button onClick={() => paginate(paginaActual+1)} className='page-button'><img src="https://img.icons8.com/material-outlined/24/000000/chevron-right.png" className='flechita'/></button> : null}
      </ol>
    </nav>
  );
};


import React, { useEffect } from "react";
import './pagination.css';

export default function Pagination({ postsPerPage, totalPosts, paginate }){
  const pageNumbers = [];
// useEffect(() => {
//     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//         pageNumbers.push(i);
//       }
// })
for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ol className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-button'>
              {number}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLastBook = () => {

  const [userLastBooks, setUserLastBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserLastBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/userlastbooks'); // Update this URL
      setUserLastBooks(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching user last books');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLastBooks();
  }, []);

  return (
    <div>
      <h1>All User Last Borrowed Books</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='row mt-3'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>User ID</th>
                <th scope='col'>User Email</th>
                <th scope='col'>User Name</th>
                <th scope='col'>Last Borrowed Book Title</th>
                <th scope='col'>Last Borrowed Book ID</th>
                
              
              </tr>
            </thead>
           
        <tbody>
          {userLastBooks.map((userLastBook, index) => (
            <tr key={index}>
                 <th scope='row'>{index + 1}</th>
              <td>{userLastBook.userId}</td>
              <td>{userLastBook.userEmail}</td>
              <td>{userLastBook.userName}</td>
              <td>{userLastBook.lastBorrowedBookTitle}</td>
              <td>{userLastBook.lastBorrowedBookId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default UserLastBook;

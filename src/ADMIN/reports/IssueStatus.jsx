import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_server } from '../../main';

const IssueStatus = () => {
  const NOT_RETURNED_API = `${backend_server}/api/v1/requestBooks/notreturnedbooks`;
  const [issuedBooksByMonth, setIssuedBooksByMonth] = useState({});
  const [isAnyBooksIssued, setIsAnyBooksIssued] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const fetchIssuedBooksByMonth = async () => {
    try {
      const response = await axios.get(NOT_RETURNED_API);
      const issuedBooks = response.data.data;

      // Group issued books by month
      const booksByMonth = {};
      issuedBooks.forEach((book) => {
        const month = new Date(book.issueDate).getMonth();
        if (booksByMonth[month]) {
          booksByMonth[month].push(book);
        } else {
          booksByMonth[month] = [book];
        }
      });

      setIssuedBooksByMonth(booksByMonth);
      setIsAnyBooksIssued(Object.keys(booksByMonth).length > 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIssuedBooksByMonth();
  }, []);

  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value);
    setSelectedMonth(selectedMonth);
  };

  const filteredBooks = selectedMonth !== null ? issuedBooksByMonth[selectedMonth] : Object.values(issuedBooksByMonth).flat();

  // useEffect(() => {
  //   setIsAnyBooksIssued(filteredBooks.length > 0);
  // }, [filteredBooks]);
  useEffect(() => {
    setIsAnyBooksIssued(Object.keys(issuedBooksByMonth).length > 0);
  }, [issuedBooksByMonth]);
  return (
    <div className='container mt-2'>
      <h1 className='h1 text-center'>Issued Books</h1>

      {/* Month filter dropdown */}
      <div className="text-center mb-3">
        <label htmlFor="monthSelect">Select Month: </label>
        <select id="monthSelect" className="ml-2" onChange={handleMonthChange}>
          <option value={null}>All</option>
          {[...Array(12).keys()].map((month) => (
            <option key={month} value={month}>{new Date(0, month, 1).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
      </div>

      {/* Display issued books by month */}
      {isAnyBooksIssued ? (
        <div className='row mt-3'>
           {filteredBooks && filteredBooks.length > 0 ? (
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Book Title</th>
                <th scope='col'>Username</th>
                <th scope='col'>Email</th>
                <th scope='col'>Issue Date</th>
                <th scope='col'>Return Date</th>
                <th scope='col'>Return Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{book.bookTitle}</td>
                  <td>{book.username}</td>
                  <td>{book.userEmail}</td>
                  <td>{new Date(book.issueDate).toDateString()}</td>
                  <td>{new Date(book.returnDate).toDateString()}</td>
                  <td>{book.isReturned ? 'Returned' : 'Not Returned'}</td>
                </tr>
              ))}
            </tbody>
          </table>
         ) : (
          <p className='p text-center my-3'>No Issued Books for Selected Month</p>
        )}
      </div>
    ) : (
      <p className='p text-center my-3'>{selectedMonth === null ? 'No Issued Books Yet' : 'No Issued Books for Selected Month'}</p>
    )}
    </div>
  );
};

export default IssueStatus;

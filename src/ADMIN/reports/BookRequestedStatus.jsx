import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backend_server } from '../../main';
import { Toaster, toast } from 'react-hot-toast';

const BookRequestedStatus = () => {
  const Pending_Book_API_Url = `${backend_server}/api/v1/requestBooks`;

  const [pendingBooks, setPendingBooks] = useState([]);
  const [bookIssueStatus, setBookIssueStatus] = useState('');
  const [isAnyBooksPending, setIsAnyBooksPending] = useState(true);
  const [filterByStatus, setFilterByStatus] = useState('PENDING');

  const fetchPendingBooks = async () => {
    try {
      const response = await axios.get(Pending_Book_API_Url, {
        params: { issueStatus: filterByStatus }
      });
      const totalHits = response.data.totalHits;
      if (totalHits === 0) {
        setIsAnyBooksPending(false);
      } else {
        setPendingBooks(response.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  
  useEffect(() => {
    fetchPendingBooks();
  }, [filterByStatus]); 

  const handleFormUpdate = async (transactionId) => {
    try {
      const response = await axios.patch(Pending_Book_API_Url, {
        id: transactionId,
        issueStatus: bookIssueStatus,
      });
      toast.success('Update Success');
      fetchPendingBooks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSelectChange = (e) => {
    const selectedIssueStatus = e.target.value;
    setBookIssueStatus(selectedIssueStatus);
  };

  const handleFilterChange = (e) => {
    setFilterByStatus(e.target.value);
  };

  const filteredBooks = pendingBooks.filter((book) => {
    return book.issueStatus.toUpperCase() === filterByStatus;
  });

  return (
    <div className='container mt-2'>
      <h1 className='h1 text-center'>Books Requests</h1>
      <div className='row mt-3'>
        <label htmlFor='statusFilter'>Filter by Status: </label>
        <select
          id='statusFilter'
          className='form-control mx-2'
          value={filterByStatus}
          onChange={handleFilterChange}
        >
          <option value='PENDING'>Pending</option>
          <option value='READY'>Ready to Pick</option>
          <option value='ACCEPTED'>Accepted</option>
          <option value='CANCELLED'>Cancelled</option>
        </select>
      </div>
      {isAnyBooksPending ? (
        filteredBooks.length > 0 ? (
          <div className='row mt-3'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Username</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Book</th>
                  <th scope='col'>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, index) => (
                  <tr key={book._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{book.username}</td>
                    <td>{book.userEmail}</td>
                    <td>{book.bookTitle}</td>
                    <td>{book.issueStatus}</td>
                    {/* <td>
                      <form className='d-flex' onSubmit={(e) => e.preventDefault()}>
                        <select
                          className='form-control mx-1'
                          value={bookIssueStatus}
                          onChange={handleSelectChange}
                        >
                          <option value='PENDING'>Pending</option>
                          <option value='READY'>Ready to Pick</option>
                          <option value='ACCEPTED'>Accepted</option>
                          <option value='CANCELLED'>Cancelled</option>
                        </select>
                        <button
                          className='btn btn-success mx-1'
                          onClick={() => handleFormUpdate(book._id)}
                        >
                          Update
                        </button>
                      </form>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Not Availabel Book Request</p>
        )
      ) : (
        <p className='p text-center my-3'>0 Book Requests</p>
      )}
    </div>
  );
};

export default BookRequestedStatus;

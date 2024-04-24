import React, { useState } from 'react';
import axios from 'axios';
import { backend_server } from '../../main';

const IssueSearch = ({ setAllBooks}) => {
  const API_URL = `${backend_server}/api/v1/filter/transactions`;

  const emptyField = {
    startDate: null,
    endDate: null,
  };

  const [filterFields, setFilterFields] = useState(emptyField);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!filterFields.startDate && !filterFields.endDate) {
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        params: filterFields,
      });

      setAllBooks(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDateChange = (field, date) => {
    setFilterFields({ ...filterFields, [field]: date });
  };

  const handleClearFilters = () => {
    setFilterFields(emptyField);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-10'>
          <form
            method='get'
            className='form-inline d-flex justify-content-center'
          >
            <input
              type='date'
              className='form-control mx-1'
              onChange={(e) => handleDateChange('startDate', e.target.value)}
            />

            <input
              type='date'
              className='form-control mx-1'
              onChange={(e) => handleDateChange('endDate', e.target.value)}
            />

            <div className='col-xl-2 text-center d-flex' style={{ width: 'fit-content' }}>
              <button
                type='submit'
                className='btn btn-success mx-1 my-1'
                onClick={handleFormSubmit}
              >
                Search
              </button>

              <button
                type='button'
                className='btn btn-danger mx-1 my-1'
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueSearch;

import axios from 'axios'
import React, { useState } from 'react'
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'


const CategoriesSearch = ({ setAllBooks, bookCategories }) => {
  const API_URL = `${backend_server}/api/v1/filter`

  const empty_field = {
    category: '',
   
  }

  const [filterFields, setFilterFields] = useState(empty_field)

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (JSON.stringify(filterFields) == JSON.stringify(empty_field)) {
      return false
    }

    const {category} = filterFields
    try {
      const response = await axios.get(API_URL, {
        params: {
        
          category,
         
        },
      })

      setAllBooks(response.data.data)
      // console.log(filterFields)
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFilterFields({ ...filterFields, [name]: value })
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value
    setFilterFields({ ...filterFields, category: selectedCategory })
  }
  

  // TODO : Handle Clear Form Filter
  const handleClearFilters = () => {
    setFilterFields(empty_field)

    // Reset the "Category" select dropdown to the default placeholder option
    const categorySelect = document.getElementById('categorySelect')
    if (categorySelect) {
      categorySelect.selectedIndex = 0
    }

    // Reset the "Featured" select dropdown to the default placeholder option
    
  }

  return (
    <div className='container '>
      <div className='row'>
        <div className='col-md-10'>
          <form
            method='get'
            className='form-inline d-flex justify-content-center'
          >
            {/* Search Filter */}
            {/* <input
              type='text'
              className='form-control mx-1'
              autoComplete='off'
              placeholder='Search by title . . .'
              name='title'
              value={filterFields.title}
              onChange={handleOnChange}
            /> */}

            {/* Category Filter */}
            <select
              id='categorySelect'
              className='form-control mx-1'
              defaultValue=''
              onChange={handleCategoryChange}
            >
              <option key='' value=''>
                Categories
              </option>
              {bookCategories.map((books_category) => {
                return (
                  <option key={books_category} value={books_category}>
                    {books_category}
                  </option>
                )
              })}
            </select>

            {/* Featured Filter */}
            

            {/* Available Filter */}
           

            <div
              className='col-xl-2 text-center d-flex '
              style={{ width: 'fit-content' }}
            >
              <button
                type='submit'
                className='btn btn-success mx-1 my-1'
                onClick={handleFormSubmit}
              >
                Search
              </button>

              {/* Clear FORM Filter BTN */}
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

        {/* Add new BOOK */}
        {/* <div className='col mx-1 my-1'>
          <Link to='/admin/managebooks/addnewbook'>
            <button className='btn btn-primary' type='button'>
              Add new Book
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default CategoriesSearch

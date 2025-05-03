import React from 'react'
import { Link } from 'react-router-dom'

function books() {
  return (
      <div className='m-[20px]'>
          <h1 className='text-3xl'>Books Published on Himachal Pradesh</h1>
          <hr className='my-3' />
              <Link
                  className='text-teal-600 hover:text-blue-900 p-3 text-3xl block underline'
                  to="https://docs.google.com/spreadsheets/d/1xFGueiY2r6nICTfVnFwGzJpalBF3kQze/edit#gid=1806877758" target='_blank' rel="noreferrer">List of Books</Link>
              <Link
                  className='text-teal-600 hover:text-blue-900 p-3 text-3xl block underline'
                  to="http://ir.juit.ac.in:8080/jspui/handle/123456789/11053" target='_blank' rel="noreferrer">List of Books Full Text(PDF)
              </Link>
          </div>
  )
}

export default books
import React from 'react'
import { Link } from 'react-router-dom'

function constitution() {
  return (
      <div className='p-3'>
          <h1 className='text-3xl'>Constitution</h1>
          <hr className='my-4' />
          <div>
              <span className='font-semibold'>Registration Certificate : </span>
              <Link className='text-teal-600' to='https://drive.google.com/file/d/1AoOw-2nJ9Pwa__CqmaYkQIBj2GHX6766/view' target='_blank'>Click Here</Link>
          </div>
    </div>
  )
}

export default constitution
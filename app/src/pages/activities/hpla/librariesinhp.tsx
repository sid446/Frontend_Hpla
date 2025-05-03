import React from 'react'
import { Link } from 'react-router-dom'

function librariesinhp() {
  return (
      <div className='m-[20px]'>
          <h1 className='text-3xl'>Directories being compiled by the HPLA</h1>
          <hr className='mb-8' />
          <div className='flex flex-col gap-4'>
          <div className='shadow-md rounded-lg p-3'>
              <p className='font-semibold text-blue-600'>Directory of Library and Information Professionals of Himachal Pradesh</p>
              <hr />
              <div className="links flex flex-row justify-between mt-3">
                <Link className='text-teal-600 hover:text-teal-900 underline' to="https://docs.google.com/forms/d/e/1FAIpQLSeX7qCDUK7YPppo8ZZyOfijMs6KVhHx6HevvIuoJuMuj7l0eA/viewform" target='_blank' rel="noreferrer">Form Link</Link>
                <Link className='text-teal-600 hover:text-teal-900 underline' to="https://drive.google.com/file/d/1-D4rJ6hCc0gwaBm_BHFsPQNVHaD0Vjjb/view?usp=sharing" target='_blank' rel="noreferrer"> Click to access the Directory</Link>
              </div>
          </div>
          <div className='shadow-md rounded-lg p-3'>
              <p className='font-semibold text-blue-600'>Directory of Library of Himachal Pradesh</p>
              <hr />
              <div className="links flex flex-row justify-between mt-3">
                <Link className='text-teal-600 hover:text-teal-900 underline' to="https://docs.google.com/forms/d/e/1FAIpQLScSNhgruS2nFCdYMi7iKJXpBbyZxWbtf4EEcRQrCJjk2nROtw/viewform" target='_blank' rel="noreferrer">Form Link</Link>
                <Link className='text-teal-600 hover:text-teal-900 underline' to="https://drive.google.com/file/d/13tC0vEQsmzIq35RuLnLsWLX7KORLPSqj/view?usp=sharing" target='_blank' rel="noreferrer"> Click to access the Directory</Link>
              </div>
              
              
          </div>
          </div>
    </div>
  )
}

export default librariesinhp
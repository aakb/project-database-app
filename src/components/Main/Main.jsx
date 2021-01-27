import React from 'react'

function Main ({ children }) {
  return (
    <div className='bg-gray-100 py-6'>
      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>{children}</div>
    </div>
  )
}

export default Main

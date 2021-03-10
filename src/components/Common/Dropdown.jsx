import React from 'react'
import './Dropdown.css'

function Dropdown ({ name, label, chosen, options, ...rest }) {
  return (
    <>
      <div className='relative inline-block'>
        <label
          className='text-xs font-semibold inline-block px-1 py-1 last:mr-0 mr-1 text-left '
          htmlFor={name}
        >
          {label}
        </label>
        <select className='form-select' id={name} name={name} {...rest}>
          {options.map((option) => (
            <option
              value={option.id}
              key={option.id}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Dropdown

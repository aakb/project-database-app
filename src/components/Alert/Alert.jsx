import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useTranslate } from 'react-translate'

function Alert ({ children, variant }) {
  const t = useTranslate('common')

  return (

    <div className={'bg-' + variant + '-600 rounded'}>
      <div className='max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='w-0 flex-1 flex items-center'>
            {variant === 'red' && <FontAwesomeIcon icon={faExclamationTriangle} className='text-white' />}
            {variant === 'indigo' && <FontAwesomeIcon icon={faSpinner} size='lg' spin className='text-white' />}
            <p className='ml-3 font-medium text-white truncate'>
              {children}
            </p>
          </div>
          <div className='order-2 flex-shrink-0 sm:order-3 sm:ml-3'>
            <button type='button' className='-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2'>
              <span className='sr-only'>{t('alert.dismiss')}</span>
              <FontAwesomeIcon icon={faTimes} className='text-white' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert

import React from 'react'
import AppLogo from './Logo.svg'
import { useTranslate } from 'react-translate'

function Logo () {
  const t = useTranslate('common')

  return (
    <div className='brand'>
      <img className='logo' src={AppLogo} alt='' /> {t('Page title')}
    </div>
  )
}

export default Logo

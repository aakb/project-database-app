import React from 'react'
import { useTranslate } from 'react-translate'
import Alert from '../Alert/Alert'

function WithListLoading (Component) {
  const t = useTranslate('common')

  return function WihLoadingComponent ({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />
    return (
      <Alert variant='indigo'>
        {t('Hold on, fetching data may take some time :)')}
      </Alert>
    )
  }
}
export default WithListLoading

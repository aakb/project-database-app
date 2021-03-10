import React, { useContext, useEffect, useState } from 'react'
import AppStateContext from '../../../context/appStateContext'
import Alert from '../../Alert/Alert'
import GanttChart from './GanttChart'
import { useTranslate } from 'react-translate'
import { mapGanttData, getEndDateForXAxis } from '../../utils/GanttMapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
function GanttChartView () {
  const t = useTranslate('chart')
  const context = useContext(AppStateContext)
  const [data, setData] = useState()
  const endDateForXAxis = getEndDateForXAxis()
  useEffect(() => {
    setData(mapGanttData(context.data.get.data))
  }, [])

  return (
    <>
      <div className='chart mt-3'>
        <div className='chart-container'>
          {!context.isLoading.get && !context.hasError.get && data && (
            <GanttChart data={data} endDateForXAxis={endDateForXAxis} />
          )}
          {context.isLoading.get && (
            <FontAwesomeIcon icon={faSpinner} size='lg' spin />
          )}
          {context.hasError.get && (
            <Alert variant='red'>{t('alert.error')}</Alert>
          )}
        </div>
      </div>
    </>
  )
}

export default GanttChartView

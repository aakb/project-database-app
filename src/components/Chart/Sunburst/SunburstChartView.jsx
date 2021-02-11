import React, { useContext, useEffect, useState } from 'react'
import AppStateContext from '../../../context/appStateContext'
import Alert from '../../Alert/Alert'
import SunburstChart from './SunburstChart'
import Dropdown from '../../Common/Dropdown'
import './ChartView.css'
import { useTranslate } from 'react-translate'
import { mapSunburstData } from '../../utils/SunburstMapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
function SunburstChartView () {
  const t = useTranslate('chart')
  const context = useContext(AppStateContext)
  const organisationsAndInitiatives = [...context.data.get.data, ...context.data.get.included]
  const [data, setData] = useState()
  const options = [{
    name: t('option.organizational_anchoring'),
    id: 'organizational_anchoring'
  }, {
    name: t('option.status'),
    id: 'status'
  }, {
    name: t('option.stakeholders'),
    id: 'stakeholder'
  }, {
    name: t('option.strategy'),
    id: 'strategy'
  }]
  const [sortBy, setSortBy] = useState(options[0])

  useEffect(() => {
    setData(mapSunburstData(organisationsAndInitiatives, sortBy.id))
  }, [sortBy])

  function sortData ({ target }) {
    setSortBy(options.find(option => option.id === target.value))
  }

  return (
    <>
      <Dropdown
        name='databasis'
        chosen={sortBy.name}
        label={t('data basis')}
        options={options}
        onChange={sortData}
      />
      <div className='chart'>
        <div className='chart-container'>
          {!context.isLoading.get && !context.hasError.get && data && (
            <SunburstChart data={data} />
          )}
          {context.isLoading.get && (
            <FontAwesomeIcon icon={faSpinner} size='lg' spin />
          )}
          {context.hasError.get && <Alert variant='red'>{t('alert.error')}</Alert>}
        </div>
      </div>
    </>
  )
}

export default SunburstChartView

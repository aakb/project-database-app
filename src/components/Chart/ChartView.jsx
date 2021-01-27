import React, { useContext, useEffect, useState } from 'react'
import AppStateContext from '../../context/appStateContext'
import Alert from '../Alert/Alert'
import SunburstChart from './SunburstChart'
import './ChartView.css'
import { useTranslate } from 'react-translate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function ChartView () {
  const t = useTranslate('chart')
  const context = useContext(AppStateContext)
  let organisationsAndInitiatives = [...context.data.get.data, ...context.data.get.included]
  const [data, setData] = useState()
  useEffect(() => {
    // Map the two types, organisation and initiative, so they are similar.
    organisationsAndInitiatives = organisationsAndInitiatives.map(function (item) {
      const orgId = item.relationships?.parent?.data[0]?.id
      const initId = item.relationships?.organizational_anchoring?.data?.id
      const orgName = item.attributes.name
      const initName = item.attributes.title
      return {
        name: orgName || initName,
        id: item.id,
        value: 1,
        parentId: orgId || initId
      }
    })

    // Drupal/jsonapi: virtual
    // https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/core-concepts#virtual
    // the "virtual" resource identifier identifies the <root>  taxonomy term.
    // As such, this signals that the referencing term is at the top level of its vocabulary."
    const nestData = (dataArray, id = 'virtual') =>
      dataArray
        .filter(item => item.parentId === id)
        .map(function (organisation) {
          const children = nestData(dataArray, organisation.id)
          const returnObject = children.length ? { ...organisation, children: children } : { ...organisation }
          return returnObject
        })

    setData(nestData(organisationsAndInitiatives))
  }, [])
  return (
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
  )
}

export default ChartView

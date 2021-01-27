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
  const projects = context.data.get.data
  const organisations = context.data.get.included
  const [data, setData] = useState()
  useEffect(() => {
    // In the following, for every organization, we find the projects
    // and save them as children.
    let chartData = []
    let organisationProjectChildren = []
    organisations.forEach((organisation) => {
      projects.forEach((project) => {
        const projectParentOrganisationId = project.relationships?.organizational_anchoring?.data?.id
        if (organisation.id === projectParentOrganisationId) {
          organisationProjectChildren.push({
            name: project.attributes.title,
            value: 20
          })
        }
      })
      const parentId = organisation.relationships.parent.data[0].id
      chartData.push({
        name: organisation.attributes.name,
        id: organisation.id,
        value: 10,
        parentId: parentId,
        children: organisationProjectChildren
      })
      organisationProjectChildren = []
    })
    // Now we identify the organisations that have parent-organisations
    // If an organisation has a parent, we add this organisation, and its children,
    // to the children of said parent organisation.
    // The organisations with parents are marked for deletion.
    chartData.forEach((chartDataProject) => {
      if (chartDataProject.parentId !== 'virtual') {
        chartData.find(project => project.id === chartDataProject.parentId).children.push(chartDataProject)
        chartDataProject.delete = true
      }
    })
    // Now we filter away the duplicates.
    chartData = chartData.filter(function (item) {
      return !item.delete
    })
    setData(chartData)
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

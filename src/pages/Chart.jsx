import React, { useContext, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import SunburstChartView from '../components/Chart/Sunburst/SunburstChartView'
import { useTranslate } from 'react-translate'
import AppStateContext from '../context/appStateContext'
import GanttChartView from '../components/Chart/Gantt/GanttChartView'
import Dropdown from '../components/Common/Dropdown'
function Projects ({ location }) {
  const t = useTranslate('chart')
  const context = useContext(AppStateContext)
  const options = [
    {
      name: t('option.sunburst'),
      id: 'sunburst'
    },
    {
      name: t('option.gantt'),
      id: 'gantt'
    }
  ]
  const [graphType, setGraphType] = useState(options[0])

  function setType ({ target }) {
    setGraphType(options.find((option) => option.id === target.value))
  }

  return (
    <Layout location={location}>
      <HelmetProvider>
        <Helmet>
          <title>{t('title')}</title>
          <meta name='description' content={t('meta.description')} />
        </Helmet>
      </HelmetProvider>
      <Header>{t('title')}</Header>
      <Main>
        <legend className='font-bold leading-tight text-gray-900 mb-4'>
          {t('display settings')}
        </legend>
        <span className='mr-4'>
          <Dropdown
            name='graph'
            label={t('graph type')}
            chosen={graphType.name}
            options={options}
            onChange={setType}
          />
        </span>
        {!context.isLoading.get &&
          !context.hasError.get &&
          context.data.get &&
          graphType.id === 'gantt' && <GanttChartView />}
        {!context.isLoading.get &&
          !context.hasError.get &&
          context.data.get &&
          graphType.id === 'sunburst' && <SunburstChartView />}
      </Main>
    </Layout>
  )
}

export default Projects

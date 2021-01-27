import React, { useContext } from 'react'
import Layout from '../components/Layout/Layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import ChartView from '../components/Chart/ChartView'
import { useTranslate } from 'react-translate'
import AppStateContext from '../context/appStateContext'

function Projects ({ location }) {
  const t = useTranslate('chart')
  const context = useContext(AppStateContext)
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
        {!context.isLoading.get && !context.hasError.get && context.data.get && (
          <ChartView />
        )}

      </Main>
    </Layout>
  )
}

export default Projects

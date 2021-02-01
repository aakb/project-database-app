import React, { useContext } from 'react'
import Layout from '../components/Layout/Layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import Alert from '../components/Alert/Alert'
import List from '../components/Projects/ProjectsList'
import WithListLoading from '../components/Common/WithListLoading'
import { useTranslate } from 'react-translate'
import AppStateContext from '../context/appStateContext'

function Projects ({ location }) {
  const t = useTranslate('projects')
  const context = useContext(AppStateContext)
  const ListLoading = WithListLoading(List)

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
          <ListLoading
            isLoading={context.isLoading.get}
            jsonData={context.data.get}
          />
        )}
        {context.isLoading.get && (
          <Alert variant='indigo'>{t('alert.loadingData')}</Alert>
        )}
        {context.hasError.get && <Alert variant='red'>{t('alert.error')}</Alert>}
      </Main>
    </Layout>
  )
}

export default Projects

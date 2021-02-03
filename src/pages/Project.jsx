import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import Alert from '../components/Alert/Alert'
import { useTranslate } from 'react-translate'
import simpleSvgPlaceholder from '@cloudfour/simple-svg-placeholder'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { format } from 'date-fns'
import { da } from 'date-fns/locale'
function Project ({ location }) {
  const dataEndpoint =
    `${process.env.REACT_APP_API_ENDPOINT}jsonapi/node` +
    location.pathname +
    '?include=organizational_anchoring'

  const t = useTranslate('projects')

  // Get data from API with fetch()
  const [appState, setAppState] = useState({
    isLoading: true,
    error: false,
    jsonData: []
  })

  useEffect(() => {
    function mapTableData (data) {
      const mappedArray = []
      const valuesToShow = [
        'title',
        'author',
        'budget',
        'changed',
        'status_additional',
        'description'
      ]
      for (let [key, value] of Object.entries(data)) {
        if (value && valuesToShow.includes(key)) {
          value = key === 'changed'  ? format(new Date(value), "do MMMM yyyy", {locale: da}) : value
          const title = t(`project.${key}`)
          if (typeof value === 'string') {
            mappedArray.push({ title: title, value: value })
          } else {
            mappedArray.push({ title: title, value: value.value })
          }
        }
      }
      return mappedArray
    }

    setAppState({ isLoading: true, error: false })
    window.fetch(dataEndpoint, {
      headers: {
        accept: 'application/vnd.api+json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const tableData = mapTableData(data.data.attributes)
        setAppState({
          isLoading: false,
          jsonData: data,
          tableData: tableData
        })
      })
      .catch((error) => {
        setAppState({ isLoading: false, error: true })
        console.log('Error: ' + error)
      })
  }, [setAppState, dataEndpoint, t])

  return (
    <Layout location={location}>
      {!appState.isLoading && !appState.error && (
        <div>
          <HelmetProvider>
            <Helmet>
              <title>{appState.jsonData.data.attributes.title}</title>
              <meta
                name='description'
                content={appState.jsonData.data.attributes.title}
              />
            </Helmet>
          </HelmetProvider>
          <Header>{appState.jsonData.data.attributes.title}</Header>
          <Main>
            <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
              <div className='px-4 py-5 sm:px-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  {appState.jsonData.included[0].attributes.name}
                  <img
                    className='h-10 w-10 rounded-full float-left mr-3'
                    src={simpleSvgPlaceholder({
                      width: 100,
                      height: 100,
                      text: appState.jsonData.included[0].attributes.name
                    })}
                    alt=''
                  />
                </h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  {t('project.org')}
                </p>
              </div>
              <div className='border-t border-gray-200'>
                <dl>
                  {appState.tableData.map((column, index) => (
                    <div
                      key={index}
                      className={
                        index % 2 === 0
                          ? 'bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'
                          : 'bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'
                      }
                    >
                      <dt className='text-sm font-medium text-gray-500'>
                        {column.title}
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {column.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className='py-3 my-3'>
              <Link
                to='/projects'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-3 sm:mx-0 sm:w-auto sm:text-sm'
              >
                {t('project.nav.back')}
              </Link>
            </div>
          </Main>
        </div>
      )}
      {appState.isLoading && (
        <Alert variant='indigo'>{t('alert.loadingData')}</Alert>
      )}
      {appState.error && <Alert variant='red'>{t('alert.error')}</Alert>}
    </Layout>
  )
}

export default Project

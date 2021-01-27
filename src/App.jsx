import React, { useState, useEffect, useContext } from 'react'
import AppStateContext from './context/appStateContext'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Project from './pages/Project'
import Chart from './pages/Chart'
import { TranslatorProvider } from 'react-translate'
import common_da from './translations/da/common.json'
import home_da from './translations/da/home.json'
import projects_da from './translations/da/projects.json'
import chart_da from './translations/da/chart.json'
import common_en from './translations/en/common.json'
import home_en from './translations/en/home.json'
import projects_en from './translations/en/projects.json'
import chart_en from './translations/en/chart.json'

function App () {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const store = {
    data: { get: data, set: setData },
    isLoading: { get: isLoading, set: setIsLoading },
    hasError: { get: hasError, set: setHasError }
  }

  useEffect(() => {
    const dataEndpoint = `${process.env.REACT_APP_API_ENDPOINT}jsonapi/node/initiative?include=organizational_anchoring`
    setIsLoading(true)
    setHasError(false)
    fetch(dataEndpoint, {
      headers: {
        accept: 'application/vnd.api+json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setHasError(true)
        setIsLoading(false)
      })
  }, [setIsLoading, setHasError, setData])

  // Translations
  const [language] = useState('da')
  let translations
  if (language === 'en') {
    translations = {
      locale: 'en',
      common: common_en,
      home: home_en,
      projects: projects_en,
      chart: chart_en
    }
  } else {
    translations = {
      locale: 'da',
      common: common_da,
      home: home_da,
      projects: projects_da,
      chart: chart_da
    }
  }
  return (
    <AppStateContext.Provider value={store}>
      <TranslatorProvider translations={translations}>
        <Router>
          <Switch>
            <Chart path='/chart' />
            <Project path='/initiative/:id' />
            <Projects path='/projects' />
            <Home path='/' />
          </Switch>
        </Router>
      </TranslatorProvider>
    </AppStateContext.Provider>
  )
}
export default App

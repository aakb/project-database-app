import React, { useState, useEffect } from 'react'
import AppStateContext from './context/appStateContext'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Project from './pages/Project'
import Chart from './pages/Chart'
import { TranslatorProvider } from 'react-translate'
import CommonDa from './translations/da/common.json'
import HomeDa from './translations/da/home.json'
import ProjectsDa from './translations/da/projects.json'
import ChartDa from './translations/da/chart.json'
import CommonEn from './translations/en/common.json'
import HomeEn from './translations/en/home.json'
import ProjectsEn from './translations/en/projects.json'
import ChartEn from './translations/en/chart.json'

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
    window.fetch(dataEndpoint, {
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
        console.log(error)
      })
  }, [setIsLoading, setHasError, setData])

  // Translations
  const [language] = useState('da')
  let translations
  if (language === 'en') {
    translations = {
      locale: 'en',
      common: CommonEn,
      home: HomeEn,
      projects: ProjectsEn,
      chart: ChartEn
    }
  } else {
    translations = {
      locale: 'da',
      common: CommonDa,
      home: HomeDa,
      projects: ProjectsDa,
      chart: ChartDa
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

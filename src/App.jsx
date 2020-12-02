import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import Home from './pages/Home'
import Projects from './pages/Projects'
import { TranslatorProvider } from 'react-translate'
import AppStateContext from './context/appStateContext'
import common_da from "./translations/da/common.json";
import home_da from "./translations/da/home.json";
import projects_da from "./translations/da/projects.json";
import common_en from "./translations/en/common.json";
import home_en from "./translations/en/home.json";
import projects_en from "./translations/en/projects.json";

function App() {

  // Translations
  const [language, setLanguage] = useState('da')
  const store = {
    language: { get: language, set: setLanguage },
  }
  let translations
  if (language === 'en') {
    translations = {
      locale: 'en',
      common: common_en,
      home: home_en,
      projects: projects_en
    }
  } else {
    translations = {
      locale: 'da',
      common: common_da,
      home: home_da,
      projects: projects_da
    }
  }

  return (
    <TranslatorProvider translations={translations}>
        <AppStateContext.Provider value={store}>
          <Router>
            <Switch>
              <Projects path="/projects"/>
              <Home path="/"/>
            </Switch>
          </Router>
        </AppStateContext.Provider>
    </TranslatorProvider>
  );
}
export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Chart from "./pages/Chart";
import { TranslatorProvider } from "react-translate";
import AppStateContext from "./context/appStateContext";
import common_da from "./translations/da/common.json";
import home_da from "./translations/da/home.json";
import projects_da from "./translations/da/projects.json";
import chart_da from "./translations/da/chart.json";
import common_en from "./translations/en/common.json";
import home_en from "./translations/en/home.json";
import projects_en from "./translations/en/projects.json";
import chart_en from "./translations/en/chart.json";

function App() {
  // Translations
  const [language, setLanguage] = useState("da");
  const store = {
    language: { get: language, set: setLanguage },
  };
  let translations;
  if (language === "en") {
    translations = {
      locale: "en",
      common: common_en,
      home: home_en,
      projects: projects_en,
      chart: chart_en,
    };
  } else {
    translations = {
      locale: "da",
      common: common_da,
      home: home_da,
      projects: projects_da,
      chart: chart_da,
    };
  }

  return (
    <TranslatorProvider translations={translations}>
      <AppStateContext.Provider value={store}>
        <Router>
          <Switch>
            <Chart path="/chart" />
            <Projects path="/projects" />
            <Home path="/" />
          </Switch>
        </Router>
      </AppStateContext.Provider>
    </TranslatorProvider>
  );
}
export default App;

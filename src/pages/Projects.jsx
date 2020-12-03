import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import Alert from "../components/Alert/Alert";
import List from "../components/Common/List";
import WithListLoading from "../components/Common/WithListLoading";
import { useTranslate } from "react-translate";
const Data = "http://project-database.local.itkdev.dk/jsonapi/node/initiative";

function Projects({ location }) {
  const t = useTranslate("projects");

  // Get data from API with fetch()
  const ListLoading = WithListLoading(List);
  const [appState, setAppState] = useState({
    isLoading: false,
    error: false,
    projects: [],
  });

  useEffect(() => {
    setAppState({ isLoading: true, error: false });
    fetch(Data, {
      mode: "no-cors",
      headers: {
        accept: "application/vnd.api+json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .then((data) => {
        setAppState({
          isLoading: false,
          projects: data.data,
        });
      })
      .catch((error) => {
        setAppState({ isLoading: false, error: true });
        console.log("Error: " + error);
      });
  }, [setAppState]);

  return (
    <Layout location={location}>
      <Helmet>
        <title>{t("title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Helmet>
      <Header>{t("title")}</Header>
      <Main>
        {!appState.isLoading && !appState.error && (
          <ListLoading
            isLoading={appState.isLoading}
            projects={appState.projects}
          />
        )}
        {appState.isLoading && (
          <Alert variant="indigo">{t("alert.loadingData")}</Alert>
        )}
        {appState.error && <Alert variant="red">{t("alert.error")}</Alert>}
      </Main>
      <Footer>{t("footer.description")}</Footer>
    </Layout>
  );
}

export default Projects;

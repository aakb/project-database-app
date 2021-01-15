import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Alert from "../components/Alert/Alert";
import List from "../components/Projects/ProjectsList";
import WithListLoading from "../components/Common/WithListLoading";
import { useTranslate } from "react-translate";

function Projects({ location }) {
  const Data =
    "http://project-database.local.itkdev.dk/jsonapi/node/initiative?include=organizational_anchoring";
  const t = useTranslate("projects");

  // Get data from API with fetch()
  const ListLoading = WithListLoading(List);
  const [appState, setAppState] = useState({
    isLoading: true,
    error: false,
    jsonData: [],
  });

  useEffect(() => {
    setAppState({ isLoading: true, error: false });
    fetch(Data, {
      headers: {
        accept: "application/vnd.api+json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAppState({
          isLoading: false,
          jsonData: data,
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
            jsonData={appState.jsonData}
          />
        )}
        {appState.isLoading && (
          <Alert variant="indigo">{t("alert.loadingData")}</Alert>
        )}
        {appState.error && <Alert variant="red">{t("alert.error")}</Alert>}
      </Main>
    </Layout>
  );
}

export default Projects;

import React from "react";
import Layout from "../components/Layout/Layout";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import ChartView from "../components/Chart/ChartView";
import { useTranslate } from "react-translate";

function Projects({ location }) {
  const t = useTranslate("chart");

  return (
    <Layout location={location}>
      <HelmetProvider>
        <Helmet>
          <title>{t("title")}</title>
          <meta name="description" content={t("meta.description")} />
        </Helmet>
      </HelmetProvider>
      <Header>{t("title")}</Header>
      <Main>
        <ChartView />
      </Main>
    </Layout>
  );
}

export default Projects;

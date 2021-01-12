import React from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import ChartView from "../components/Chart/ChartView";
import { useTranslate } from "react-translate";

function Projects({ location }) {
  const t = useTranslate("chart");

  return (
    <Layout location={location}>
      <Helmet>
        <title>{t("title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Helmet>
      <Header>{t("title")}</Header>
      <Main>
        <ChartView />
      </Main>
    </Layout>
  );
}

export default Projects;

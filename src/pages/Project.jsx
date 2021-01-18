import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Alert from "../components/Alert/Alert";
import { useTranslate } from "react-translate";
import simpleSvgPlaceholder from "@cloudfour/simple-svg-placeholder";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const DataUrl = "http://project-database.local.itkdev.dk/jsonapi/node";

function Project({ location }) {
  const t = useTranslate("projects");

  // Get data from API with fetch()
  const [appState, setAppState] = useState({
    isLoading: true,
    error: false,
    jsonData: [],
  });

  const dataLocation =
    DataUrl + location.pathname + "?include=organizational_anchoring";

  useEffect(() => {
    setAppState({ isLoading: true, error: false });
    fetch(dataLocation, {
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
  }, [setAppState, dataLocation]);

  return (
    <Layout location={location}>
      {!appState.isLoading && !appState.error && (
        <div>
          <Helmet>
            <title>{appState.jsonData.data.attributes.title}</title>
            <meta
              name="description"
              content={appState.jsonData.data.attributes.title}
            />
          </Helmet>
          <Header>{appState.jsonData.data.attributes.title}</Header>
          <Main>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {t("project.org")}
                  <img
                    className="h-10 w-10 rounded-full float-right"
                    src={simpleSvgPlaceholder({
                      width: 100,
                      height: 100,
                      text: appState.jsonData.included[0].attributes.name,
                    })}
                    alt=""
                  />
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {appState.jsonData.included[0].attributes.name}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  {appState.jsonData.data.attributes.title && (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {t("project.name")}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {appState.jsonData.data.attributes.title}
                      </dd>
                    </div>
                  )}
                  {appState.jsonData.data.attributes.author && (
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {t("project.author")}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {appState.jsonData.data.attributes.author}
                      </dd>
                    </div>
                  )}
                  {appState.jsonData.data.attributes.budget && (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {t("project.budget")}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {appState.jsonData.data.attributes.budget}
                      </dd>
                    </div>
                  )}
                  {appState.jsonData.data.attributes.changed && (
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {t("project.changed")}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {appState.jsonData.data.attributes.changed}
                      </dd>
                    </div>
                  )}
                  {appState.jsonData.data.attributes.status_additional && (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {t("project.status_additional")}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {
                          appState.jsonData.data.attributes.status_additional
                            .value
                        }
                      </dd>
                    </div>
                  )}
                  {appState.jsonData.data.attributes.description && (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {t("project.description")}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {appState.jsonData.data.attributes.description.value}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
            <div className="py-3 my-3">
              <Link
                to="/projects"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-3 sm:mx-0 sm:w-auto sm:text-sm"
              >
                {t("project.nav.back")}
              </Link>
            </div>
          </Main>
        </div>
      )}
      {appState.isLoading && (
        <Alert variant="indigo">{t("alert.loadingData")}</Alert>
      )}
      {appState.error && <Alert variant="red">{t("alert.error")}</Alert>}
    </Layout>
  );
}

export default Project;

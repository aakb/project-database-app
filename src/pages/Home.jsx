import React from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { useTranslate } from "react-translate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBoxes,
  faBolt,
  faParachuteBox,
} from "@fortawesome/free-solid-svg-icons";

function Home({ location }) {
  const t = useTranslate("home");

  return (
    <Layout location={location}>
      <Helmet>
        <title>{t("title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Helmet>
      <Header>{t("title")}</Header>
      <Main>
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                {t("intro.h2")}
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {t("intro.title")}
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                {t("intro.description")}
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <FontAwesomeIcon icon={faGlobe} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      {t("box1.title")}
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {t("box1.description")}
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <FontAwesomeIcon icon={faBoxes} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      {t("box2.title")}
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {t("box2.description")}
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <FontAwesomeIcon icon={faBolt} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      {t("box3.title")}
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {t("box3.description")}
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <FontAwesomeIcon
                        icon={faParachuteBox}
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      {t("box4.title")}
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {t("box4.description")}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Main>
    </Layout>
  );
}

export default Home;

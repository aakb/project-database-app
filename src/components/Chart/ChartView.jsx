import React, { useState, useEffect } from "react";
import Alert from "../Alert/Alert";
import SunburstChart from "./SunburstChart";
import "./ChartView.css";
import { useTranslate } from "react-translate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Data =
  "http://project-database.local.itkdev.dk/jsonapi/node/initiative?include=organizational_anchoring";

function ChartView() {
  const t = useTranslate("chart");
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
    <div className="chart">
      <header className="chart-container">
        {!appState.isLoading && !appState.error && (
          <SunburstChart
            chartId="chart"
            jsonData={appState.jsonData}
            categoryLabel="item"
            valueLabel="count"
          />
        )}
        {appState.isLoading && (
          <FontAwesomeIcon icon={faSpinner} size="lg" spin />
        )}
        {appState.error && <Alert variant="red">{t("alert.error")}</Alert>}
      </header>
    </div>
  );
}

export default ChartView;

import React, { useRef, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_sunburst from "@amcharts/amcharts4/plugins/sunburst";

function SunburstChart({ chartId, jsonData, categoryLabel, valueLabel }) {
  const chart = useRef(null);

  useEffect(() => {
    const { data: projects, included: includedProjects } = jsonData;
    let sun = am4core.create(chartId, am4plugins_sunburst.Sunburst);

    const chartData = [];
    let chartDataChildren = [];
    includedProjects.forEach((includedProject) => {
      projects.forEach((project) => {
        const projectId =
          project.relationships?.organizational_anchoring?.data?.id;
        if (includedProject.id === projectId) {
          chartDataChildren.push({
            name: project.attributes.title,
            value: 20,
          });
        }
      });
      chartData.push({
        name: includedProject.attributes.name,
        value: 10,
        children: chartDataChildren,
      });
      chartDataChildren = [];
    });

    sun.data = chartData;

    sun.padding(0, 0, 0, 0);
    sun.radius = am4core.percent(98);

    sun.colors.step = 2;
    sun.fontSize = 11;
    sun.innerRadius = am4core.percent(10);

    // define data fields
    sun.dataFields.value = "value";
    sun.dataFields.name = "name";
    sun.dataFields.children = "children";

    let level0SeriesTemplate = new am4plugins_sunburst.SunburstSeries();
    level0SeriesTemplate.hiddenInLegend = false;
    sun.seriesTemplates.setKey("0", level0SeriesTemplate);

    // this makes labels to be hidden if they don't fit
    level0SeriesTemplate.labels.template.truncate = true;
    level0SeriesTemplate.labels.template.hideOversized = true;

    level0SeriesTemplate.labels.template.adapter.add(
      "rotation",
      function (rotation, target) {
        target.maxWidth =
          target.dataItem.slice.radius - target.dataItem.slice.innerRadius - 10;
        target.maxHeight = Math.abs(
          ((target.dataItem.slice.arc *
            (target.dataItem.slice.innerRadius +
              target.dataItem.slice.radius)) /
            2) *
            am4core.math.RADIANS
        );

        return rotation;
      }
    );

    let level1SeriesTemplate = level0SeriesTemplate.clone();
    sun.seriesTemplates.setKey("1", level1SeriesTemplate);
    level1SeriesTemplate.fillOpacity = 1;
    level1SeriesTemplate.hiddenInLegend = true;

    let level2SeriesTemplate = level0SeriesTemplate.clone();
    sun.seriesTemplates.setKey("2", level2SeriesTemplate);
    level2SeriesTemplate.fillOpacity = 1;
    level2SeriesTemplate.hiddenInLegend = true;

    sun.legend = new am4charts.Legend();

    sun.current = chart;

    return () => {
      sun.dispose();
    };
  }, [chartId, jsonData, categoryLabel, valueLabel]);

  return <div id={chartId} className="graph" />;
}

export default SunburstChart;

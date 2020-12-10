// https://www.amcharts.com/docs/v4/concepts/data/#Parsing_dates_in_data
// https://www.amcharts.com/docs/v4/tutorials/formatting-date-time-and-numbers-using-intl-object/#Date_format_options

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_sunburst from "@amcharts/amcharts4/plugins/sunburst";

import am4themes_animated from "@amcharts/amcharts4/themes/animated"; // eslint-disable-line camelcase

am4core.useTheme(am4themes_animated);

class SunburstChart {
  constructor(options = {}) {
    this.options = options;
    this.chart = am4core.create(
      options.el || "chartdiv",
      am4plugins_sunburst.Sunburst
    );
    this.chart.padding(0, 0, 0, 0);
    this.chart.radius = am4core.percent(98);

    this.chart.data = [
      {
        name: "First",
        children: [
          { name: "A1", value: 100 },
          { name: "A2", value: 60 },
        ],
      },
      {
        name: "Second",
        children: [
          { name: "B1", value: 135 },
          { name: "B2", value: 98 },
        ],
      },
      {
        name: "Third",
        children: [
          {
            name: "C1",
            children: [
              { name: "EE1", value: 130 },
              { name: "EE2", value: 87 },
              { name: "EE3", value: 55 },
            ],
          },
          { name: "C2", value: 148 },
          {
            name: "C3",
            children: [
              { name: "CC1", value: 53 },
              { name: "CC2", value: 30 },
            ],
          },
          { name: "C4", value: 26 },
        ],
      },
      {
        name: "Fourth",
        children: [
          { name: "D1", value: 415 },
          { name: "D2", value: 148 },
          { name: "D3", value: 89 },
        ],
      },
      {
        name: "Fifth",
        children: [
          {
            name: "E1",
            children: [
              { name: "EE1", value: 33 },
              { name: "EE2", value: 40 },
              { name: "EE3", value: 89 },
            ],
          },
          {
            name: "E2",
            value: 148,
          },
        ],
      },
    ];

    this.chart.colors.step = 2;
    this.chart.fontSize = 11;
    this.chart.innerRadius = am4core.percent(10);

    // define data fields
    this.chart.dataFields.value = "value";
    this.chart.dataFields.name = "name";
    this.chart.dataFields.children = "children";

    let level0SeriesTemplate = new am4plugins_sunburst.SunburstSeries();
    level0SeriesTemplate.hiddenInLegend = false;
    this.chart.seriesTemplates.setKey("0", level0SeriesTemplate);

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
    this.chart.seriesTemplates.setKey("1", level1SeriesTemplate);
    level1SeriesTemplate.fillOpacity = 0.75;
    level1SeriesTemplate.hiddenInLegend = true;

    let level2SeriesTemplate = level0SeriesTemplate.clone();
    this.chart.seriesTemplates.setKey("2", level2SeriesTemplate);
    level2SeriesTemplate.fillOpacity = 0.5;
    level2SeriesTemplate.hiddenInLegend = true;

    if (!options.series) {
      throw new Error("options.series not set in Chart constructor options");
    }

    for (const [field, seriesOptions] of Object.entries(options.series)) {
      const series = this.addSeries(field, {
        ...seriesOptions,
        ...{ bullet: options.bullet },
      });
      this.series.push(series);
    }

    if (options.legend) {
      this.buildLegend(options.legend);
    }

    if (options.cursor) {
      this.buildCursor(options.cursor);
    }

    if (options.scrollbars) {
      this.buildScrollbars(options.scrollbars);
    }

    if (options.export) {
      this.buildExport(options.export);
    }
  }

  // @see https://www.amcharts.com/docs/v4/reference/export/#export_method
  exportImage(type, options = {}) {
    const exporting = this.chart.exporting;
    exporting[type === "pdf" ? "getPDF" : "getImage"](type, options).then(
      (data) => {
        const image = data;
        if (exporting.downloadSupport()) {
          exporting.download(image, (options.filename || "chart") + "." + type);
        } else {
          document.location = image;
        }
      }
    );
  }

  buildExport(options) {
    this.chart.exporting.menu = new am4core.ExportMenu();
  }

  buildAxes(options) {
    // Create axes
    this.dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());

    // https://www.amcharts.com/docs/v4/concepts/axes/date-axis/#List_of_available_time_units
    this.dateAxis.dateFormats.setKey("hour", "HH:mm:ss");
    // Show a full date when the hour changes
    this.dateAxis.periodChangeDateFormats.setKey(
      "hour",
      "HH:mm:ss\nYYYY-MM-dd"
    );

    this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis()); // eslint-disable-line

    // // dateAxis.start = 0.79;
    // dateAxis.keepSelection = true
  }

  buildCursor(options) {
    // Make a panning cursor
    const cursor = new am4charts.XYCursor();
    cursor.behavior = "panXY";
    cursor.xAxis = this.dateAxis;
    cursor.snapToSeries = this.series;

    this.chart.cursor = cursor;
  }

  buildLegend(options) {
    this.chart.legend = new am4charts.Legend();
  }

  buildScrollbars(options) {
    // Create vertical scrollbar and place it before the value axis
    this.chart.scrollbarY = new am4core.Scrollbar();
    this.chart.scrollbarY.parent = this.chart.leftAxesContainer;
    this.chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    this.chart.scrollbarX = new am4charts.XYChartScrollbar();
    // this.chart.scrollbarX.series.push(this.series[0]);
    this.chart.scrollbarX.parent = this.chart.bottomAxesContainer;
  }

  addSeries(field, options = {}) {
    // Create series
    // @see https://www.amcharts.com/docs/v4/reference/lineseries/
    const series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = field;
    series.name = options.name || field;
    // @see https://www.amcharts.com/docs/v4/reference/tooltip/#tooltipHTML_property
    series.tooltipHTML = "{dateX}: <strong>{valueY}</strong>";
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    if (options.bullet) {
      // Make bullets grow on hover
      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color("#fff");

      if (options.bullet.onHit) {
        bullet.events.on("hit", options.bullet.onHit, this);
      }

      const bullethover = bullet.states.create("hover");
      bullethover.properties.scale = 1.3;
    }

    return series;
  }

  addData() {
    this.chart.addData.apply(this.chart, arguments);
  }

  getData() {
    return this.chart.data;
  }

  getChart() {
    return this.chart;
  }
}

export default SunburstChart;

import React, { useRef, useEffect } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4plugins_sunburst from '@amcharts/amcharts4/plugins/sunburst' // eslint-disable-line

function SunburstChart ({ data }) {
  const chart = useRef(null)
  const chartId = 'chart'

  useEffect(() => {
    let currentlySelected

    const find = (searchData, target) => (target || []).reduce(
      (acc, obj) => acc.concat(obj.name === searchData ? obj : [],
        find(searchData, obj.children)),
      []
    )
    const findById = (searchData, target) => (target || []).reduce(
      (acc, obj) => acc.concat(obj.id === searchData ? obj : [],
        findById(searchData, obj.children)),
      []
    )

    function pickSlice (event) {
      if (event.target.dataItem.sunburstDataItem.children) {
        zoomOutButton.show()
        currentlySelected = event.target.dataItem.sunburstDataItem.properties.name
        const result = find(event.target.dataItem.sunburstDataItem.properties.name, data)
        sun.data = result
      }
    }

    function hasParent (node) {
      return node[0].parentId !== 'virtual'
    }

    function reset () {
      currentlySelected = ''
      zoomOutButton.hide()
      sun.data = data
    }

    function zoomOut () {
      const result = find(currentlySelected, data)
      let resultData
      if (hasParent(result)) {
        resultData = findById(result[0].parentId, data)
        currentlySelected = resultData[0].name
        sun.data = resultData
        if (!hasParent(result)) {
          reset()
        }
      } else {
        reset()
      }
    }
    const sun = am4core.create(chartId, am4plugins_sunburst.Sunburst)
    const zoomOutButton = sun.seriesContainer.createChild(am4core.ZoomOutButton)

    sun.data = data

    sun.padding(0, 0, 0, 0)
    sun.radius = am4core.percent(98)

    sun.fontSize = 11
    sun.innerRadius = am4core.percent(10)

    // define data fields
    sun.dataFields.value = 'value'
    sun.dataFields.name = 'name'
    sun.dataFields.children = 'children'

    // Thanks to https://colorbrewer2.org/ for creating a
    // colorblind-friendly palette.
    sun.colors.list = [
      am4core.color('#d73027'),
      am4core.color('#f46d43'),
      am4core.color('#fdae61'),
      am4core.color('#fee090'),
      am4core.color('#ffffbf'),
      am4core.color('#e0f3f8'),
      am4core.color('#abd9e9'),
      am4core.color('#74add1'),
      am4core.color('#4575b4'),
      am4core.color('#313695')
    ]

    const level0SeriesTemplate = new am4plugins_sunburst.SunburstSeries()
    level0SeriesTemplate.hiddenInLegend = false
    sun.seriesTemplates.setKey('0', level0SeriesTemplate)
    zoomOutButton.visible = false
    zoomOutButton.background.fill = am4core.color('#000')
    zoomOutButton.icon.stroke = am4core.color('#fff')
    zoomOutButton.background.states.getKey('hover').properties.fill = am4core.color('#676767')
    zoomOutButton.background.states.getKey('down').properties.fill = am4core.color('#d3d3d3')
    zoomOutButton.icon.strokeWidth = 2
    zoomOutButton.horizontalCenter = 'middle'
    zoomOutButton.verticalCenter = 'middle'
    zoomOutButton.events.on('hit', function () {
      zoomOut()
    })

    level0SeriesTemplate.slices.template.tooltipText = '{name} ({value}): {description}'
    level0SeriesTemplate.tooltip.label.wrap = true
    level0SeriesTemplate.tooltip.label.maxWidth = 550
    level0SeriesTemplate.tooltip.label.fontSize = 17

    // this makes labels to be hidden if they don't fit
    level0SeriesTemplate.labels.template.truncate = true
    level0SeriesTemplate.labels.template.fill = am4core.color('#000')
    level0SeriesTemplate.labels.template.hideOversized = true
    level0SeriesTemplate.labels.template.adapter.add(
      'rotation',
      function (rotation, target) {
        target.maxWidth =
          target.dataItem.slice.radius - target.dataItem.slice.innerRadius - 10
        target.maxHeight = Math.abs(
          ((target.dataItem.slice.arc *
            (target.dataItem.slice.innerRadius +
              target.dataItem.slice.radius)) /
            2) *
            am4core.math.RADIANS
        )

        return rotation
      }
    )

    level0SeriesTemplate.slices.template.events.on('hit', function (event) {
      pickSlice(event)
    })

    const level1SeriesTemplate = level0SeriesTemplate.clone()
    sun.seriesTemplates.setKey('1', level1SeriesTemplate)
    level1SeriesTemplate.fillOpacity = 1
    level1SeriesTemplate.hiddenInLegend = true

    const level2SeriesTemplate = level0SeriesTemplate.clone()
    sun.seriesTemplates.setKey('2', level2SeriesTemplate)
    level2SeriesTemplate.fillOpacity = 1
    level2SeriesTemplate.hiddenInLegend = true

    const level3SeriesTemplate = level0SeriesTemplate.clone()
    sun.seriesTemplates.setKey('3', level3SeriesTemplate)
    level3SeriesTemplate.fillOpacity = 1
    level3SeriesTemplate.hiddenInLegend = true
    sun.legend = new am4charts.Legend()
    sun.legend.maxHeight = 700
    sun.legend.scrollable = true
    sun.legend.truncate = true
    sun.legend.position = 'right'
    sun.legend.valign = 'top'

    chart.current = sun
    return () => {
      sun.dispose()
    }
  }, [data])

  return <div id={chartId} className='graph' />
}

export default SunburstChart

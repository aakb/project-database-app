
export function mapGanttData (data) {
  const initiativeTypeAndInitiative = data.filter(item => item.type === 'node--initiative' && item.attributes.time_period)
  return mapDataForGantt(initiativeTypeAndInitiative)
}

function mapDataForGantt (data) {
  data = data.map(function (item) {
    const title = item.attributes.title
    const fromDate = item.attributes.time_period.value
    const toDate = item.attributes.time_period.end_value
    return {
      name: title,
      fromDate: fromDate,
      toDate: toDate
    }
  })
  return data
}

export function getEndDateForXAxis () {
  var d = new Date()
  var year = d.getFullYear()
  var month = d.getMonth()
  var day = d.getDate()
  return new Date(year + 1, month, day)
}

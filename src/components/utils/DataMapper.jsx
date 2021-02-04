export function mapSunburstData (data, key) {
  const initiativeTypeAndInitiative = data.filter(item => item.type === 'node--initiative' || item.type === `taxonomy_term--${key}`)
  return mapData(initiativeTypeAndInitiative, key)
}

function mapData (data, key) {
  // Map the two types, "key" and initiative, so they are similar.
  data = data.map(function (item) {
    const initId = Array.isArray(item.relationships[key]?.data) ? item.relationships[key]?.data.map(item => item.id) : item.relationships[key]?.data?.id
    const name = item.attributes.title || item.attributes.name
    const relationshipId = item.relationships?.parent?.data[0]?.id
    const description = item.attributes?.description?.value
    return {
      description: description,
      name: name,
      id: item.id,
      value: 1, // Because the leaves should be weighted equally
      parentId: relationshipId || initId
    }
  })
  return nestData(data)
}

// Drupal/jsonapi: virtual
// https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/core-concepts#virtual
// the "virtual" resource identifier identifies the <root>  taxonomy term.
// As such, this signals that the referencing term is at the top level of its vocabulary."
const nestData = (dataArray, id = 'virtual') =>
  dataArray
    .filter(item => item.parentId === id || item?.parentId?.includes(id))
    .map(function (organisation) {
      const children = nestData(dataArray, organisation.id)
      const returnObject = children.length ? { ...organisation, children: children } : { ...organisation }
      return returnObject
    })

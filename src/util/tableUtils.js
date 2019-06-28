import { _uniq } from './lodashUtils'

export const getSorter = fieldName => (a, b) =>
  a[fieldName].localeCompare(b[fieldName])

export const getOnFilter = fieldName => (value, record) =>
  record[fieldName] === value

export const getFilters = fields =>
  fields.map(f => ({
    text: f,
    value: f,
  }))

export const getUniqFiltersFromFields = fields => getFilters(_uniq(fields))

export const getColumnsWithFilterAndSorter = ({ objects, columns }) =>
  columns.map(column => ({
    ...column,
    ...(!column.hasNoFilterOrSort && {
      filters: getUniqFiltersFromFields(objects.map(j => j[column.dataIndex])),
      onFilter: getOnFilter(column.dataIndex),
      sorter: getSorter(column.dataIndex),
    }),
  }))

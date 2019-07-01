/*
 *  Copyright 2019 Laguro, Inc. 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

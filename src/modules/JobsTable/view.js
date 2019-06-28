import React from 'react'
import {
  PROJECT_NAME_FIELD_NAME,
  PROJECT_CREATOR_FIELD_NAME,
  PROJECT_CATEGORY_FIELD_NAME,
} from '../../util/projectUtils'
import { InternalLink } from '../../util/linkUtils'
import { JOB_DETAILS_PAGE_URL_PREFIX } from '../../strings/urlStrings'
import { getUserName } from '../../util/userUtils'
import { Table } from 'antd'
import { GQL_OBJECT_DATE_CREATED_FIELD_NAME } from '../../util/gqlObjectUtils'
import { moment } from '../../util/libraryUtils'
import { _uniqBy, _get } from '../../util/lodashUtils'

const getUniqFilters = filters => _uniqBy(filters, 'text')
const getSorter = fieldName => (a, b) =>
  a[fieldName].localeCompare(b[fieldName])
const getOnFilter = fieldName => (value, record) =>
  record[fieldName].indexOf(value) === 0
const getFilters = ({ jobs, fieldName }) =>
  jobs.map(p => ({
    text: p[fieldName],
    value: p[fieldName],
  }))
const getUniqFiltersFromProjects = ({ jobs, fieldName }) =>
  getUniqFilters(getFilters({ jobs, fieldName }))

export const JobsTableView = ({ jobs }) => {
  const columns = [
    {
      title: 'Project name',
      dataIndex: PROJECT_NAME_FIELD_NAME,
      render: (projectName, project) => (
        <InternalLink
          to={`${JOB_DETAILS_PAGE_URL_PREFIX}/${_get(project, 'id')}`}
        >
          {projectName}
        </InternalLink>
      ),
      filters: getUniqFiltersFromProjects({
        jobs,
        fieldName: PROJECT_NAME_FIELD_NAME,
      }),
      onFilter: getOnFilter(PROJECT_NAME_FIELD_NAME),
      sorter: getSorter(PROJECT_NAME_FIELD_NAME),
    },
    {
      title: 'Date started',
      dataIndex: GQL_OBJECT_DATE_CREATED_FIELD_NAME,
      render: dateCreated => moment(dateCreated).format('L'),
      sorter: getSorter(GQL_OBJECT_DATE_CREATED_FIELD_NAME),
      filters: getUniqFilters(
        jobs
          .map(p => moment(p[GQL_OBJECT_DATE_CREATED_FIELD_NAME]).format('L'))
          .map(date => ({
            text: date,
            value: date,
          })),
      ),
      onFilter: (value, record) =>
        moment(record[GQL_OBJECT_DATE_CREATED_FIELD_NAME])
          .format('L')
          .indexOf(value) === 0,
    },
    {
      title: 'Category',
      dataIndex: PROJECT_CATEGORY_FIELD_NAME,
      render: category => category,
      sorter: getSorter(PROJECT_CATEGORY_FIELD_NAME),
      filters: getUniqFiltersFromProjects({
        jobs,
        fieldName: PROJECT_CATEGORY_FIELD_NAME,
      }),
      onFilter: (value, record) =>
        record[PROJECT_CATEGORY_FIELD_NAME].indexOf(value) === 0,
    },

    {
      title: 'Creator name',
      dataIndex: PROJECT_CREATOR_FIELD_NAME,
      render: creator => getUserName(creator),
      sorter: (a, b) =>
        getUserName(a[PROJECT_CREATOR_FIELD_NAME]).localeCompare(
          getUserName(b[PROJECT_CREATOR_FIELD_NAME]),
        ),
      filters: getUniqFilters(
        jobs.map(p => ({
          text: getUserName(p[PROJECT_CREATOR_FIELD_NAME]),
          value: getUserName(p[PROJECT_CREATOR_FIELD_NAME]),
        })),
      ),
      onFilter: (value, record) =>
        getUserName(record[PROJECT_CREATOR_FIELD_NAME]).indexOf(value) === 0,
    },
  ]
  return <Table pagination={false} columns={columns} dataSource={jobs} />
}

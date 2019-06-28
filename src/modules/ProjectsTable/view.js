import React from 'react'
import {
  PROJECT_NAME_FIELD_NAME,
  PROJECT_CREATOR_FIELD_NAME,
  PROJECT_CATEGORY_FIELD_NAME,
  Project,
} from '../../util/projectUtils'
import { getUserName } from '../../util/userUtils'
import { Table, Button, Popconfirm } from 'antd'
import {
  getIdFromGqlObject,
  GQL_OBJECT_DATE_CREATED_FIELD_NAME,
} from '../../util/gqlObjectUtils'
import { moment } from '../../util/libraryUtils'
import { _uniqBy } from '../../util/lodashUtils'
import { Box } from '../../components/Box'
import { Text } from '../../components/Text'
import { Flex } from '../../components/Flex'

const getUniqFilters = filters => _uniqBy(filters, 'text')
const getSorter = fieldName => (a, b) =>
  a[fieldName].localeCompare(b[fieldName])
const getOnFilter = fieldName => (value, record) =>
  record[fieldName].indexOf(value) === 0
const getFilters = ({ projects, fieldName }) =>
  projects.map(p => ({
    text: p[fieldName],
    value: p[fieldName],
  }))
const getUniqFiltersFromProjects = ({ projects, fieldName }) =>
  getUniqFilters(getFilters({ projects, fieldName }))

export const ProjectsTableView = ({ projects, ...props }) => {
  const columns = [
    {
      title: 'Project name',
      dataIndex: PROJECT_NAME_FIELD_NAME,
      render: (projectName, project) => (
        <Box
          onClick={() =>
            props.handleProjectNameClick(getIdFromGqlObject(project))
          }
        >
          <Text color="cornflowerblue">{projectName}</Text>
        </Box>
      ),
      filters: getUniqFiltersFromProjects({
        projects,
        fieldName: PROJECT_NAME_FIELD_NAME,
      }),
      onFilter: getOnFilter(PROJECT_NAME_FIELD_NAME),
      sorter: getSorter(PROJECT_NAME_FIELD_NAME),
    },
    {
      title: 'Date created',
      dataIndex: GQL_OBJECT_DATE_CREATED_FIELD_NAME,
      render: dateCreated => moment(dateCreated).format('L'),
      sorter: getSorter(GQL_OBJECT_DATE_CREATED_FIELD_NAME),
      filters: getUniqFilters(
        projects
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
        projects,
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
        projects.map(p => ({
          text: getUserName(p[PROJECT_CREATOR_FIELD_NAME]),
          value: getUserName(p[PROJECT_CREATOR_FIELD_NAME]),
        })),
      ),
      onFilter: (value, record) =>
        getUserName(record[PROJECT_CREATOR_FIELD_NAME]).indexOf(value) === 0,
    },
    {
      title: 'Actions',
      dataIndex: '',
      render: (_, proj) => {
        const project = new Project(proj)
        return (
          <Flex>
            <Box mr={8}>
              <Button>Duplicate</Button>
            </Box>
            <Popconfirm
              title="Are you sure you want to delete this project?"
              onConfirm={() => props.handleDeleteProject(project.getId())}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
          </Flex>
        )
      },
    },
  ]
  return <Table pagination={false} columns={columns} dataSource={projects} />
}

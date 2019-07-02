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
import React from 'react';
import {
  PROJECT_NAME_FIELD_NAME,
  PROJECT_CREATOR_FIELD_NAME,
  PROJECT_CATEGORY_FIELD_NAME,
  Project,
} from '../../util/projectUtils';
import { getUserName } from '../../util/userUtils';
import { Table, Button, Popconfirm, Icon, message } from 'antd';
import moment from 'moment';
import { GQL_OBJECT_DATE_CREATED_FIELD_NAME } from '../../util/gqlObjectUtils';
import { _uniqBy } from '../../util/lodashUtils';
import { Box } from '../../components/Box';
import { Flex } from '../../components/Flex';
import {
  getUrlWithId,
  PROJECT_DASHBOARD_PAGE_URL_PREFIX,
} from '../../strings/urlStrings';
import { Link, BlueLink } from '../../components/Link';

const getUniqFilters = filters => _uniqBy(filters, 'text');
const getSorter = fieldName => (a, b) =>
  a[fieldName].localeCompare(b[fieldName]);
const getOnFilter = fieldName => (value, record) =>
  record[fieldName].indexOf(value) === 0;
const getFilters = ({ projects, fieldName }) =>
  projects.map(p => ({
    text: p[fieldName],
    value: p[fieldName],
  }));
const getUniqFiltersFromProjects = ({ projects, fieldName }) =>
  getUniqFilters(getFilters({ projects, fieldName }));

export const ProjectTableView = ({ projects, ...props }) => {
  const columns = [
    {
      title: 'Project name',
      dataIndex: PROJECT_NAME_FIELD_NAME,
      render: (projectName, project) => {
        const projectObject = new Project(project);
        return (
          <BlueLink
            to={getUrlWithId({
              prefix: PROJECT_DASHBOARD_PAGE_URL_PREFIX,
              id: projectObject.getId(),
            })}
          >
            {projectName}
          </BlueLink>
        );
      },
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
        const project = new Project(proj);
        return (
          <Flex>
            <Box mr={6}>
              <Link
                to={getUrlWithId({
                  prefix: PROJECT_DASHBOARD_PAGE_URL_PREFIX,
                  id: project.getId(),
                })}
              >
                <Button>
                  <Icon type="info-circle" />
                </Button>
              </Link>
            </Box>
            <Box mr={6}>
              <Popconfirm
                title="Are you sure you want to duplicate this project?"
                onConfirm={() =>
                  props.handleDuplicateProject({
                    values: { projectId: project.getId() },
                    onSuccess: () =>
                      message.success('Project successfully duplicated!'),
                  })
                }
                okText="Yes"
                cancelText="No"
              >
                <Button
                  loading={props.getDuplicateProjectIsLoading(project.getId())}
                  icon="copy"
                ></Button>
              </Popconfirm>
            </Box>
            <Popconfirm
              title="Are you sure you want to end this project?"
              onConfirm={() =>
                props.handleDeleteProject({
                  values: { projectId: project.getId() },
                  onSuccess: () =>
                    message.success('Project successfully terminated!'),
                })
              }
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];
  return <Table pagination={false} columns={columns} dataSource={projects} />;
};

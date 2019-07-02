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
import { Box } from '../../components/Box';
import { H2, P2, H3 } from '../../helperModules/Texts';
import { ClickableContainer } from '../../components/ClickableContainer';
import { Icon, List, Button, Popconfirm, message } from 'antd';
import { _isEmpty } from '../../util/lodashUtils';
import ProjectForm from '../../modules/ProjectForm';
import { Flex } from '../../components/Flex';
import { ProjectJobsTable } from '../../modules/ProjectJobsTable';
import { Block } from '../../components/Block';
import { ALL_PROJECTS_DASHBOARD_PAGE_URL } from '../../strings/urlStrings';
import { redirect } from '../../util/redirectUtils';
import { Modal } from '../../components/Modal';
import { TopContributorList } from '../../modules/TopContributorList';

export const ProjectDashboardPageView = props => (
  <Box>
    <ClickableContainer>
      <P2>
        <Flex alignItems="center">
          <Icon type="arrow-left" />
          <Box
            onClick={() => redirect({ url: ALL_PROJECTS_DASHBOARD_PAGE_URL })}
            ml={5}
          >
            Back to all projects
          </Box>
        </Flex>
      </P2>
    </ClickableContainer>
    <H2 mr={5}>
      {`Project dashboard: ${props.project.getName()}`}
      <ClickableContainer
        ml={14}
        is="span"
        fontSize={18}
        color="cornflowerblue"
        onClick={props.handleEditClick}
      >
        Edit
      </ClickableContainer>
    </H2>
    <Modal
      onCancel={props.handleModalCancel}
      width={620}
      visible={props.projectFormModalIsVisible}
      destroyOnClose
      footer={null}
    >
      <H3>Edit project details</H3>
      {!_isEmpty(props.projectForForm) && (
        <ProjectForm
          data={props.projectForForm}
          onSubmit={props.handleSubmit}
        />
      )}
    </Modal>
    <Block>
      <Flex justifyContent="space-between">
        <H3>All jobs for this project</H3>
        <Popconfirm
          title="Are you sure you want to start a new job for this project?"
          onConfirm={() =>
            props.handlestartNewJobForProject({
              onSuccess: () => {
                message.success(
                  'A new job successfully created for this project!',
                );
              },
            })
          }
          okText="Yes"
          cancelText="No"
        >
          <Button loading={props.startNewJobForProjectIsLoading} icon="plus">
            Start new job
          </Button>
        </Popconfirm>
      </Flex>
      <ProjectJobsTable
        handleViewDetails={props.showJobDetailsModal}
        handleEndJob={props.handleEndJob}
        getEndJobForProjectIsLoading={props.getEndJobForProjectIsLoading}
        jobs={props.jobs}
      />
      <Modal
        onCancel={props.handleJobDetailsModalCancel}
        width={620}
        visible={props.jobDetailsModalIsVisible}
      >
        <H3>Top contributors</H3>
        <TopContributorList
          data={props.jobForJobDetailsModal.topContributors}
        />
      </Modal>
    </Block>
    <Block>
      <H3>Top contributors for this project</H3>
      <TopContributorList data={props.project.getTopContributors()} />
    </Block>
  </Box>
);

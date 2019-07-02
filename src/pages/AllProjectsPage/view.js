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
import React, { Fragment } from 'react';
import { Modal, Button, Icon } from 'antd';
import { CreateProject } from '../../modules/CreateProject';
import { Flex } from '../../components/Flex';
import { ProjectTable } from '../../modules/ProjectTable';
import { H3 } from '../../helperModules/Texts';

export const AllProjectsPageView = props => {
  return (
    <Fragment>
      <Flex justifyContent="space-between">
        <H3>All projects</H3>
        <Button onClick={props.showCreateProjectModal}>
          <Icon type="plus" />
          New project
        </Button>
      </Flex>
      <Modal
        onCancel={props.hideCreateProjectModal}
        width={620}
        visible={props.createProjectModalIsVisible}
        destroyOnClose
        footer={null}
      >
        <CreateProject
          onSuccess={async () => {
            await props.hideCreateProjectModal();
            await props.refetchProjects();
          }}
        />
      </Modal>
      <ProjectTable
        projects={props.projects}
        handleDeleteProject={props.handleDeleteProject}
        handleDuplicateProject={props.handleDuplicateProject}
        getDuplicateProjectIsLoading={props.getDuplicateProjectIsLoading}
      />
    </Fragment>
  );
};

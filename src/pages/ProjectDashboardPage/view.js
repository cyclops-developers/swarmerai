import React from 'react';
import { Box } from '../../components/Box';
import { H2, P1, H3 } from '../../helperModules/Texts';
import { ClickableContainer } from '../../components/ClickableContainer';
import { Modal, Icon, List, Button, Popconfirm } from 'antd';
import { _isEmpty } from '../../util/lodashUtils';
import ProjectForm from '../../modules/ProjectForm';
import { Flex } from '../../components/Flex';
import { ProjectJobsTable } from '../../modules/ProjectJobsTable';
import { Block } from '../../components/Block';
import { ALL_PROJECTS_DASHBOARD_PAGE_URL } from '../../strings/urlStrings';
import { redirect } from '../../util/redirectUtils';

export const ProjectDashboardPageView = props => (
  <Box>
    <ClickableContainer>
      <P1>
        <Flex alignItems="center">
          <Icon type="arrow-left" />
          <Box
            onClick={() => redirect({ url: ALL_PROJECTS_DASHBOARD_PAGE_URL })}
            ml={5}
          >
            Back to all projects
          </Box>
        </Flex>
      </P1>
    </ClickableContainer>
    <H2 mr={5}>
      {props.project.getName()}
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
          title="Are you sure you want to duplicate this project?"
          onConfirm={() => props.handleStartProject()}
          okText="Yes"
          cancelText="No"
        >
          <Button>Start new job</Button>
        </Popconfirm>
      </Flex>
      <ProjectJobsTable
        handleViewDetails={props.showJobDetailsModal}
        jobs={props.jobs}
      />
      <Modal
        onCancel={props.handleJobDetailsModalCancel}
        width={620}
        visible={props.jobDetailsModalIsVisible}
        destroyOnClose
        footer={null}
      >
        <List
          bordered
          dataSource={props.jobForJobDetailsModal.topContributors}
          renderItem={item => (
            <List.Item>
              {`${props.jobForJobDetailsModal.topContributors.indexOf(item) +
                1}. ${item}`}
            </List.Item>
          )}
        ></List>
      </Modal>
    </Block>
    <Block>
      <H3>Top contributors for this project</H3>
      <List
        bordered
        dataSource={props.project.getTopContributors()}
        renderItem={item => (
          <List.Item>
            {`${props.project.getTopContributors().indexOf(item) + 1}. ${item}`}
          </List.Item>
        )}
      ></List>
    </Block>
  </Box>
);

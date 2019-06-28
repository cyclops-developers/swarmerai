import React, { Fragment } from 'react'
import { Modal, Button } from 'antd'
import { CreateProject } from '../../modules/CreateProject'
import { Flex } from '../../components/Flex'
import { ProjectTable } from '../../modules/ProjectTable'
import { H3 } from '../../helperModules/Texts'

export const AllProjectsPageView = props => {
  return (
    <Fragment>
      <Flex justifyContent="space-between">
        <H3>All projects</H3>
        <Button onClick={props.showCreateProjectModal}>
          Create new project
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
            await props.hideCreateProjectModal()
            await props.refetchProjects()
          }}
        />
      </Modal>
      <ProjectTable
        handleProjectNameClick={props.handleProjectNameClick}
        projects={props.projects}
        handleDeleteProject={props.handleDeleteProject}
        handleDuplicateProject={props.handleDuplicateProject}
      />
    </Fragment>
  )
}

import React, { Component } from 'react'
import {
  ProjectForm,
  CATEGORY_FIELD_NAME,
  NAME_FIELD_NAME,
} from '../../modules/ProjectForm'
import { Box } from '../../components/Box'
import { H2, P1, P1Strong } from '../../helperModules/Texts'
import { Flex } from '../../components/Flex'
import { Button } from 'antd'

class ProjectPage extends Component {
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.location.key !== nextProps.location.key) {
  //     this.props.projectsQuery.refetch()
  //   }
  // }

  handleSubmit = () => {}

  render() {
    const project = {
      [NAME_FIELD_NAME]: 'Tooth detection phase 1',
      [CATEGORY_FIELD_NAME]: 'Tooth number detection',
    }
    return (
      <Box>
        <H2>{project[NAME_FIELD_NAME]}</H2>
        <Flex mb={10}>
          <P1Strong mr={6}> Current job ID: </P1Strong>
          <P1 mr={6}>125125125125125</P1>
        </Flex>
        <Flex mb={28}>
          <Box mr={6}>
            <Button>Start job</Button>
          </Box>
          <Button type="danger"> Stop job</Button>
        </Flex>
        <Box mb={15}>
          <ProjectForm
            data={project}
            onSubmit={this.handleSubmit}
          ></ProjectForm>
        </Box>
        <Flex justifyContent="center">
          <Button type="danger">Delete project</Button>
        </Flex>
      </Box>
    )
  }
}

export default ProjectPage

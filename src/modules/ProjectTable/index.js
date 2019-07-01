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
import React from 'react'
import { ProjectTableView } from './view'

class ProjectTable extends React.Component {
  render() {
    return (
      <ProjectTableView
        projects={this.props.projects}
        handleProjectNameClick={this.props.handleProjectNameClick}
        handleDeleteProject={this.props.handleDeleteProject}
        handleDuplicateProject={this.props.handleDuplicateProject}
      />
    )
  }
}

export { ProjectTable }

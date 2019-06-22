import React from 'react'
import { ProjectsTableView } from './view'
import { adopt } from 'react-adopt'
import { GET_PROJECTS_ENDPOINT_NAME, GET_PROJECTS_QUERY } from './queries'
import { Query } from 'react-apollo'
import moment from 'moment'
import { getDataFromReactAdoptProps } from '../../util/gqlUtils'

const Composed = adopt({
  [GET_PROJECTS_ENDPOINT_NAME]: ({ render }) => (
    <Query query={GET_PROJECTS_QUERY}>{render}</Query>
  ),
})

class ProjectsTable extends React.Component {
  render() {
    return (
      <Composed>
        {props => (
          <ProjectsTableView
            // projects={getDataFromReactAdoptProps({
            //   props,
            //   endpointName: GET_PROJECTS_ENDPOINT_NAME,
            // })}
            projects={[
              {
                id: '1',
                name: 'here',
                category: '5h125ello',
                dateCreated: moment()
                  .subtract(3, 'day')
                  .format(),
                creator: { name: '1Magic creator' },
              },
              {
                id: '2',
                name: 'here',
                category: 'tooth',
                dateCreated: moment().format(),
                creator: { name: '1Magic creator' },
              },
              {
                id: '3',
                name: '3helaw25lo',
                category: 'tooth',
                dateCreated: moment().format(),
                creator: { name: '3Magic creator' },
              },
              {
                id: '4',
                name: '4hellaw25o',
                category: '2hel1251lo',
                dateCreated: moment().format(),
                creator: { name: '4Magic creator' },
              },
              {
                id: '5',
                name: '5he125llo',
                category: '1hello',
                dateCreated: moment().format(),
                creator: { name: '5Magic creator' },
              },
            ]}
          />
        )}
      </Composed>
    )
  }
}

export { ProjectsTable }

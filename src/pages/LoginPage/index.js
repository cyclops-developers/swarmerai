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
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { AUTH_TOKEN } from '../../constant'
import { LoginPageView } from './view'
import { adopt } from 'react-adopt'
import { LOGIN_ENDPOINT_NAME, LOGIN_MUTATION } from './queries'
import { Mutation } from 'react-apollo'
import { GqlEndpointsHelper, getHandleBackendCall } from '../../util/gqlUtils'
import { redirect } from '../../util/redirectUtils'
import { ALL_JOBS_PAGE_URL } from '../../strings/urlStrings'
import { H3 } from '../../helperModules/Texts'

const Composed = adopt({
  [LOGIN_ENDPOINT_NAME]: ({ render }) => (
    <Mutation mutation={LOGIN_MUTATION}>{render}</Mutation>
  ),
})

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <Composed>
        {props => {
          const gqlEndpointsHelper = new GqlEndpointsHelper(props)

          const handleSubmit = getHandleBackendCall({
            backendCall: async args => {
              const { email, password } = args
              const login = gqlEndpointsHelper.get(LOGIN_ENDPOINT_NAME)

              const result = await login({
                variables: {
                  email,
                  password,
                },
              })

              const token = result.data.login.token

              if (token) {
                localStorage.setItem(
                  'user',
                  JSON.stringify(result.data.login.user),
                )

                this.props.refreshTokenFn &&
                  this.props.refreshTokenFn({
                    [AUTH_TOKEN]: token,
                  })

                redirect({ url: ALL_JOBS_PAGE_URL })
              }
            },
          })

          if (this.props.hasUser) {
            return <H3>You are already logged in.</H3>
          } else {
            return <LoginPageView onSubmit={handleSubmit} />
          }
        }}
      </Composed>
    )
  }
}

export default withRouter(LoginPage)

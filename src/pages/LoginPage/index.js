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

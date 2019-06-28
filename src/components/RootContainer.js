import React, { Component, Fragment } from 'react'
import { Link, Router, Route, Switch, Redirect } from 'react-router-dom'
import history from '../history'
import { ThemeProvider } from 'styled-components'
import AllProjectsPage from '../pages/AllProjectsPage'
import SignupPage from './SignupPage'
import TaskPage from '../pages/TaskPage'
import JobsPage from '../pages/JobsPage'
import JobDetailPage from '../pages/JobDetailPage'
import PageNotFound from './PageNotFound'
import { AUTH_TOKEN } from '../constant'
import { isTokenExpired } from '../helper/jwtHelper'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import 'antd/dist/antd.css'
import theme from '../theme'
import Header from '../modules/Header'
import { Container } from './Container'
import ProjectDashboardPage from '../pages/ProjectDashboardPage'
import LoginPage from '../pages/LoginPage'
import {
  ALL_JOBS_PAGE_URL,
  ALL_PROJECTS_DASHBOARD_PAGE_URL,
} from '../strings/urlStrings'
import { _isNull } from '../util/lodashUtils'

const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Route {...rest} render={matchProps => <Component {...matchProps} />} />
  ) : (
    <Redirect to="/login" />
  )
}

class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.refreshTokenFn = this.refreshTokenFn.bind(this)

    this.state = {
      token: props.token,
    }
  }

  refreshTokenFn(data = {}) {
    const token = data[AUTH_TOKEN]

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
    } else {
      localStorage.removeItem(AUTH_TOKEN)
    }

    this.setState({
      token: data[AUTH_TOKEN],
    })
  }

  bootStrapData() {
    try {
      const token = localStorage.getItem(AUTH_TOKEN)
      if (token !== null && token !== undefined) {
        const expired = isTokenExpired(token)
        if (!expired) {
          this.setState({ token: token })
        } else {
          localStorage.removeItem(AUTH_TOKEN)
          this.setState({ token: null })
        }
      }
    } catch (e) {
      console.log('')
    }
  }

  //verify localStorage check
  componentDidMount() {
    this.bootStrapData()
  }

  render() {
    return (
      <Router history={history}>
        <Fragment>
          {/* {this.renderNavBar()} */}
          {this.renderRoute()}
        </Fragment>
      </Router>
    )
  }

  renderNavBar() {
    return (
      <nav className="pa3 pa4-ns">
        {this.state.token ? (
          <div
            onClick={() => {
              this.refreshTokenFn &&
                this.refreshTokenFn({
                  [AUTH_TOKEN]: null,
                })
              window.location.href = '/'
            }}
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            Logout
          </div>
        ) : (
          <Link
            to="/login"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            Login
          </Link>
        )}
      </nav>
    )
  }

  renderRoute() {
    const hasUser = !_isNull(this.state.token)
    return (
      <div className="fl w-100">
        <ThemeProvider theme={theme}>
          <div>
            <Header
              mb={30}
              token={this.state.token}
              refreshTokenFn={this.refreshTokenFn}
            />
            <Container>
              <Switch>
                <Route
                  token={this.state.token}
                  path={'/login'}
                  render={props => (
                    <LoginPage
                      refreshTokenFn={this.refreshTokenFn}
                      hasUser={hasUser}
                      {...props}
                    />
                  )}
                  exact
                />
                <ProtectedRoute
                  token={this.state.token}
                  path={ALL_PROJECTS_DASHBOARD_PAGE_URL}
                  component={AllProjectsPage}
                />
                <ProtectedRoute
                  token={this.state.token}
                  path={['/', ALL_JOBS_PAGE_URL]}
                  component={JobsPage}
                />
                <ProtectedRoute
                  token={this.state.token}
                  path="/job/:jobId"
                  component={JobDetailPage}
                />
                <ProtectedRoute
                  token={this.state.token}
                  path="/task/:jobId"
                  component={TaskPage}
                />
                <ProtectedRoute
                  token={this.state.token}
                  path="/project/:id"
                  component={ProjectDashboardPage}
                />
                <Route
                  token={this.state.token}
                  path="/signup"
                  render={props => (
                    <SignupPage refreshTokenFn={this.refreshTokenFn} />
                  )}
                />
                <Route component={PageNotFound} />
              </Switch>
            </Container>
          </div>
        </ThemeProvider>
      </div>
    )
  }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
    }
  }
`

export default graphql(ME_QUERY, {
  options: {
    errorPolicy: 'all',
  },
})(RootContainer)

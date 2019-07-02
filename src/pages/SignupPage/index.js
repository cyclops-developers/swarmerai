import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignupPageView } from './view';
import { adopt } from 'react-adopt';
import { SIGNUP_ENDPOINT_NAME, SIGNUP_MUTATION } from './queries';
import { Mutation } from 'react-apollo';
import { GqlEndpointsHelper, getHandleBackendCall } from '../../util/gqlUtils';
import { login } from '../../util/authUtils';

const Composed = adopt({
  [SIGNUP_ENDPOINT_NAME]: ({ render }) => (
    <Mutation mutation={SIGNUP_MUTATION}>{render}</Mutation>
  ),
});

class SignupPage extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <Composed>
        {props => {
          const gqlEndpointsHelper = new GqlEndpointsHelper(props);

          const handleSubmit = getHandleBackendCall({
            backendCall: async args => {
              const { email, name, password } = args;

              const signup = gqlEndpointsHelper.get(SIGNUP_ENDPOINT_NAME);

              const result = await signup({
                variables: {
                  name,
                  email,
                  password,
                },
              });
              login({
                signupOrLoginObject: result.data.signup,
                refreshTokenFn: this.props.refreshTokenFn,
              });
            },
          });

          return <SignupPageView onSubmit={handleSubmit} />;
        }}
      </Composed>
    );
  }
}

export default withRouter(SignupPage);

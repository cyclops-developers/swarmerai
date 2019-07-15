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

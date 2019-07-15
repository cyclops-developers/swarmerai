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
import _get from 'lodash/get';
import { message } from 'antd';

// returns executionHasNoError
export const execute = async ({
  action,
  onError = () => {},
  errorMessages = {}, //  errorMessages  provide mapping between backend error messages and frontend error messages
}) => {
  try {
    await action();
    return true;
  } catch (error) {
    onError(error);

    const gqlError =
      _get(error, 'networkError.result.result.errors[0].message') ||
      _get(error, 'graphQLErrors[0].message') ||
      _get(error, 'message');

    if (errorMessages.hasOwnProperty(gqlError)) {
      message.error(errorMessages[gqlError]);
      return false;
    }

    if (error.message.includes('name = email')) {
      message.error('Email already exist');

      return false;
    }

    message.error(gqlError);
    return false;
  }
};

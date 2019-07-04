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
import { AUTH_TOKEN } from '../constant';
import { redirect } from './redirectUtils';
import { ALL_JOBS_PAGE_URL } from '../strings/urlStrings';

export const getUser = () => {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
    return user;
  }

  return null;
};

export const login = ({ signupOrLoginObject, refreshTokenFn }) => {
  const { token, user } = signupOrLoginObject;
  if (token) {
    localStorage.setItem('user', JSON.stringify(user));

    refreshTokenFn({
      [AUTH_TOKEN]: token,
    });

    redirect({ url: ALL_JOBS_PAGE_URL });
  }
};

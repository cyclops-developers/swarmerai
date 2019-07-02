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
import React from 'react';
import { withRouter } from 'react-router-dom';

const LogoutPage = () => (
  <div className="pa4 flex justify-center bg-white">
    <form>
      <h1>You are currently logged out. To see the projects, please login.</h1>
    </form>
  </div>
);

export default withRouter(LogoutPage);

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

import React, { Fragment } from 'react';
import { _isEmpty } from '../../util/lodashUtils';
import { P3, P3Strong } from '../../helperModules/Texts';

export const Details = props => (
  <Fragment>
    {props.data
      .filter(deet => !_isEmpty(deet.data))
      .map(deet => (
        <P3 fontSize={3}>
          <P3Strong is="span" mr={5}>{`${deet.text}:`}</P3Strong>
          {deet.data}
        </P3>
      ))}
  </Fragment>
);

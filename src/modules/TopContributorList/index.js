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
import { List } from 'antd';
import { Flex } from '../../components/Flex';
import { Text } from '../../components/Text';

export const TopContributorList = props => (
  <List
    bordered
    dataSource={props.data || []}
    renderItem={item => (
      <List.Item>
        <Flex width="100%" justifyContent="space-between">
          <Text>{`${props.data.indexOf(item) + 1}. ${item.user.name}`}</Text>
          <Text>{`${item.total} tasks`}</Text>
        </Flex>
      </List.Item>
    )}
  ></List>
);

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

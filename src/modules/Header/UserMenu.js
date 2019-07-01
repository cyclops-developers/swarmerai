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
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import { Text } from '../../components/Text';
import { Flex } from '../../components/Flex';
import { getUser } from '../../util/authUtils';
import { getUserName } from '../../util/userUtils';
import { ClickableContainer } from '../../components/ClickableContainer';

const UserMenu = ({ logout }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={logout}>
        <Text>Logout</Text>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <ClickableContainer>
        <Flex alignItems="center">
          <Text
            mr={12}
            className="ant-dropdown-link"
            fontWeight="medium"
            color="white"
            style={{ cursor: 'pointer' }}
          >
            {getUserName(getUser())}
          </Text>
          <Icon type="down" style={{ 'margin-top': '-1px', color: 'white' }} />
        </Flex>
      </ClickableContainer>
    </Dropdown>
  );
};

UserMenu.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.string,
    group: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserMenu;

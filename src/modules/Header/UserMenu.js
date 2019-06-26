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

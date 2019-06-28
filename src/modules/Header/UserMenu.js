import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon } from 'antd'
import { Text } from '../../components/Text'
import { Flex } from '../../components/Flex'
import { getUser } from '../../util/authUtils'
import { getUserName } from '../../util/userUtils'

const UserMenu = ({ logout }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={logout}>
        <Text>Logout</Text>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Flex width={120} alignItems="center">
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
    </Dropdown>
  )
}

UserMenu.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.string,
    group: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  logout: PropTypes.func.isRequired,
}

export default UserMenu

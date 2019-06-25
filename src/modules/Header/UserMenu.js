import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon } from 'antd'
import { Text } from '../../components/Text'

const UserMenu = ({ user, logout }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={logout}>
        <Text>Logout</Text>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Text
        className="ant-dropdown-link"
        fontWeight="medium"
        color="text.darkGray"
        style={{ cursor: 'pointer' }}
      >
        Logged in as <Icon type="caret-down" />
      </Text>
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

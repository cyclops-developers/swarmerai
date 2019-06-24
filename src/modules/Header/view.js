/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import UserMenu from './UserMenu'
import { _isEmpty } from '../../util/lodashUtils'
import { Flex } from '../../components/Flex'
import { Link } from '../../components/Link'
import { Text } from '../../components/Text'
import { Container } from '../../components/Container'
import { AUTH_TOKEN } from '../../constant'
import { getUser } from '../../util/authUtils'

export const menuItems = {
  DentistManager: [
    // { path: USER_SEARCH_PAGE_FULL_URL, title: 'Users' },
    { path: '/123', title: 'Offices' },
  ],
  Claims: [{ path: '/claims', title: 'Claims' }],
  Xray: [{ path: '/xrays', title: 'Xrays' }],
  FrontDesk: [{ path: '/frontdesk', title: 'FrontDesk' }],
}

const Header = ({ isLoggedIn, user, mb, ...props }) => {
  // const logout = useCallback(() => {
  //   cookies.erase('user')
  //   window.location.href = '/'
  // }, [])

  const group = _get(user, 'group', null)

  return (
    <Flex
      is="header"
      justifyContent="space-between"
      alignItems="center"
      bg="#992200"
      width="100%"
      height={60}
      mb={mb}
    >
      <Container>
        <Flex alignItems="center">
          {/* <image alt="portal icon" mr={10} /> */}
          <Link to="/">
            <Text color="#ffffff" fontSize={4} fontWeight="bold">
              SwarmerAI
            </Text>
          </Link>

          <Flex ml={40}>
            {isLoggedIn &&
              !_isEmpty(group) &&
              group.map(
                role =>
                  menuItems[role] &&
                  menuItems[role].map(menu => (
                    <Link to={menu.path} key={menu.title}>
                      <Text mr={10} fontWeight="medium">
                        {menu.title}
                      </Text>
                    </Link>
                  )),
              )}
          </Flex>
        </Flex>
      </Container>

      <Flex>
        {props.token && (
          <UserMenu
            user={getUser()}
            logout={() => {
              props.refreshTokenFn({
                [AUTH_TOKEN]: null,
              })
              window.location.href = '/'
            }}
          />
        )}
      </Flex>
    </Flex>
  )
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    user: PropTypes.string,
    group: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default Header

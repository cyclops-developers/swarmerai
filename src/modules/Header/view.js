/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import UserMenu from './UserMenu'
import { Flex } from '../../components/Flex'
import { Link } from '../../components/Link'
import { Text } from '../../components/Text'
import { Container } from '../../components/Container'
import { AUTH_TOKEN } from '../../constant'
import { getUser } from '../../util/authUtils'
import Logo from '../../assets/logo.svg'

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`

const Header = ({ isLoggedIn, user, mb, ...props }) => {
  return (
    <Flex
      is="header"
      justifyContent="space-between"
      alignItems="center"
      bg="#000000"
      width="100%"
      height={55}
      mb={mb}
    >
      <Container>
        <Flex alignItems="center">
          <LogoLink to="/">
            <img
              height="28px"
              alt="logo icon"
              style={{ 'margin-right': '8px' }}
              src={Logo}
            />
            <Text is="span" color="#ffffff" fontSize={4} letterSpacing="0.45px">
              SWARMER
            </Text>
            <Text
              is="span"
              color="#ffffff"
              fontSize={4}
              fontWeight="900"
              letterSpacing="0.45px"
            >
              AI
            </Text>
          </LogoLink>
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

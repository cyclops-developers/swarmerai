/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from '../components/Text'

// eslint-disable-next-line
export const InternalLink = props => (
  <Link {...props}>
    <Text color="text.blue">{props.children}</Text>
  </Link>
)

import React from 'react'
import { Text } from '../components/Text'

export const H1 = props => (
  <Text mb={22} fontSize={30} {...props} fontWeight="bold" />
)

export const H2 = props => (
  <Text {...props} fontWeight="bold" fontSize={26} mb={20} />
)

export const H3 = props => (
  <Text {...props} fontSize={20} mb={10} fontWeight="medium" />
)

export const P1 = props => <Text fontSize={16} mb={10} {...props} />

export const P1Strong = props => (
  <Text fontSize={16} fontWeight="bold" mb={10} {...props} />
)

import React from 'react'
import { Text } from '../components/Text'

export const H1 = props => (
  <Text mb={5} fontSize={30} {...props} fontWeight="medium" />
)

export const H2 = props => (
  <Text {...props} fontWeight="700" fontSize={26} mb={20} />
)

export const H3 = props => (
  <Text {...props} fontSize={26} mb={10} fontWeight="medium" />
)

export const P1 = props => <Text fontSize={16} {...props} />

export const P1Strong = props => (
  <Text {...props} fontSize={16} fontWeight="bold" />
)

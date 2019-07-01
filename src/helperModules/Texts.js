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

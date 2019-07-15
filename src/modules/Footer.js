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
import { Link } from 'react-router-dom';

import { Flex } from '../components/Flex';
import { Text } from '../components/Text';

const Footer = () => (
  <Flex alignItems="center" justifyContent="center" bg="#000000" height={55}>
    <Link to="https://www.laguro.com/">
      <Text color="#ffffff">© Laguro, Inc</Text>
    </Link>
  </Flex>
);

export default Footer;

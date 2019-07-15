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
import { Button } from 'antd';
import { renderFields } from '../../helperModules/RenderField';
import { Flex } from '../../components/Flex';
import {
  FieldInput,
  FieldPasswordInput,
} from '../../helperModules/FieldComponents';
import { _capitalize } from '../../util/lodashUtils';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { BlueLink } from '../../components/Link';
import { LOG_IN_PAGE_URL } from '../../strings/urlStrings';
import { Chunk } from '../../components/Chunk';
import { H3 } from '../../helperModules/Texts';

const NAME_FIELD_NAME = 'name';
const EMAIL_FIELD_NAME = 'email';
const PASSWORD_FIELD_NAME = 'password';

const getFieldNameText = fieldName => _capitalize(fieldName);

const SignupPageViewComponent = () => {
  return (
    <Form>
      <Flex justifyContent="center">
        <Flex width={250} flexDirection="column">
          <H3 textAlign="center">Sign up</H3>
          {renderFields({
            fields: [
              {
                name: NAME_FIELD_NAME,
                component: FieldInput,
                required: true,
              },
              {
                name: EMAIL_FIELD_NAME,
                component: FieldInput,
                required: true,
              },
              {
                name: PASSWORD_FIELD_NAME,
                component: FieldPasswordInput,
                required: true,
              },
            ],
            getFieldNameTextFromFieldName: getFieldNameText,
          })}
          <Button htmlType="submit">Sign up</Button>
          <Chunk>
            <Flex justifyContent="center">
              <BlueLink to={LOG_IN_PAGE_URL}>Log in</BlueLink>
            </Flex>
          </Chunk>
        </Flex>
      </Flex>
    </Form>
  );
};

const SignUpSchema = Yup.object().shape({
  [EMAIL_FIELD_NAME]: Yup.string().email('Invalid email'),
});

export const SignupPageView = withFormik({
  mapPropsToValues: props => {
    const { data } = props;
    return { ...data };
  },
  handleSubmit: async (values, actions) => {
    await actions.props.onSubmit({ values });
    actions.setSubmitting(false);
  },
  validationSchema: SignUpSchema,
})(SignupPageViewComponent);

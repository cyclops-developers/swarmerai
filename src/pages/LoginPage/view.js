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
import { BlueLink } from '../../components/Link';
import { SIGN_UP_PAGE_URL } from '../../strings/urlStrings';
import { Chunk } from '../../components/Chunk';
import { H3 } from '../../helperModules/Texts';

const EMAIL_FIELD_NAME = 'email';
const PASSWORD_FIELD_NAME = 'password';

const getFieldNameText = fieldName => _capitalize(fieldName);

const LoginPageViewComponent = props => {
  return (
    <Form>
      <Flex justifyContent="center">
        <Flex width={250} flexDirection="column">
          <H3 textAlign="center">Log in</H3>
          {renderFields({
            fields: [
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
          <Button htmlType="submit">Log in</Button>
          <Chunk>
            <Flex justifyContent="center">
              <BlueLink to={SIGN_UP_PAGE_URL}>Sign up</BlueLink>
            </Flex>
          </Chunk>
        </Flex>
      </Flex>
    </Form>
  );
};

export const LoginPageView = withFormik({
  mapPropsToValues: props => {
    const { data } = props;
    return { ...data };
  },
  handleSubmit: async (values, actions) => {
    await actions.props.onSubmit({ values });
    actions.setSubmitting(false);
  },
})(LoginPageViewComponent);

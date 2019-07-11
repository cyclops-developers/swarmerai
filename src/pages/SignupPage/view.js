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

export const SignupPageView = withFormik({
  mapPropsToValues: props => {
    const { data } = props;
    return { ...data };
  },
  handleSubmit: async (values, actions) => {
    await actions.props.onSubmit({ values });
    actions.setSubmitting(false);
  },
})(SignupPageViewComponent);

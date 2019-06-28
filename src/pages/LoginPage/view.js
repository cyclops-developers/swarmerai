import React from 'react'
import { Button } from 'antd'
import { renderFields } from '../../helperModules/RenderField'
import { Flex } from '../../components/Flex'
import { FieldInput } from '../../helperModules/FieldComponents'
import { _capitalize } from '../../util/lodashUtils'
import { withFormik, Form } from 'formik'

const EMAIL_FIELD_NAME = 'email'
const PASSWORD_FIELD_NAME = 'password'

const getFieldNameText = fieldName => _capitalize(fieldName)

const LoginPageViewComponent = props => {
  return (
    <Form>
      <Flex justifyContent="center">
        <Flex width={250} flexDirection="column">
          {renderFields({
            fields: [
              {
                name: EMAIL_FIELD_NAME,
                component: FieldInput,
              },
              {
                name: PASSWORD_FIELD_NAME,
                component: FieldInput,
              },
            ],
            getFieldNameTextFromFieldName: getFieldNameText,
          })}
          <Button htmlType="submit">Log in</Button>

          <Flex justifyContent="center">
            <a href="/signup">Signup</a>
          </Flex>
        </Flex>
      </Flex>
    </Form>
  )
}

export const LoginPageView = withFormik({
  mapPropsToValues: props => {
    const { data } = props
    return { ...data }
  },
  handleSubmit: async (values, actions) => {
    await actions.props.onSubmit({ values })
    actions.setSubmitting(false)
  },
})(LoginPageViewComponent)

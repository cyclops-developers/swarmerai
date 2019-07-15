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
import _isUndefined from 'lodash/isUndefined'
import { Form } from 'antd';
import { Field } from 'formik'
import { Box } from '../components/Box'
import { Grid } from '../components/Grid'
import { Text } from '../components/Text'

const FormItem = Form.Item;

const renderField = ({ name, component: Component, gridColumn, getFieldNameText, ...props }) => (
  <Grid.Item gridColumn={gridColumn || '1/-1'}>
    <Box mb={22}>
      <Text fontSize={14} mb={5} fontWeight="700">
        {getFieldNameText(name)}
      </Text>
      <Field name={name}>
        {formikProps => { 
          const isTouched = formikProps.form.touched[name]
          const error = formikProps.form.errors[name]
          const hasTouchedError = isTouched && error
          
          return (
            <FormItem 
              help={hasTouchedError ? error : null}
              validateStatus={hasTouchedError ? 'error' : 'success'}
            >
              <Component {...formikProps} {...props} />
            </FormItem>
          )
        }}
      </Field>
    </Box>
  </Grid.Item>
)

export const renderFields = ({ fields, getFieldNameTextFromFieldName }) =>
  fields
    .filter(f => _isUndefined(f.onlyVisibleIf) || f.onlyVisibleIf)
    .map(field =>
      renderField({
        ...field,
        getFieldNameText: getFieldNameTextFromFieldName,
      }),
    )

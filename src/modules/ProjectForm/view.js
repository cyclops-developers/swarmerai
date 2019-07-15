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
import _isEmpty from 'lodash/isEmpty';
import _capitalize from 'lodash/capitalize';
import { Form, withFormik } from 'formik';
import { Button, message, AutoComplete } from 'antd';
import { Grid } from '../../components/Grid';
import { Flex } from '../../components/Flex';
import {
  FieldInput,
  FieldTextArea,
  FieldInputNumber,
  FieldLabelTypeRadioGroup,
  FieldIsLabelRepeatable,
  FieldLabelsSelect,
  MULTI_LABEL,
} from '../../helperModules/FieldComponents';
import { renderFields } from '../../helperModules/RenderField';
import {
  CLASSIFICATION_TYPE_FIELD_NAME,
  IS_CLASS_REPEATABLE_FIELD_NAME,
  QUESTION_FIELD_NAME,
  CLASSES_FIELD_NAME,
  NUM_VALIDATION_FIELD_NAME,
  DESCRIPTION_FIELD_NAME,
  NAME_FIELD_NAME,
  CATEGORY_FIELD_NAME,
  BUCKET_NAME_FIELD_NAME,
  IMAGE_WIDTH_FIELD_NAME,
  IMAGE_HEIGHT_FIELD_NAME,
} from '../../util/projectUtils';
import { _omit } from '../../util/lodashUtils';

const getFieldNameText = fieldName => _capitalize(fieldName.replace(/-/g, ' '));

const getFieldValue = ({ props, fieldName }) => {
  return props.values[fieldName];
};

class ProjectFormViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.FieldCategoryAutocomplete = ({ field, form }) => (
      <AutoComplete
        {...field}
        onChange={e => form.setFieldValue(field.name, e.valueOf())}
        onBlur={e => form.setFieldTouched(field.name)}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
        dataSource={this.props.categories}
      />
    );
  }

  render() {
    return (
      <Form>
        <Grid gridTemplateColumns={'auto auto'}>
          {renderFields({
            fields: [
              {
                name: CATEGORY_FIELD_NAME,
                component: FieldInput,
                required: true,
              },
              {
                name: NAME_FIELD_NAME,
                component: FieldInput,
                required: true,
              },
              {
                name: DESCRIPTION_FIELD_NAME,
                component: FieldTextArea,
                required: true,
              },
              {
                name: BUCKET_NAME_FIELD_NAME,
                component: FieldInput,
                required: true,
              },
              {
                name: IMAGE_WIDTH_FIELD_NAME,
                component: FieldInputNumber,
                gridColumn: '1/2',
                required: true,
              },
              {
                name: IMAGE_HEIGHT_FIELD_NAME,
                component: FieldInputNumber,
                gridColumn: '2/3',
                required: true,
              },
              {
                name: NUM_VALIDATION_FIELD_NAME,
                component: FieldInputNumber,
                required: true,
              },

              {
                name: QUESTION_FIELD_NAME,
                component: FieldInput,
                required: true,
              },
              {
                name: CLASSIFICATION_TYPE_FIELD_NAME,
                component: FieldLabelTypeRadioGroup,
                gridColumn: '1/2',
              },
              {
                name: IS_CLASS_REPEATABLE_FIELD_NAME,
                component: FieldIsLabelRepeatable,
                onlyVisibleIf:
                  getFieldValue({
                    props: this.props,
                    fieldName: CLASSIFICATION_TYPE_FIELD_NAME,
                  }) === MULTI_LABEL,
                gridColumn: '2/3',
              },
              {
                name: CLASSES_FIELD_NAME,
                component: FieldLabelsSelect,
                onlyVisibleIf:
                  getFieldValue({
                    props: this.props,
                    fieldName: CLASSIFICATION_TYPE_FIELD_NAME,
                  }) === MULTI_LABEL,
                required: true,
              },
            ],
            getFieldNameTextFromFieldName: getFieldNameText,
          })}
        </Grid>

        <Flex width="100%" justifyContent="center" mt={28}>
          <Button
            htmlType="submit"
            loading={this.props.isSubmitting}
            width={329}
            height={50}
          >
            Save
          </Button>
        </Flex>
      </Form>
    );
  }
}

export const ProjectFormView = withFormik({
  mapPropsToValues: props => {
    const { data } = props;
    return {
      ...data,
      categories: props.categories,
      [CLASSIFICATION_TYPE_FIELD_NAME]: MULTI_LABEL,
      [IS_CLASS_REPEATABLE_FIELD_NAME]: true,
    };
  },
  handleSubmit: async (values, actions) => {
    await actions.props.onSubmit({
      values: _omit(values, 'categories'),
      onSuccess: async () => message.success('Project successfully saved!'),
    });
    actions.setSubmitting(false);
  },
})(ProjectFormViewComponent);

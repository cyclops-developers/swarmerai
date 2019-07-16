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
import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _capitalize from 'lodash/capitalize';
import { Form, withFormik } from 'formik';
import { Button, message } from 'antd';
import _get from 'lodash/get';
import { withApollo } from 'react-apollo';

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
import { GET_IMAGE_URLS } from './queries';

const getFieldNameText = fieldName => _capitalize(fieldName.replace(/-/g, ' '));

const getFieldValue = ({ props, fieldName }) => {
  return props.values[fieldName];
};

let ProjectFormViewComponent = props => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingImageUrls, setLoadingImageUrl] = useState(false);
  const [bucketName, setBucketName] = useState(
    _get(props, `values.${BUCKET_NAME_FIELD_NAME}`, ''),
  );

  useEffect(() => {
    const getImageUrls = async bucketName => {
      const { client } = props;

      setLoadingImageUrl(true);

      try {
        const { data } = await client.query({
          query: GET_IMAGE_URLS,
          variables: {
            bucketName,
          },
        });

        const imageUrls = _get(data, 'imageUrls', []);
        const imageUrlsFormatted = imageUrls.map(src => ({ src }));

        setLoadingImageUrl(false);

        return setImageUrls(imageUrlsFormatted);
      } catch (error) {
        setLoadingImageUrl(false);

        if (bucketName) {
          message.error('Error getting images');
        }
      }
    };

    getImageUrls(bucketName);
  }, [bucketName, props]);

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
              imageUrls,
              loadingImageUrls,
              onKeyPress: async event => {
                const bucket = _get(
                  props,
                  `values.${BUCKET_NAME_FIELD_NAME}`,
                  '',
                );

                if (event.charCode === 13 && bucket) {
                  setBucketName(bucket);
                }
              },
              onBlur: async () => {
                const bucket = _get(
                  props,
                  `values.${BUCKET_NAME_FIELD_NAME}`,
                  '',
                );

                if (bucket) {
                  setBucketName(bucket);
                }
              },
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
                  props: props,
                  fieldName: CLASSIFICATION_TYPE_FIELD_NAME,
                }) === MULTI_LABEL,
              gridColumn: '2/3',
            },
            {
              name: CLASSES_FIELD_NAME,
              component: FieldLabelsSelect,
              onlyVisibleIf:
                getFieldValue({
                  props: props,
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
          loading={props.isSubmitting}
          width={329}
          height={50}
        >
          Save
        </Button>
      </Flex>
    </Form>
  );
};

ProjectFormViewComponent = withApollo(ProjectFormViewComponent);

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

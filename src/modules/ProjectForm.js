import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import _find from 'lodash/find'
import _capitalize from 'lodash/capitalize'
import { Form, withFormik } from 'formik'
import { Button, message, Radio } from 'antd'
import { Grid } from '../components/Grid'
import { Flex } from '../components/Flex'
import {
  FieldInput,
  FieldTextArea,
  FieldBucketNameRadioGroup,
  FieldInputNumber,
  FieldLabelTypeRadioGroup,
  FieldIsLabelRepeatable,
  FieldLabelsSelect,
  MULTI_LABEL,
  defaultCategories,
  defaultImageBuckets,
  FieldCategoryRadioGroup,
} from '../helperModules/FieldComponents'
import { renderFields } from '../helperModules/RenderField'

const DEFAULT_LABELS_STORAGE_ITEM_NAME = 'defaultLabels'

export const CATEGORY_FIELD_NAME = 'category'
export const NAME_FIELD_NAME = 'name'
export const DESCRIPTION_FIELD_NAME = 'description'
export const LABEL_FIELD_NAME = 'default configurations'
export const NUM_VALIDATION_FIELD_NAME = 'number-of-validations'
export const BUCKET_NAME_FIELD_NAME = 'image-bucket-url'
export const LABEL_TYPE_FIELD_NAME = 'Type'
export const IS_LABEL_REPEATABLE_FIELD_NAME = 'is-label-repeatable?'
export const QUESTION_FIELD_NAME = 'question'
export const LABELS_FIELD_NAME = 'labels'

const LABEL_NAME = 'label-name'

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

// remove later
localStorage.setItem(
  DEFAULT_LABELS_STORAGE_ITEM_NAME,
  JSON.stringify([
    {
      [LABEL_NAME]: 'Tooth number',
      [LABEL_TYPE_FIELD_NAME]: MULTI_LABEL,
      [IS_LABEL_REPEATABLE_FIELD_NAME]: false,
      [QUESTION_FIELD_NAME]: 'Please outline a tooth and select tooth number.',
      [LABELS_FIELD_NAME]: ['1', '2', '3', '4'],
      [NUM_VALIDATION_FIELD_NAME]: 3,
      [DESCRIPTION_FIELD_NAME]: 'this is to train tooth numbering model',
      [NAME_FIELD_NAME]: 'Tooth Numbering trial #[enter number here]',
      [CATEGORY_FIELD_NAME]: 'Tooth number detection',
      [BUCKET_NAME_FIELD_NAME]: 'https://bit.ly/laguro-tina',
    },
  ]),
)
// remove above

const DEFAULT_LABELS = JSON.parse(
  localStorage.getItem(DEFAULT_LABELS_STORAGE_ITEM_NAME),
)

const FieldLabelNameRadioGroup = props => (
  <Radio.Group
    {...props.field}
    onChange={e => {
      props.form.setFieldValue(LABEL_FIELD_NAME, e.target.value)
      const label = _find(DEFAULT_LABELS, [LABEL_NAME, e.target.value])

      if (label) {
        Object.keys(label)
          .filter(key => key !== LABEL_NAME)
          .map(fieldName =>
            props.form.setFieldValue(fieldName, label[fieldName]),
          )
      } else {
        ;[
          LABEL_TYPE_FIELD_NAME,
          IS_LABEL_REPEATABLE_FIELD_NAME,
          QUESTION_FIELD_NAME,
          LABELS_FIELD_NAME,
          NUM_VALIDATION_FIELD_NAME,
          DESCRIPTION_FIELD_NAME,
          NAME_FIELD_NAME,
          CATEGORY_FIELD_NAME,
          BUCKET_NAME_FIELD_NAME,
        ].map(fieldName => props.form.setFieldValue(fieldName, undefined))
      }
      return null
    }}
  >
    {DEFAULT_LABELS.map(label => (
      <Radio style={radioStyle} value={label[LABEL_NAME]}>
        {getFieldNameText(label[LABEL_NAME])}
      </Radio>
    ))}
  </Radio.Group>
)

const getFieldNameText = fieldName => _capitalize(fieldName.replace(/-/g, ' '))

const getFieldValue = ({ props, fieldName }) => {
  return props.values[fieldName]
}

const ProjectFormComponent = props => (
  <Form>
    <Grid gridTemplateColumns={'auto auto auto'}>
      {renderFields({
        fields: [
          {
            onlyVisibleIf: !_isEmpty(DEFAULT_LABELS),
            name: LABEL_FIELD_NAME,
            component: FieldLabelNameRadioGroup,
          },
          {
            name: CATEGORY_FIELD_NAME,
            component: _isEmpty(defaultCategories)
              ? FieldInput
              : FieldCategoryRadioGroup,
          },
          {
            name: NAME_FIELD_NAME,
            component: FieldInput,
          },
          {
            name: DESCRIPTION_FIELD_NAME,
            component: FieldTextArea,
          },
          {
            name: BUCKET_NAME_FIELD_NAME,
            component: _isEmpty(defaultImageBuckets)
              ? FieldInput
              : FieldBucketNameRadioGroup,
          },
          {
            name: NUM_VALIDATION_FIELD_NAME,
            component: FieldInputNumber,
          },

          {
            name: QUESTION_FIELD_NAME,
            component: FieldInput,
          },
          {
            name: LABEL_TYPE_FIELD_NAME,
            component: FieldLabelTypeRadioGroup,
            gridColumn: '1/2',
          },
          {
            name: IS_LABEL_REPEATABLE_FIELD_NAME,
            component: FieldIsLabelRepeatable,
            onlyVisibleIf:
              getFieldValue({ props, fieldName: LABEL_TYPE_FIELD_NAME }) ===
              MULTI_LABEL,
            gridColumn: '2/3',
          },
          {
            name: LABELS_FIELD_NAME,
            component: FieldLabelsSelect,
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
        Save changes
      </Button>
    </Flex>
  </Form>
)

export const ProjectForm = withFormik({
  mapPropsToValues: props => {
    const { data } = props
    return { ...data }
  },
  handleSubmit: async (values, actions) => {
    const result = await actions.props.onSubmit(values)
    actions.setSubmitting(false)

    if (result) {
      message.success('Project successfully created!')
    }
  },
})(ProjectFormComponent)

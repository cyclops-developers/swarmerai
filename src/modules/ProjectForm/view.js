import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import _find from 'lodash/find'
import _capitalize from 'lodash/capitalize'
import { Form, withFormik, Field } from 'formik'
import { Button, message, Radio, Select, AutoComplete } from 'antd'
import { Grid } from '../../components/Grid'
import { Flex } from '../../components/Flex'
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
} from '../../helperModules/FieldComponents'
import { renderFields } from '../../helperModules/RenderField'
// import { AutoComplete } from '@jbuschke/formik-antd'
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
  LABEL_FIELD_NAME,
} from '../../util/projectUtils'

const DEFAULT_LABELS_STORAGE_ITEM_NAME = 'defaultLabels'

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
      [CLASSIFICATION_TYPE_FIELD_NAME]: MULTI_LABEL,
      [IS_CLASS_REPEATABLE_FIELD_NAME]: false,
      [QUESTION_FIELD_NAME]: 'Please outline a tooth and select tooth number.',
      [CLASSES_FIELD_NAME]: ['1', '2', '3', '4'],
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
          CLASSIFICATION_TYPE_FIELD_NAME,
          IS_CLASS_REPEATABLE_FIELD_NAME,
          QUESTION_FIELD_NAME,
          CLASSES_FIELD_NAME,
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

class ProjectFormViewComponent extends React.Component {
  constructor(props) {
    super(props)
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
    )
  }

  render() {
    return (
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
                  : this.FieldCategoryAutocomplete,
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
    )
  }
}

export const ProjectFormView = withFormik({
  mapPropsToValues: props => {
    const { data } = props
    return { ...data, categories: props.categories }
  },
  handleSubmit: async (values, actions) => {
    await actions.props.onSubmit({
      values,
      onSuccess: () => message.success('Project successfully created!'),
    })
    actions.setSubmitting(false)
  },
})(ProjectFormViewComponent)

import React from 'react'
import { Select, Input, InputNumber, Radio } from 'antd'

export const BINARY = 'binary'
export const MULTI_LABEL = 'multi-label'

const DEFAULT_CATEGORIES_STORAGE_ITEM_NAME = 'defaultCategories'
const DEFAULT_IMAGE_BUCKETS_STORAGE_ITEM_NAME = 'defaultImageBuckets'

// remove later
localStorage.setItem(
  DEFAULT_CATEGORIES_STORAGE_ITEM_NAME,
  JSON.stringify(['Cavity detection', 'Tooth number detection']),
)

localStorage.setItem(
  DEFAULT_IMAGE_BUCKETS_STORAGE_ITEM_NAME,
  JSON.stringify([
    {
      name: 'us-east-1-125125',
      url: 'http:bit.ly/laguro-tina',
    },
    {
      name: 'us-east-1-12512',
      url: 'http:bit.ly/laguro-tina2',
    },
  ]),
)
// remove above

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

export const defaultCategories = JSON.parse(
  localStorage.getItem(DEFAULT_CATEGORIES_STORAGE_ITEM_NAME),
)

const defaultImageBuckets = JSON.parse(
  localStorage.getItem(DEFAULT_IMAGE_BUCKETS_STORAGE_ITEM_NAME),
)

export const FieldInput = ({ field, ...props }) => {
  return (
    <div>
      <Input {...field} {...props} />
    </div>
  )
}

export const FieldTextArea = ({ field, ...props }) => {
  return <Input.TextArea {...field} {...props} />
}
export const FieldInputNumber = ({ field, form, ...props }) => {
  return (
    <InputNumber
      min={0}
      {...field}
      {...props}
      onChange={value => form.setFieldValue(field.name, value)}
    />
  )
}

export const FieldBucketNameRadioGroup = props => (
  <Radio.Group {...props}>
    {defaultImageBuckets.map(bucket => (
      <Radio style={radioStyle} value={bucket.url}>
        {bucket.name}
      </Radio>
    ))}
  </Radio.Group>
)

export const FieldLabelTypeRadioGroup = props => (
  <Radio.Group {...props.field}>
    <Radio style={radioStyle} value={MULTI_LABEL}>
      Multi-label
    </Radio>
    <Radio style={radioStyle} value={BINARY}>
      Binary
    </Radio>
  </Radio.Group>
)

export const FieldIsLabelRepeatable = props => {
  return (
    <Radio.Group {...props.field}>
      <Radio style={radioStyle} value={true}>
        Yes
      </Radio>
      <Radio style={radioStyle} value={false}>
        No
      </Radio>
    </Radio.Group>
  )
}

export const FieldLabelsSelect = ({ field, form, ...props }) => (
  <Select
    mode="tags"
    {...field}
    {...props}
    onChange={value => form.setFieldValue(field.name, value)}
  />
)

export const FieldCategorySelect = ({ field, form, ...props }) => (
  <Select
    {...field}
    {...props}
    onChange={value => form.setFieldValue(field.name, value)}
  >
    {defaultCategories.map(category => (
      <Select.Option value={category}>{category}</Select.Option>
    ))}
  </Select>
)

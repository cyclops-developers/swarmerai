import React from 'react'
import _isUndefined from 'lodash/isUndefined'
import { Field } from 'formik'
import { Box } from '../components/Box'
import { Grid } from '../components/Grid'
import { Text } from '../components/Text'

const renderField = ({ name, component, gridColumn, getFieldNameText }) => (
  <Grid.Item gridColumn={gridColumn || '1/-1'}>
    <Box mb={15}>
      <Text fontSize={14} fontWeight="700">
        {getFieldNameText(name)}
      </Text>
      <Field name={name} component={component} />
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

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
import React, { Fragment } from 'react';
import { Select, Input, InputNumber, Radio } from 'antd';
import { Box } from '../components/Box';

export const BINARY = 'BINARY';
export const MULTI_LABEL = 'MULTI_CLASS';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

export const FieldInput = ({ field, ...props }) => {
  return (
    <div>
      <Input {...field} {...props} />
    </div>
  );
};

export const FieldPasswordInput = ({ field, ...props }) => {
  return (
    <div>
      <Input.Password {...field} {...props} />
    </div>
  );
};

export const FieldTextArea = ({ field, ...props }) => {
  return <Input.TextArea {...field} {...props} />;
};
export const FieldInputNumber = ({ field, form, ...props }) => {
  return (
    <InputNumber
      min={0}
      {...field}
      {...props}
      onChange={value => form.setFieldValue(field.name, value)}
    />
  );
};

export const FieldLabelTypeRadioGroup = props => (
  <Radio.Group {...props.field}>
    <Radio style={radioStyle} value={MULTI_LABEL}>
      Multi-class
    </Radio>
    <Radio style={radioStyle} value={BINARY}>
      Binary
    </Radio>
  </Radio.Group>
);

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
  );
};

export const FieldLabelsSelect = ({ field, form, ...props }) => (
  <Select
    mode="tags"
    {...field}
    {...props}
    onChange={value => form.setFieldValue(field.name, value)}
  />
);

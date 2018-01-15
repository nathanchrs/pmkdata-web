import React, { Component } from 'react';
import { Form, Input as AntdInput } from 'antd';
import { Field } from 'redux-form';

const antdComponent = innerProps => {
  const { input, meta, label, extra, ...innerPropsRest } = innerProps;
  const { value, onChange, ...inputRest } = input;

  let validateStatus;
  if (meta.touched && meta.invalid) validateStatus = 'error';
  else if (meta.asyncValidating) validateStatus = 'validating';

  return (
    <Form.Item
      label={label}
      hasFeedback
      validateStatus={validateStatus}
      help={validateStatus === 'error' && meta.error}
      extra={extra}
    >
      <AntdInput
        value={value}
        onChange={onChange}
        {...innerPropsRest}
        {...inputRest}
      />
    </Form.Item>
  );
};

class Input extends Component {
  render() {
    return (
      <Field component={antdComponent} {...this.props} />
    );
  }
}

export default Input;

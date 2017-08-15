import React from 'react';
import { Field } from 'redux-form';
import { Form, Input } from 'semantic-ui-react';
import DatePicker from './DatePicker';

class ControlledField extends React.Component {
  innerComponent = innerProps => {
    const { input, meta, ...innerPropsRest } = innerProps;
    const onChange = this.props.component === DatePicker ? (data) => input.onChange(data) : (event, data) => input.onChange(data.value);
    const actualComponentProps = {
      ...innerPropsRest,
      ...input,
      onChange,
      error: meta.touched && meta.invalid,
      loading: meta.asyncValidating
    };
    return (
      <Form.Field style={{ marginBottom: '14px' }}>
        <label>{this.props.label}</label>
        {React.createElement(this.props.component, actualComponentProps)}
        {actualComponentProps.error &&
          <div style={{ fontSize: '0.8rem', color: '#9f3a38' }}>{meta.error}</div>
        }
      </Form.Field>
    );
  };

  render() {
    const { component, label, ...rest } = this.props;
    return <Field component={this.innerComponent} {...rest} />;
  }
}

ControlledField.defaultProps = {
  component: Input
};

export default ControlledField;
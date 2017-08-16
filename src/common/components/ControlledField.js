import React from 'react';
import { Field } from 'redux-form';
import { Form, Input, TextArea } from 'semantic-ui-react';
import Datetime from 'react-datetime';
import moment from 'moment';

class ControlledField extends React.Component {
  innerComponent = innerProps => {
    const {input, meta, timeFormat, ...innerPropsRest} = innerProps;
    const onChange = this.props.component === Datetime ?
      (data) => input.onChange(data.format(timeFormat ? undefined : 'YYYY-MM-DD'))
      : (event, data) => input.onChange(data.value);
    const {value, inputRest} = input;
    let actualComponentProps = {
      ...innerPropsRest,
      value: this.props.component === Datetime ? value && moment(value).format('D MMMM YYYY') : value,
      ...inputRest,
      onChange
    };
    const error = meta.touched && meta.invalid;
    const loading = meta.asyncValidating;
    if (this.props.component !== TextArea) {
      actualComponentProps.error = error;
      actualComponentProps.loading = loading;
    }
    return (
      <Form.Field style={{marginBottom: '14px'}}>
        <label>{this.props.label}</label>
        {React.createElement(this.props.component, actualComponentProps)}
        {error &&
        <div style={{fontSize: '0.8rem', color: '#9f3a38'}}>{meta.error}</div>
        }
      </Form.Field>
    );
  };

  render () {
    const {component, label, ...rest} = this.props;
    return <Field component={this.innerComponent} {...rest} />;
  }
}

ControlledField.defaultProps = {
  component: Input
};

export default ControlledField;
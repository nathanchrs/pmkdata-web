import React from 'react';
import { Field } from 'redux-form';
import { Form, Input, TextArea } from 'semantic-ui-react';
import Datetime from 'react-datetime';
import moment from 'moment';
import { displayDateFormat, displayTimeFormat, storeDateFormat, storeDateTimeFormat } from '../constants';

class ControlledField extends React.Component {
  innerComponent = innerProps => {
    const {input, meta, ...innerPropsRest} = innerProps;
    let {value, inputRest} = input;
    let actualComponentProps = {
      ...innerPropsRest,
      value,
      ...inputRest,
      onChange: (event, data) => input.onChange(data.value),
      error: meta.touched && meta.invalid,
      loading: meta.asyncValidating
    };

    if (this.props.component === Datetime) {
      delete actualComponentProps.value;
      actualComponentProps.dateFormat = displayDateFormat;
      if (innerPropsRest.dateOnly) {
        actualComponentProps.timeFormat = false;
        actualComponentProps.onChange = (data) => input.onChange(moment(data).format(storeDateFormat))
      } else {
        actualComponentProps.timeFormat = displayTimeFormat;
        actualComponentProps.onChange = (data) => input.onChange(moment(data).format(storeDateTimeFormat));
      }
    }

    const error = actualComponentProps.error;
    if (this.props.component === TextArea) {
      delete actualComponentProps.error;
      delete actualComponentProps.loading;
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
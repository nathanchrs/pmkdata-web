import React from 'react';
import { Field } from 'redux-form';
import { Form } from 'semantic-ui-react';

class ControlledField  extends React.Component {
  innerComponent = innerProps => {
    const { input, meta, ...innerPropsRest } = innerProps;
    const actualComponentProps = {
      ...innerPropsRest,
      ...input,
      error: meta.touched && meta.invalid,
      loading: meta.asyncValidating
    };
    return (
      <div style={{ marginBottom: '14px' }}>
        {React.createElement(this.props.component, actualComponentProps)}
        {actualComponentProps.error &&
          <div style={{ marginTop: '-10px', fontSize: '0.8rem', color: '#9f3a38' }}>{meta.error}</div>
        }
      </div>
    );
  };

  render() {
    const { component, ...rest } = this.props;
    return <Field component={this.innerComponent} {...rest} />;
  }
}

ControlledField.defaultProps = {
  component: Form.Input
};

export default ControlledField;
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import ControlledField from '../../common/components/ControlledField';
import { createValidator } from '../../common/validation';
import { Button, Container, Divider, Form, Header, Message, Segment } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../services/session/actions';

class Login extends React.Component {
  render() {
    const { handleSubmit, submitDispatcher, error, pristine, submitting, isAuthenticated, history } = this.props;

    const { from: redirectLocation } = history.location.state || { from: { pathname: '/' } };
    if (isAuthenticated) {
      return <Redirect to={redirectLocation} />;
    }

    let locationMessage = <Divider hidden />;
    if (history.location.state && history.location.state.message) {
      locationMessage = <Message info visible>{history.location.state.message}</Message>;
    }

    return (
      <Container style={{ width: '360px', paddingTop: '9vw' }}>
        <Segment>
          <Header size='huge' textAlign='center'>Login</Header>
          <Divider hidden />
          <Form onSubmit={handleSubmit(submitDispatcher)} error={!!error}>
            <ControlledField name='username' label='Username' icon='user' iconPosition='left' />
            <ControlledField name='password' type='password' label='Password' icon='lock' iconPosition='left' />
            {locationMessage}
            <Message error>{error}</Message>
            <Button.Group fluid>
              <Button as={Link} to='/register' content='Daftar' />
              <Button as='button' type='submit' primary content='Login'
                      loading={submitting} disabled={pristine || submitting} />
            </Button.Group>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const schema = {
  'type': 'object',
  'properties': {
    'username': { type: 'string' },
    'password': { type: 'string' }
  },
  'required': ['username', 'password'],
  'errorMessage': {
    'properties': {
      'username': 'Username harus diisi',
      'password': 'Password harus diisi'
    },
    '_': 'Username dan/atau password tidak valid'
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitDispatcher: async (values) => {
      let response = await dispatch(login(values));
      if (response.error) {
        if (response.payload) {
          if (response.payload.status === 422) {
            throw new SubmissionError({ _error: 'Username atau password kosong atau tidak valid.' });
          }

          if (response.payload.status === 401) {
            if (response.payload.response && response.payload.response.message === 'Account inactive.') {
              throw new SubmissionError({ _error: 'Akun ini belum divalidasi oleh admin, coba beberapa saat lagi.' });
            }
            throw new SubmissionError({ _error: 'Username atau password salah.' });
          }
        }

        throw new SubmissionError({ _error: 'Login gagal, coba beberapa saat lagi.' });
      }
    }
  };
};

Login = reduxForm({ form: 'login', validate: createValidator(schema) })(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
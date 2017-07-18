import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import ControlledField from '../../components/ControlledField';
import { createValidator } from '../../common/validation';
import { Button, Container, Divider, Form, Header, Message, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { login } from '../../services/session/actions';

class Login extends React.Component {
  render() {
    const { handleSubmit, submitDispatcher, error, submitting, isAuthenticated, history } = this.props;

    const { from: redirectLocation } = history.location.state || { from: { pathname: '/' } };
    if (isAuthenticated) {
      return <Redirect to={redirectLocation} />;
    }

    let locationMessage = <Divider hidden />;
    if (history.location.state && history.location.state.message) {
      locationMessage = <Message info visible>{history.location.state.message}</Message>;
    }

    let failureMessage = <Divider hidden />;
    if (error) {
      failureMessage = <Message warning visible>{error}</Message>;
    }

    return (
      <Container style={{ width: '360px', marginTop: '16vh' }}>
        <Segment>
          <Header size='huge' textAlign='center'>Login</Header>
          <Divider hidden />
          <Form onSubmit={handleSubmit(submitDispatcher)}>
            <ControlledField name='username' label='Username' icon='user' iconPosition='left' />
            <ControlledField name='password' type='password' label='Password' icon='lock' iconPosition='left' />
            {locationMessage}
            {failureMessage}
            <Button as='button' type='submit' primary fluid content='Login' icon='arrow right' labelPosition='right'
                    loading={submitting} disabled={ !!error || submitting } />
          </Form>
        </Segment>
      </Container>
    );
  }
}

function handleFailure(action) {
  if (action.payload) {
    if (action.payload.status === 422) {
      throw new SubmissionError({ _error: 'Username atau password kosong atau tidak valid.' });
    }

    if (action.payload.status === 401) {
      if (action.payload.response && action.payload.response.message === 'Account inactive.') {
        throw new SubmissionError({ _error: 'Akun ini belum divalidasi oleh admin, coba beberapa saat lagi.' });
      }
      throw new SubmissionError({ _error: 'Username atau password salah.' });
    }
  }

  throw new SubmissionError({ _error: 'Login gagal, coba beberapa saat lagi.' });
}

const schema = {
  'type': 'object',
  'properties': {
    'username': { type: 'string', minLength: 1 },
    'password': { type: 'string', minLength: 1 }
  },
  'required': ['username', 'password']
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitDispatcher: async (values) => {
      let action = await dispatch(login(values));
      if (action.error) handleFailure(action);
    }
  };
};

Login = reduxForm({ form: 'login', validate: createValidator(schema) })(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
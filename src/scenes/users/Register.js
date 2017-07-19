import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Form, Header, Message, Segment } from 'semantic-ui-react';
import { reduxForm, SubmissionError } from 'redux-form';
import ControlledField from '../../components/ControlledField';
import { createValidator } from '../../common/validation';
import commonSchemas from '../../common/schemas';
import { Redirect, Link } from 'react-router-dom';
import { register } from '../../services/users/actions';

class Register extends React.Component {
  render() {
    const { handleSubmit, submitDispatcher, error, submitting, isAuthenticated, history } = this.props;

    const { from: redirectLocation } = history.location.state || { from: { pathname: '/' } };
    if (isAuthenticated) {
      return <Redirect to={redirectLocation} />;
    }

    return (
      <Container style={{ width: '360px', paddingTop: '6vw' }}>
        <Segment>
          <Header size='huge' textAlign='center'>Daftar</Header>
          <Divider hidden />
          <Form onSubmit={handleSubmit(submitDispatcher)} error={!!error}>
            <ControlledField name="nim" label='NIM' icon='hashtag' iconPosition='left' />
            <ControlledField name="email" label='Email' icon='mail' iconPosition='left' />
            <ControlledField name="username" label='Username' icon='user' iconPosition='left' />
            <ControlledField name="password" label='Password' icon='lock' iconPosition='left' type='password' />
            <Divider hidden />
            <Message error>{error}</Message>
            <Button.Group fluid>
              <Button as={Link} to='/login' content='Login' />
              <Button as='button' type='submit' primary content='Daftar'
                      loading={submitting} disabled={submitting} />
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
    'nim': commonSchemas.nim,
    'email': commonSchemas.email,
    'username': commonSchemas.username,
    'password': commonSchemas.password
  },
  'required': ['email', 'username', 'password'],
  'errorMessage': {
    'properties': {
      'email': 'Email harus diisi',
      'username': 'Username harus diisi',
      'password': 'Password harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.session.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitDispatcher: async (values) => {
      let action = await dispatch(register(values));
      if (action.error) {
        if (action.payload && action.payload.status === 409) {
          if (action.payload.response && action.payload.response.message === 'Username already exists.') {
            throw new SubmissionError({ username: 'Username sudah terpakai' });
          } else {
            throw new SubmissionError({ nim: 'Sudah ada username yang terdaftar untuk NIM ini' });
          }
        } else if (action.payload && action.payload.status === 422) {
          throw new SubmissionError({ _error: 'Terdapat input yang tidak valid' });
        }

        throw new SubmissionError({ _error: 'Pendaftaran gagal, coba beberapa saat lagi.' });
      }

      ownProps.history.push('/login', {
        message: 'Pendaftaran berhasil - akun akan divalidasi terlebih dahulu.'
      });
    }
  };
};

Register = reduxForm({ form: 'register', validate: createValidator(schema) })(Register);
export default connect(mapStateToProps, mapDispatchToProps)(Register);

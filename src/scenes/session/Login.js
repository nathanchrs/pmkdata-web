import React, { Component } from 'react';
import { Alert, Button, Card, Form, Icon, Layout } from 'antd';
import { Input } from '../../components/AntdReduxFormFields';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { createValidator } from '../../common/validation';
import schemas from '../../common/schemas';
import { login } from '../../actions/session';
import { Link, Redirect } from 'react-router-dom';
import './Login.css';
import pmkLogo from '../../resources/pmklogo.png';

class Login extends Component {
  render() {
    const { handleSubmit, submitDispatcher, error, pristine, submitting, isAuthenticated, history } = this.props;
    
    // If authenticated, redirect back to previous location
    const { from: redirectLocation } = history.location.state || { from: { pathname: '/' } };
    if (isAuthenticated) return <Redirect to={redirectLocation} />;

    return (
      <Layout className="login-layout">
        <Layout.Header>
          <div className="brand"><img src={pmkLogo} alt="" /></div>
        </Layout.Header>
        <Layout.Content>
          <Card title="PMK ITB Data - Login" className="login-card">
            <Form onSubmit={handleSubmit(submitDispatcher)}>
              <Input
                name="username"
                prefix={<Icon type="user" className="input-icon" />}
                size="large"
                placeholder="Username"
              />
              <Input
                name="password"
                type="password"
                prefix={<Icon type="lock" className="input-icon" />}
                size="large"
                placeholder="Password"
              />

              {!!error &&
                <Form.Item>
                  <Alert message={error} type="error" />
                </Form.Item>
              }

              <Form.Item className="no-bottom-margin">
                <Button htmlType="submit" className="full-width" type="primary" size="large"
                  loading={submitting} disabled={pristine || submitting}>Login</Button>
                <p className="no-bottom-margin">
                  <a href="https://login.itb.ac.id/cas/login">Login dengan akun INA (ITB)</a> | <Link to="/register">Buat akun baru</Link>
                </p>
              </Form.Item>
              
            </Form>
          </Card>
        </Layout.Content>
      </Layout>
    );
  }
}

const schema = {
  'type': 'object',
  'properties': {
    'username': schemas.username,
    'password': schemas.password
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

const LoginWithForm = reduxForm({ form: 'login', validate: createValidator(schema) })(Login);
export default connect(mapStateToProps, mapDispatchToProps)(LoginWithForm);

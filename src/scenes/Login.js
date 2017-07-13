import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Form, Header, Message, Segment } from 'semantic-ui-react';
import { login } from '../services/session/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
    this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChanged(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChanged(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.username, this.state.password);
  }

  render() {

    let message = <Divider hidden />;
    if (this.props.failed) {
      message = <Message warning visible>Username atau password salah.</Message>;
    } else if (this.props.error) {
      message = <Message error visible>Login gagal, coba beberapa saat lagi.</Message>;
    }

    return (
      <Container style={{ width: '360px', marginTop: '16vh' }}>
        <Segment>
          <Header size='huge' textAlign='center'>Login</Header>
          <Divider hidden />
          <Form>
            <Form.Input label='Username' value={this.state.username} onChange={this.handleUsernameChanged} />
            <Form.Input label='Password' type='password' value={this.state.password} onChange={this.handlePasswordChanged} />
            {message}
            <Button onClick={this.handleSubmit} primary fluid content='Login' icon='arrow right' labelPosition='right' />
          </Form>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.session.error,
    failed: state.session.failed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (username, password) => { dispatch(login(username, password)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

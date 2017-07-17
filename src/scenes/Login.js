import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Form, Header, Message, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { login } from '../services/session/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', isFetching: false };
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

  async handleSubmit(event) {
    if (!this.state.isFetching) {
      this.state.isFetching = true;
      await this.props.onSubmit(this.state.username, this.state.password);
      this.setState({isFetching: false});
    }
  }

  render() {
    const { from: redirectLocation } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.isAuthenticated) {
      return <Redirect to={redirectLocation} />;
    }

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
            <Form.Input label='Username' icon='user' iconPosition='left'
                        value={this.state.username} onChange={this.handleUsernameChanged} />
            <Form.Input label='Password' icon='lock' iconPosition='left' type='password'
                        value={this.state.password} onChange={this.handlePasswordChanged} />
            {message}
            <Button primary fluid content='Login' icon='arrow right' labelPosition='right'
                    loading={ this.state.isFetching }
                    onClick={this.handleSubmit} />
          </Form>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.session.error,
    failed: state.session.failed,
    isAuthenticated: !!state.session.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (username, password) => {
      return dispatch(login(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

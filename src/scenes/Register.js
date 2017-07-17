import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Form, Header, Message, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { register } from '../services/users/actions';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nim: '', email: '', username: '', password: '', isFetching: false };
    this.handleFieldChanged = this.handleFieldChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChanged(field) {
    return (event) => {
      this.setState({ [field]: event.target.value });
    };
  }

  async handleSubmit(event) {
    if (!this.state.isFetching) {
      // TODO: validation
      this.state.isFetching = true;
      let action = await this.props.onSubmit(
        this.state.nim, this.state.email, this.state.username, this.state.password
      );
      if (!action.error) {
        this.props.history.push( {
          pathname: '/login',
          state: { message: 'Pendaftaran berhasil - akun akan divalidasi terlebih dahulu oleh admin.' }
        });
      }
      this.setState({ isFetching: false });
    }
  }

  render() {
    const { from: redirectLocation } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.isAuthenticated) {
      return <Redirect to={redirectLocation} />;
    }

    let message = <Divider hidden />;
    if (this.props.error) {
      message = <Message error visible>Pendaftaran gagal, coba beberapa saat lagi.</Message>;
    }

    return (
      <Container style={{ width: '360px', marginTop: '12vh' }}>
        <Segment>
          <Header size='huge' textAlign='center'>Daftar</Header>
          <Divider hidden />
          <Form>
            <Form.Input label='NIM' icon='hashtag' iconPosition='left'
                        value={this.state.nim} onChange={this.handleFieldChanged('nim')} />
            <Form.Input label='Email' icon='mail' iconPosition='left'
                        value={this.state.email} onChange={this.handleFieldChanged('email')} />
            <Form.Input label='Username' icon='user' iconPosition='left'
                        value={this.state.username} onChange={this.handleFieldChanged('username')} />
            <Form.Input label='Password' icon='lock' iconPosition='left' type='password'
                        value={this.state.password} onChange={this.handleFieldChanged('password')} />
            {message}
            <Button primary fluid content='Daftar' icon='arrow right' labelPosition='right'
                    loading={this.state.isFetching}
                    onClick={this.handleSubmit} />
          </Form>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.users.error,
    isAuthenticated: !!state.session.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (nim, email, username, password) => {
      return dispatch(register(nim, email, username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

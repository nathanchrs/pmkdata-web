import React, { Component } from 'react';
import { Button, Container, Divider, Form, Header, Segment } from 'semantic-ui-react';

class Login extends Component {
  render() {
    return (
      <Container style={{width: '360px', marginTop: '16vh'}}>
        <Segment>
          <Header size='huge' textAlign='center'>PMK Data</Header>
          <Divider hidden />
          <Form>
            <Form.Input label='Username' />
            <Form.Input label='Password' type='password' />
            <Divider hidden />
            <Button primary fluid content='Login' icon='arrow right' labelPosition='right' />
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default Login;
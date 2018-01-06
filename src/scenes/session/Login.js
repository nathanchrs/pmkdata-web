import React, { Component } from 'react';
import { Button, Card, Form, Icon, Input, Layout } from 'antd';
import './Login.css';
import pmkLogo from '../../resources/pmklogo.png';

class Login extends Component {
  render() {
    return (
      <Layout className="login-layout">
        <Layout.Header>
          <div className="brand"><img src={pmkLogo} alt="" /></div>
        </Layout.Header>
        <Layout.Content>
          <Card title="PMK ITB Data - Login" className="login-card">
            <Form>
              <Form.Item>
                <Input prefix={<Icon type="user" className="input-icon" />}
                  size="large" placeholder="Username" />
              </Form.Item>
              <Form.Item>
                <Input prefix={<Icon type="lock" className="input-icon" />}
                  type="password" size="large" placeholder="Password" />
              </Form.Item>
              <Form.Item className="no-bottom-margin">
                <Button htmlType="submit" className="full-width" type="primary" size="large" >Login</Button>
                <p className="no-bottom-margin"><a href="">Login dengan akun INA (ITB)</a> | <a href="">Buat akun baru</a></p>
              </Form.Item>
            </Form>
          </Card>
        </Layout.Content>
      </Layout>
    );
  }
}

export default Login;

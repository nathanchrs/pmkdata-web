import React, { Component } from 'react';
import { Breadcrumb, Layout } from 'antd';
import SidebarMenu from './SidebarMenu';
import './SidebarLayout.css';
import pmkLogo from '../../resources/pmklogo.png';

class SidebarLayout extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout className="full-height">
        <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="sidebarlayout-brand"><img src={pmkLogo} alt="" /></div>
          <SidebarMenu />
        </Layout.Sider>

        <Layout>
          <Layout.Header className="sidebarlayout-header">
            <h1>{this.props.title}</h1>
          </Layout.Header>

          <Layout.Content className="sidebarlayout-content">
            <Breadcrumb className="sidebarlayout-breadcrumb">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            <div className="sidebarlayout-content-container">
              {this.props.children}
            </div>
          </Layout.Content>

          <Layout.Footer className="center-text">
            Persekutuan Mahasiswa Kristen ITB
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SidebarLayout;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon, Layout } from 'antd';
import WindowSizeListener from 'react-window-size-listener';
import SidebarMenu from './SidebarMenu';
import './SidebarLayout.css';
import pmkLogo from '../../resources/pmklogo.png';

class SidebarLayout extends Component {
  state = {
    collapsed: false
  };

  toggleSidebar = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  handleResponsiveSidebar = windowSize => {
    this.setState({ collapsed: windowSize.windowWidth < this.props.breakpointWidth });
  };

  render() {
    return (
      <Layout className="full-height">
        <WindowSizeListener onResize={this.handleResponsiveSidebar} />

        <Layout.Sider collapsible collapsed={this.state.collapsed} trigger={null}>
          <div className="sidebarlayout-brand"><img src={pmkLogo} alt="" /></div>
          <SidebarMenu selectedMenuKey={this.props.selectedMenuKey} />
        </Layout.Sider>

        <Layout>
          <Layout.Header className="sidebarlayout-header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggleSidebar}
            />
            <h1>{this.props.title}</h1>
          </Layout.Header>

          <Layout.Content className="sidebarlayout-content">
            {this.props.breadcrumbLinks ?
              <Breadcrumb className="sidebarlayout-breadcrumb">
                {this.props.breadcrumbLinks.map(link => 
                  <Breadcrumb.Item>{link}</Breadcrumb.Item>
                )}
              </Breadcrumb>
              :
              <br />
            }

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

SidebarLayout.defaultProps = {
  breakpointWidth: 800
};

SidebarLayout.propTypes = {
  breadcrumbLinks: PropTypes.array,
  breakpointWidth: PropTypes.number,
  selectedMenuKey: PropTypes.string,
  title: PropTypes.string
};

export default SidebarLayout;
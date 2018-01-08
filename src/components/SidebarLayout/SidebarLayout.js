import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon, Layout } from 'antd';
import WindowSizeListener from 'react-window-size-listener';
import SidebarMenu from './SidebarMenu';
import ui from 'redux-ui';
import './SidebarLayout.css';
import pmkLogo from '../../resources/pmklogo.png';

class SidebarLayout extends Component {
  toggleSidebar = () => {
    this.props.updateUI({ collapsed: !this.props.ui.collapsed });
  };

  handleResponsiveSidebar = windowSize => {
    this.props.updateUI({ collapsed: windowSize.windowWidth < this.props.breakpointWidth });
  };

  render() {
    const { ui, breadcrumbLinks, selectedMenuKey, title } = this.props;
    return (
      <Layout className="full-height">
        <WindowSizeListener onResize={this.handleResponsiveSidebar} />

        <Layout.Sider collapsible collapsed={ui.collapsed} trigger={null}>
          <div className="sidebarlayout-brand"><img src={pmkLogo} alt="" /></div>
          <SidebarMenu selectedMenuKey={selectedMenuKey} />
        </Layout.Sider>

        <Layout>
          <Layout.Header className="sidebarlayout-header">
            <Icon
              className="trigger"
              type={ui.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggleSidebar}
            />
            <h1>{title}</h1>
          </Layout.Header>

          <Layout.Content className="sidebarlayout-content">
            {breadcrumbLinks ?
              <Breadcrumb className="sidebarlayout-breadcrumb">
                {breadcrumbLinks.map(link => 
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

const uiConfig = {
  persist: true,
  state: {
    collapsed: false
  }
};

export default ui(uiConfig)(SidebarLayout);
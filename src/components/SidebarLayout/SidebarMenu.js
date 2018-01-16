import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session';

class SidebarMenu extends Component {
  handleMenuClick = async ({ item, key, keyPath }) => {
    switch (key) {
      case 'logout':
        await this.props.logoutDispatcher();
        this.props.history.push('/login');
        break;
      default:
    }
    
  }

  render() {
    const { username, selectedMenuKey, collapsed } = this.props;
    return (
      <Menu theme="dark" selectedKeys={[selectedMenuKey]} mode="inline" inlineCollapsed={collapsed} onClick={this.handleMenuClick}>
        <Menu.Item key="dashboard">
          <Link to="/"><Icon type="appstore-o" /><span>Dashboard</span></Link>
        </Menu.Item>
        <Menu.SubMenu
          key="students"
          title={<span><Icon type="contacts" /><span>Anggota</span></span>}
        >
          <Menu.Item key="students-active"><Link to="/students">Anggota aktif</Link></Menu.Item>
          <Menu.Item key="students-alumni"><Link to="/alumni">Alumni</Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="interactions"
          title={<span><Icon type="team" /><span>Mentoring</span></span>}
        >
          <Menu.Item key="interactions-pmb2018">PMB 2018</Menu.Item>
          <Menu.Item key="interactions-kelasagama2018ganjil">Kelas Agama 2018 (ganjil)</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="publications">
          <Link to="/publications"><Icon type="video-camera" /><span>Publikasi</span></Link>
        </Menu.Item>
        <Menu.SubMenu
          key="books"
          title={<span><Icon type="book" /><span>Buku</span></span>}
        >
          <Menu.Item key="books-catalog"><Link to="/books">Katalog</Link></Menu.Item>
          <Menu.Item key="books-loans"><Link to="/books/loans">Peminjaman</Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="equipment"
          title={<span><Icon type="tool" /><span>Perlengkapan</span></span>}
        >
          <Menu.Item key="equipment-inventory"><Link to="/equipment">Daftar barang</Link></Menu.Item>
          <Menu.Item key="equipment-loans"><Link to="/equipment/loans">Peminjaman</Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="users"
          title={<span><Icon type="idcard" /><span>Akun</span></span>}
        >
          <Menu.Item key="users-list"><Link to="/users">Daftar akun</Link></Menu.Item>
          <Menu.Item key="users-privileges"><Link to="/privileges">Hak akses</Link></Menu.Item>
          <Menu.Item key="users-profile"><Link to="/profile">{username}</Link></Menu.Item>
          <Menu.Item key="logout">Logout</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

SidebarMenu.propTypes = {
  selectedMenuKey: PropTypes.string
};

const mapStateToProps = state => {
  return {
    username: state.session.user && state.session.user.username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutDispatcher: () => dispatch(logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarMenu));

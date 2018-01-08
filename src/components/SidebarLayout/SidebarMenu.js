import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

class SidebarMenu extends Component {
  render() {
    return (
      <Menu theme="dark" selectedKeys={[this.props.selectedMenuKey]} mode="inline">
        <Menu.Item key="dashboard">
          <Link to="/"><Icon type="appstore-o" /><span>Dashboard</span></Link>
        </Menu.Item>
        <Menu.SubMenu
          key="students"
          title={<span><Icon type="contacts" /><span>Anggota</span></span>}
        >
          <Menu.Item key="students-active"><Link to="/students"><span>Anggota aktif</span></Link></Menu.Item>
          <Menu.Item key="students-alumni"><Link to="/alumni"><span>Alumni</span></Link></Menu.Item>
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
          <Menu.Item key="books-catalog"><Link to="/books"><span>Katalog</span></Link></Menu.Item>
          <Menu.Item key="books-loans"><Link to="/books/loans"><span>Peminjaman</span></Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="equipment"
          title={<span><Icon type="tool" /><span>Perlengkapan</span></span>}
        >
          <Menu.Item key="equipment-inventory"><Link to="/equipment"><span>Daftar barang</span></Link></Menu.Item>
          <Menu.Item key="equipment-loans"><Link to="/equipment/loans"><span>Peminjaman</span></Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="users"
          title={<span><Icon type="idcard" /><span>Akun</span></span>}
        >
          <Menu.Item key="users-list"><Link to="/users">Daftar akun</Link></Menu.Item>
          <Menu.Item key="users-privileges"><Link to="/privileges"><span>Hak akses</span></Link></Menu.Item>
          <Menu.Item key="users-profile"><Link to="/profile"><span>Pengaturan</span></Link></Menu.Item>
          <Menu.Item key="logout">Logout</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

export default SidebarMenu;
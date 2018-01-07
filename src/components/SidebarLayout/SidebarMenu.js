import React, { Component } from 'react';
import { Icon, Menu } from 'antd';

class SidebarMenu extends Component {
  render() {
    return (
      <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline">
        <Menu.Item key="dashboard">
          <Icon type="pie-chart" />
          <span>Dashboard</span>
        </Menu.Item>
        <Menu.SubMenu
          key="students"
          title={<span><Icon type="user" /><span>Anggota</span></span>}
        >
          <Menu.Item key="students-active">Anggota aktif</Menu.Item>
          <Menu.Item key="students-alumni">Alumni</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="interactions"
          title={<span><Icon type="user" /><span>Mentoring</span></span>}
        >
          <Menu.Item key="interactions-pmb2018">PMB 2018</Menu.Item>
          <Menu.Item key="interactions-kelasagama2018ganjil">Kelas Agama 2018 (ganjil)</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="publications">
          <Icon type="desktop" />
          <span>Publikasi</span>
        </Menu.Item>
        <Menu.SubMenu
          key="books"
          title={<span><Icon type="team" /><span>Buku</span></span>}
        >
          <Menu.Item key="books-catalog">Katalog</Menu.Item>
          <Menu.Item key="books-loan">Peminjaman</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="equipment"
          title={<span><Icon type="team" /><span>Perlengkapan</span></span>}
        >
          <Menu.Item key="equipment-inventory">Daftar barang</Menu.Item>
          <Menu.Item key="equipment-loan">Peminjaman</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="users"
          title={<span><Icon type="user" /><span>Akun</span></span>}
        >
          <Menu.Item key="users-list">Daftar akun</Menu.Item>
          <Menu.Item key="users-roles">Hak akses</Menu.Item>
          <Menu.Item key="users-edit">Pengaturan</Menu.Item>
          <Menu.Item key="logout">Logout</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

export default SidebarMenu;
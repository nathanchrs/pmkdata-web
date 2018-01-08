import React, { Component } from 'react';
import { Badge, Table } from 'antd';
import moment from 'moment';
import { displayDateTimeFormat } from '../../common/constants';
import './Users.css';
import SidebarLayout from '../../components/SidebarLayout/SidebarLayout';

const userStatusBadges = {
  active: <Badge status="success" text="Aktif" />,
  awaiting_validation: <Badge status="processing" text="Menunggu validasi" />,
  disabled: <Badge status="error" text="Tidak aktif" />
};

class UsersList extends Component {
  render() {

    const columns = [
      { title: 'Username', dataIndex: 'username', key: 'username' },
      { title: 'NIM', dataIndex: 'nim', key: 'nim' },
      { title: 'Nama', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Status', dataIndex: 'status', key: 'status',
        render: text => userStatusBadges[text] },
      { title: 'Dibuat pada', dataIndex: 'created_at', key: 'created_at',
        render: text => moment(text).format(displayDateTimeFormat) },
      { title: 'Diubah pada', dataIndex: 'updated_at', key: 'updated_at',
        render: text => moment(text).format(displayDateTimeFormat) }
    ];

    const sampleData = [
      { key: 1, username: 'nathanchrs', name: 'Nathan', nim: 13515001, email: 'nathanchrs@nathanchrs.com', status: 'awaiting_validation' }
    ];

    return (
      <SidebarLayout title="Akun" selectedMenuKey="users-list">
        
        <Table columns={columns} dataSource={sampleData} scroll={{ x: 1000 }} />

      </SidebarLayout>
    );
  }
}

export default UsersList;
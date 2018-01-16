import React, { Component } from 'react';
import { Alert, Table } from 'antd';
import moment from 'moment';
import { displayDateTimeFormat } from '../../common/constants';
import './Users.css';
import SidebarLayout from '../../components/SidebarLayout/SidebarLayout';
import SearchFilterDropdown from '../../components/SearchFilterDropdown/SearchFilterDropdown';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { getFilterIcon, getUserStatusBadge } from '../../common/parts';

class UsersList extends Component {
  state = {
    loading: false,
    usernameFilterDropdownVisible: false
  }

  handleFetchUsers = async (params) => {
    this.setState({ loading: true });
    await this.props.fetchUsersDispatcher(params);
    this.setState({ loading: false });
  }

  handleFilter = async (filters) => {
    const newParams = this.props.params;
    newParams.filters = filters;
    await this.handleFetchUsers(newParams);
  }

  componentDidMount() {
    this.handleFetchUsers(this.props.params);
  }

  render() {
    const columns = [
      { title: 'Username', dataIndex: 'username', key: 'username',
        filterDropdown: <SearchFilterDropdown
          placeholder="Cari username..."
          dataIndex="username"
          visible={this.state.usernameFilterDropdownVisible}
          onFilter={this.handleFilter}
          initialValue={this.props.params.filters.username}
        />,
        filterIcon: getFilterIcon(this.props.params.filters, 'username'),
        filterDropdownVisible: this.state.usernameFilterDropdownVisible,
        onFilterDropdownVisibleChange: visible => this.setState({ usernameFilterDropdownVisible: visible })
      },
      { title: 'NIM', dataIndex: 'nim', key: 'nim' },
      { title: 'Nama', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Status', dataIndex: 'status', key: 'status',
        render: text => getUserStatusBadge(text) },
      { title: 'Dibuat pada', dataIndex: 'created_at', key: 'created_at',
        render: text => moment(text).format(displayDateTimeFormat) },
      { title: 'Diubah pada', dataIndex: 'updated_at', key: 'updated_at',
        render: text => moment(text).format(displayDateTimeFormat) }
    ];

    return (
      <SidebarLayout title="Akun" selectedMenuKey="users-list">
        {this.props.error ? 
          <Alert message="Gagal memuat data akun." type="error" showIcon />
        :
          <Table
            columns={columns}
            dataSource={this.props.users}
            scroll={{ x: 1000 }}
            loading={this.state.loading}
          />
        }
      </SidebarLayout>
    );
  }
}

const mapStateToProps = state => {
  const { page, perPage, search, sort, filters } = state.users;
  let usersArray = [];
  for (let username in state.users.data) {
    usersArray.push(Object.assign(state.users.data[username], { key: username }));
  }
  return {
    users: usersArray,
    error: state.users.error,
    params: { page, perPage, search, sort, filters }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersDispatcher: (params) => dispatch(fetchUsers(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);

import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchUsers, deleteUser, updateUser } from '../../services/users/actions';
import { Input, Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm } from 'semantic-ui-react';
import EditUser, { EDIT_USER_FORM } from './EditUser'
import CreateUser, { CREATE_USER_FORM } from './CreateUser'
import { initialize } from 'redux-form';
import { enumText, userStatuses, userRoles } from '../../common/enums';
import { getFirstSortDirection } from '../../common/utils';

class Users extends React.Component {
  constructor (props) {
    super(props);
    this.state = {search: '', creatingUser: false, editingUser: null, deleteConfirmUser: null};
  }

  componentDidMount () {
    this.props.fetchUsersDispatcher(this.props.users);
  };

  handleSearchChange = (event) => {
    this.setState({search: event.target.value});
  };

  handleSearch = () => {
    this.props.fetchUsersDispatcher(Object.assign(this.props.users, {search: this.state.search}));
  };

  handleSort = (field) => {
    let sort = [{
      field,
      direction: getFirstSortDirection(this.props.users && this.props.users.sort, field) === 'ascending' ? 'descending' : 'ascending'
    }];
    this.props.fetchUsersDispatcher(Object.assign(this.props.users, {sort}));
  };

  handleCreateStart = () => {
    this.props.initCreateUserFormDispatcher();
    this.setState({creatingUser: true});
  };

  handleEditStart = ({username, nim, email, role, status}) => {
    this.props.initEditUserFormDispatcher({nim, email, role, status});
    this.setState({editingUser: {username, nim, email, role, status}});
  };

  render () {
    const {users, fetchUsersDispatcher, deleteUserDispatcher, validateUserDispatcher} = this.props;
    return (
      <AppLayout section='users'>
        <div style={{display: 'flex'}}>
          <div>
            <Header style={{margin: '5px 0'}}>
              Akun
              {users.search &&
              <small>{' - hasil pencarian untuk \'' + users.search + '\''}</small>
              }
            </Header>
          </div>

          <div style={{marginLeft: 'auto'}}>
            <Input type='text' placeholder='Cari...' style={{marginRight: '10px'}}
                   value={this.state.search} onChange={this.handleSearchChange}
                   action={<Button icon='search' onClick={this.handleSearch}/>}
            />
            <Button primary icon='add' onClick={this.handleCreateStart}/>
          </div>
        </div>

        <Table compact sortable unstackable attached={users.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing></Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(users.sort, 'username')}
                                onClick={() => this.handleSort('username')}>Username</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(users.sort, 'nim')}
                                onClick={() => this.handleSort('nim')}>NIM</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(users.sort, 'name')}
                                onClick={() => this.handleSort('name')}>Nama</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(users.sort, 'email')}
                                onClick={() => this.handleSort('email')}>Email</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(users.sort, 'role')}
                                onClick={() => this.handleSort('role')}>Jenis akun</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(users.sort, 'status')}
                                onClick={() => this.handleSort('status')}>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.data ? users.data.map((user) => (
              <Table.Row key={user.username}>
                <Table.Cell collapsing>
                  <Button size='mini' circular content='Edit' icon="edit"
                          onClick={() => this.handleEditStart(user)}/>
                  <Button size='mini' circular icon="trash" basic negative
                          onClick={() => this.setState({deleteConfirmUser: user})}/>
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.nim}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{enumText(userRoles, user.role)}</Table.Cell>
                <Table.Cell negative={user.status === 'disabled'}>
                  {enumText(userStatuses, user.status)}
                  { user.status === 'awaiting_validation' &&
                  <Button style={{marginLeft: '5px'}} size='mini' circular primary content='Validasi' icon="check"
                          onClick={() => validateUserDispatcher(user.username)}/>
                  }
                </Table.Cell>
              </Table.Row>
            )) :
              <Table.Row>
                <Table.Cell colSpan='7'><i>Tidak ada data yang sesuai.</i></Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>

        {users.error &&
        <Message error attached='bottom'>
          <Icon name='warning sign'/> {users.error}
        </Message>
        }

        <PageMenu floated='right' size='mini' storeKey='users' onPageChange={fetchUsersDispatcher}/>

        <Dimmer inverted active={users.isFetching}><Loader size='big'/></Dimmer>

        <Confirm
          open={!!this.state.deleteConfirmUser}
          content={'Yakin ingin menghapus akun '
          + (this.state.deleteConfirmUser && this.state.deleteConfirmUser.username) + '?'}
          confirmButton='Hapus'
          cancelButton='Batal'
          onCancel={() => this.setState({deleteConfirmUser: null})}
          onConfirm={() => {
            deleteUserDispatcher(this.state.deleteConfirmUser && this.state.deleteConfirmUser.username);
            this.setState({deleteConfirmUser: null})
          }
          }
        />

        <CreateUser open={this.state.creatingUser}
                    onClose={() => this.setState({creatingUser: false})}
        />

        <EditUser open={!!this.state.editingUser}
                  readOnlyValues={this.state.editingUser || {}}
                  onClose={() => this.setState({editingUser: null})}
        />

      </AppLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersDispatcher: (pageInfo) => dispatch(fetchUsers(pageInfo)),
    initCreateUserFormDispatcher: initialValues => dispatch(initialize(CREATE_USER_FORM)),
    initEditUserFormDispatcher: initialValues => dispatch(initialize(EDIT_USER_FORM, initialValues)),
    deleteUserDispatcher: (username) => dispatch(deleteUser(username)),
    validateUserDispatcher: (username) => dispatch(updateUser(username, {status: 'active'}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

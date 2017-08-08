import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchUsers, deleteUser } from '../../services/users/actions';
import { Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm } from 'semantic-ui-react';
import EditUser, { EDIT_USER_FORM } from './EditUser'
import { initialize } from 'redux-form';
import { enumText, userStatuses, userRoles } from '../../common/enums';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editingUser: null, warningOpen: false };
  }

  componentDidMount() {
    this.props.fetchUsersDispatcher(this.props.users);
  }

  handleEditStart = (event, { username, nim, email, role, status }) => {
    this.props.initEditUserFormDispatcher({ nim, email, role, status });
    this.setState({ editing: true, editingUser: { username, nim, email, role, status } });
  };

  handleEditDone = () => {
    this.setState({ editing: false, editingUser: null });
  };

  handleWarningOpen = (e) => this.setState({
    warningOpen: true,
  });

  handleWarningClose = (e) => this.setState({
    warningOpen: false,
  });

  handleDelete = (event, id) => {
    this.props.deleteUserDispatcher(id);
    this.handleWarningClose(event);
  }

  render() {
    const { users, isSupervisor, fetchUsersDispatcher } = this.props;
    return (
      <AppLayout section='users'>
        <Header>Akun</Header>

        <Table compact selectable attached={users.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>NIM</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Jenis akun</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.data ? users.data.map((user) => (
              <Table.Row key={user.username}>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.nim}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{enumText(userRoles, user.role)}</Table.Cell>
                <Table.Cell
                  negative={user.status === 'disabled'}
                  warning={user.status === 'awaiting_validation'}>
                  {enumText(userStatuses, user.status)}
                </Table.Cell>
                <Table.Cell><Button icon="edit" onClick={(e) => this.handleEditStart(e, user)} /></Table.Cell>
                <Table.Cell><Button icon="delete" negative onClick={this.handleWarningOpen} /></Table.Cell>
                <Confirm
                  open={this.state.warningOpen}
                  content='This action cannot be undone!'
                  onCancel={this.handleWarningClose}
                  onConfirm={(e) => this.handleDelete(e, user.username)}
                />
              </Table.Row>
            )) :
              <Table.Row>
                <Table.Cell colSpan='5'><i>Tidak ada data yang sesuai.</i></Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>

        {users.error &&
          <Message error attached='bottom'>
            <Icon name='warning sign'/> {users.error}
          </Message>
        }

        <PageMenu floated='right' size='mini' storeKey='users' onPageChange={fetchUsersDispatcher} />

        <Dimmer inverted active={users.isFetching}><Loader size='big' /></Dimmer>
        <EditUser open={this.state.editing} readOnlyValues={this.state.editingUser || {}} onClose={this.handleEditDone} />

      </AppLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersDispatcher: (pageInfo) => dispatch(fetchUsers(pageInfo)),
    initEditUserFormDispatcher: initialValues => dispatch(initialize(EDIT_USER_FORM, initialValues)),
    deleteUserDispatcher: (username) => dispatch(deleteUser(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

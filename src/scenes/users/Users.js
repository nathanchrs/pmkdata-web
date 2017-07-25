import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchUsers } from '../../services/users/actions';
import { Dimmer, Header, Icon, Loader, Message, Table } from 'semantic-ui-react';

class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsersDispatcher(this.props.users);
  }

  render() {
    const { users, isSupervisor, fetchUsersDispatcher } = this.props;
    return (
      <AppLayout section='users'>
        <Dimmer inverted active={users.isFetching}><Loader size='big' /></Dimmer>

        <Header>Akses</Header>

        <Table compact attached={users.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>NIM</Table.HeaderCell>
              <Table.HeaderCell>Nama</Table.HeaderCell>
              <Table.HeaderCell>Akses</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.data ? users.data.map(({ username, nim, role, status }) => (
              <Table.Row key={username}>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>{nim}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>{role}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>
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
    fetchUsersDispatcher: (pageInfo) => dispatch(fetchUsers(pageInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

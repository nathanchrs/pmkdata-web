import React from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { initialize } from 'redux-form';
import { logout } from '../../services/session/actions';
import EditUserPassword, { EDIT_USER_PASSWORD_FORM } from '../../scenes/users/EditUserPassword';
import pmkLogo from '../resources/pmklogo.png';

class AppLayout extends React.Component {
  constructor (props) {
    super(props);
    this.state = {editingUserPassword: null};
  }

  handleEditPasswordStart = (user) => {
    this.props.initEditUserPasswordFormDispatcher({oldPassword: '', newPassword: '', confirmNewPassword: ''});
    this.setState({editingUserPassword: user});
  };

  render () {
    const { isSupervisor, user, section, onLogout, history } = this.props;
    return (
      <Sidebar.Pushable>
        <Sidebar as={Menu} borderless animation='overlay' width='very thin' visible vertical inverted icon='labeled' size='tiny'>
          <br />
          <Menu.Item header><img src={pmkLogo} alt='PMK ITB logo' /><br /><br />PMK ITB</Menu.Item>

          <Divider />
          <Menu.Item active={section === 'interactions'} name='interactions' link as={Link} to='/interactions'>
            <Icon name='file text' />Laporan
          </Menu.Item>
          <Menu.Item active={section === 'mentees'} name='mentees' link as={Link} to='/mentees'>
            <Icon name='users' />Mentee
          </Menu.Item>

          {isSupervisor && (
            <div>
              <Divider />
              <Menu.Item active={section === 'students'} name='students' link as={Link} to='/students'>
                <Icon name='student' />Data Anggota
              </Menu.Item>
              <Menu.Item active={section === 'users'} name='users' link as={Link} to='/users'>
                <Icon name='address book outline' />Akun
              </Menu.Item>
            </div>
          )}

          <Divider />
          <Menu.Item name='editPassword' link onClick={() => this.handleEditPasswordStart(user)}>
            <Icon name='key' />Ubah Password
          </Menu.Item>
          <Menu.Item name='logout' link onClick={() => onLogout(history)} style={{ wordWrap: 'break-word' }}>
            <Icon name='log out' />Logout ({this.props.user && this.props.user.username})
          </Menu.Item>

        </Sidebar>
        <Sidebar.Pusher>
          <Container fluid style={{ padding: '20px 2.4vw' }}>
            {this.props.children}
          </Container>

          <EditUserPassword open={!!this.state.editingUserPassword}
                            isSupervisor={isSupervisor}
                            readOnlyValues={this.state.editingUserPassword || {}}
                            onClose={() => this.setState({editingUserPassword: null})}
          />

        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.session.user,
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (history) => { dispatch(logout(history)); },
    initEditUserPasswordFormDispatcher: initialValues => dispatch(initialize(EDIT_USER_PASSWORD_FORM, initialValues))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLayout));

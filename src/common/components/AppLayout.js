import React from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../../services/session/actions';
import pmkLogo from '../resources/pmklogo.png';

class AppLayout extends React.Component {
  render () {
    const { isSupervisor, section, onLogout, history } = this.props;
    return (
      <Sidebar.Pushable>
        <Sidebar as={Menu} borderless animation='overlay' width='very thin' visible vertical inverted icon='labeled' size='tiny'>
          <br />
          <Menu.Item header><img src={pmkLogo} alt='PMK ITB logo' /><br /><br />PMK ITB</Menu.Item>

          <Divider />
          <Menu.Item active={section === 'interactions'} name='interactions' link as={Link} to='/interactions'>
            <Icon name='file text' />Laporan
          </Menu.Item>

          {isSupervisor && (
            <div>
              <Divider />
              <Menu.Item active={section === 'students'} name='students' link as={Link} to='/students'>
                <Icon name='users' />Data Anggota
              </Menu.Item>
              <Menu.Item active={section === 'users'} name='users' link as={Link} to='/users'>
                <Icon name='address book outline' />Akun
              </Menu.Item>
            </div>
          )}

          <Divider />
          <Menu.Item name='logout' link onClick={() => onLogout(history)} style={{ wordWrap: 'break-word' }}>
            <Icon name='log out' />Logout ({this.props.username})
          </Menu.Item>

        </Sidebar>
        <Sidebar.Pusher>
          <Container fluid style={{ padding: '20px 2.4vw' }}>
            {this.props.children}
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.session.user && state.session.user.username,
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (history) => { dispatch(logout(history)); }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLayout));

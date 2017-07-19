import React from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logout } from '../services/session/actions';
import pmkLogo from'../common/pmklogo.png';

class AppLayout extends React.Component {
  render() {
    const { isSupervisor, section } = this.props;
    return (
      <Sidebar.Pushable>
        <Sidebar as={Menu}  borderless animation='slide along' width='very thin' visible vertical inverted icon='labeled' size='tiny'>
          <br />
          <Menu.Item header><img src={pmkLogo} alt='PMK ITB logo' /><br /><br />PMK ITB</Menu.Item>

          <Divider />
          <Menu.Item active={section === 'events'} name='events' link as={Link} to='/events'>
            <Icon name='calendar outline' />Kegiatan
          </Menu.Item>
          <Menu.Item active={section === 'mentors'} name='mentors' link as={Link} to='/mentors'>
            <Icon name='street view' />Mentor
          </Menu.Item>
          <Menu.Item active={section === 'interactions'} name='interactions' link as={Link} to='/interactions'>
            <Icon name='file text' />Interaksi
          </Menu.Item>

          {isSupervisor && (
            <div>
              <Divider />
              <Menu.Item active={section === 'students'} name='students' link as={Link} to='/students'>
                <Icon name='users' />Anggota
              </Menu.Item>
              <Menu.Item active={section === 'users'} name='users' link as={Link} to='/users'>
                <Icon name='address book outline' />Akses
              </Menu.Item>
            </div>
          )}

          <Divider />
          <Menu.Item name='logout' link onClick={this.props.onLogout}>
            <Icon name='log out' />Logout
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
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => { dispatch(logout()); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);

import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Header } from 'semantic-ui-react';
import { logout } from '../services/session/actions';

class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <Header size='huge'>Dashboard</Header>
        <Button onClick={this.props.onLogout}>Logout</Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => { dispatch(logout()); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

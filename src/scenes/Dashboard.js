import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../common/components/AppLayout';
import { Divider, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    return (
      <AppLayout section='events'>
        <Header>Dashboard</Header>
        Hello world!
      </AppLayout>
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

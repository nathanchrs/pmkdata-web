import React, { Component } from 'react';
import './Dashboard.css';
import SidebarLayout from '../../components/SidebarLayout/SidebarLayout';

class Dashboard extends Component {
  render() {
    return (
      <SidebarLayout title="Dashboard" selectedMenuKey="dashboard">
        Test
      </SidebarLayout>
    );
  }
}

export default Dashboard;
import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import { fetchUserMentees } from '../../services/mentees/actions';
import { Dimmer, Header, Icon, Loader, Message, Table } from 'semantic-ui-react';

class Mentees extends React.Component {
  componentDidMount () {
    this.props.fetchUserMenteesDispatcher(this.props.user.id);
  };

  render () {
    const {mentees} = this.props;
    return (
      <AppLayout section='mentees'>
        <div style={{display: 'flex'}}>
          <div>
            <Header style={{margin: '5px 0'}}>Mentee</Header>
          </div>
        </div>

        <Table unstackable attached={mentees.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nama</Table.HeaderCell>
              <Table.HeaderCell>NIM</Table.HeaderCell>
              <Table.HeaderCell>Fakultas/prodi</Table.HeaderCell>
              <Table.HeaderCell>Angkatan</Table.HeaderCell>
              <Table.HeaderCell>LINE</Table.HeaderCell>
              <Table.HeaderCell>Asal sekolah</Table.HeaderCell>
              <Table.HeaderCell>Gereja</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {mentees.data ? mentees.data.map((mentee) => (
              <Table.Row key={mentee.id}>
                <Table.Cell>{mentee.name}</Table.Cell>
                <Table.Cell>{mentee.nim}</Table.Cell>
                <Table.Cell>{mentee.department}</Table.Cell>
                <Table.Cell>{mentee.year}</Table.Cell>
                <Table.Cell>{mentee.line}</Table.Cell>
                <Table.Cell>{mentee.high_school}</Table.Cell>
                <Table.Cell>{mentee.church}</Table.Cell>
              </Table.Row>
            )) :
              <Table.Row>
                <Table.Cell colSpan='7'><i>Tidak ada data yang sesuai.</i></Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>

        {mentees.error &&
        <Message error attached='bottom'>
          <Icon name='warning sign'/> {mentees.error}
        </Message>
        }

        <Dimmer inverted active={mentees.isFetching}><Loader size='big'/></Dimmer>
      </AppLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.session.user,
    mentees: state.mentees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserMenteesDispatcher: (userId) => dispatch(fetchUserMentees(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mentees);

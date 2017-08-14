import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchEvents } from '../../services/events/actions';
import { Dimmer, Header, Icon, Loader, Message, Table } from 'semantic-ui-react';
import EditEvent, { EDIT_USER_FORM } from './EditEvent'
import { initialize } from 'redux-form';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editingEvent: null };
  }

  componentDidMount() {
    this.props.fetchEventsDispatcher(this.props.events);
  }

  handleEditStart = (event, { id, name, description }) => {
    this.props.initEditEventFormDispatcher({ name, description });
    this.setState({ editing: true, editingEvent: { id, name, description } });
  };

  handleEditDone = () => {
    this.setState({ editing: false, editingEvent: null });
  };

  render() {
    const { events, fetchEventsDispatcher } = this.props;
    return (
      <AppLayout section='events'>
        <Header>Kegiatan</Header>

        <Table compact selectable attached={events.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Nama kegiatan</Table.HeaderCell>
              <Table.HeaderCell>Deskripsi kegiatan</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {events.data ? events.data.map((event) => (
              <Table.Row key={event.id} onClick={(e) => this.handleEditStart(e, event)}>
                <Table.Cell>{event.id}</Table.Cell>
                <Table.Cell>{event.name}</Table.Cell>
                <Table.Cell>{event.description}</Table.Cell>
              </Table.Row>
            )) :
              <Table.Row>
                <Table.Cell colSpan='3'><i>Tidak ada data yang sesuai.</i></Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>

        {events.error &&
        <Message error attached='bottom'>
          <Icon name='warning sign'/> {events.error}
        </Message>
        }

        <PageMenu floated='right' size='mini' storeKey='events' onPageChange={fetchEventsDispatcher} />

        <Dimmer inverted active={events.isFetching}><Loader size='big' /></Dimmer>
        <EditEvent open={this.state.editing} readOnlyValues={this.state.editingEvent || {}} onClose={this.handleEditDone} />

      </AppLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events,
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventsDispatcher: (pageInfo) => dispatch(fetchEvents(pageInfo)),
    initEditEventFormDispatcher: initialValues => dispatch(initialize(EDIT_EVENT_FORM, initialValues))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);

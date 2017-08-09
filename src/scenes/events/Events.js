import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchEvents, deleteEvent } from '../../services/events/actions';
import { Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm } from 'semantic-ui-react';
import EditEvent, { EDIT_EVENT_FORM } from './EditEvent';
import CreateEvent, { CREATE_EVENT_FORM } from './CreateEvent';
import { initialize } from 'redux-form';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editingEvent: null, creating: false, warningOpen: false};
  }

  componentDidMount() {
    this.props.fetchEventsDispatcher(this.props.events);
  }

  handleEditStart = (event, { id, name, description }) => {
    this.props.initEditEventFormDispatcher({ id, name, description });
    this.setState({ editing: true, editingEvent: { id, name, description } });
  };

  handleEditDone = () => {
    this.setState({ editing: false, editingEvent: null });
  };

  handleCreateStart = () => {
    this.props.initCreateEventFormDispatcher();
    this.setState({ creating: true });
  };

  handleCreateDone = () => {
    this.setState({ creating: false });
  };

  handleWarningOpen = (e) => this.setState({
    warningOpen: true,
  });

  handleWarningClose = (e) => this.setState({
    warningOpen: false,
  });

  handleDelete = (event, id) => {
    this.props.deleteEventDispatcher(id);
    this.handleWarningClose(event);
  }

  render() {
    const { events, isSupervisor, fetchEventsDispatcher } = this.props;
    return (
      <AppLayout section='events'>
        <Header floated='left'>Event</Header>
        <Header floated='right'>
          <Button icon='plus' onClick={() => this.handleCreateStart()} />
        </Header>
        <Table compact selectable attached={events.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Event Id</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {events.data ? events.data.map((event) => (
              <Table.Row key={event.id}>
                <Table.Cell>{event.id}</Table.Cell>
                <Table.Cell>{event.name}</Table.Cell>
                <Table.Cell>{event.description}</Table.Cell>
                <Table.Cell><Button icon="edit" onClick={(e) => this.handleEditStart(e, event)} /></Table.Cell>
                <Table.Cell><Button icon="delete" negative onClick={this.handleWarningOpen} /></Table.Cell>
                <Confirm
                  open={this.state.warningOpen}
                  content='This action cannot be undone!'
                  onCancel={this.handleWarningClose}
                  onConfirm={(e) => this.handleDelete(e, event.id)}
                />
              </Table.Row>
            )) :
              <Table.Row>
                <Table.Cell colSpan='5'><i>Tidak ada data yang sesuai.</i></Table.Cell>
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
        <CreateEvent open={this.state.creating} onClose={this.handleCreateDone} />
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
    initEditEventFormDispatcher: initialValues => dispatch(initialize(EDIT_EVENT_FORM, initialValues)),
    initCreateEventFormDispatcher: () => dispatch(initialize(CREATE_EVENT_FORM)),
    deleteEventDispatcher: (id) => dispatch(deleteEvent(id)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);

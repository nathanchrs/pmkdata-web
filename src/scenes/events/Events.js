import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchEvents, deleteEvent } from '../../services/events/actions';
import { fetchMentors } from '../../services/mentors/actions';
import { Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm, Modal } from 'semantic-ui-react';
import EditEvent, { EDIT_EVENT_FORM } from './EditEvent';
import CreateEvent, { CREATE_EVENT_FORM } from './CreateEvent';
import { createMentor } from '../../services/mentors/actions';
import { initialize } from 'redux-form';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editingEvent: null, creating: false, warningOpen: false, creatingOpen: false};
  }

  componentDidMount() {
    this.props.fetchEventsDispatcher(this.props.events);
    this.props.isSupervisor ? this.props.fetchMentorsDispatcher(this.props.mentors) : this.props.fetchMentorsDispatcher({filters: {filter: "{\"username\":\"" + this.props.username + "\"}"}});
  }

  handleEditStart = (event, { id, name, description }) => {
    this.props.initEditEventFormDispatcher({ id, name, description });
    this.setState({ editing: true, editingEvent: { id, name, description } });
  };

  handleEditDone = () => {
    this.setState({ editing: false, editingEvent: null });
  };

  handleCreatingOpen = (e) => this.setState({
    creatingOpen: true,
  });

  handleCreatingClose = (e) => this.setState({
    creatingOpen: false,
  });

  handleCreateMentor= (event, id) => {
    this.props.createMentorByEventDispatcher({ mentor_username: this.props.username, event_id: id });
    this.handleWarningClose(event);
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
    const { events, mentors, isSupervisor, fetchEventsDispatcher } = this.props;
    return (
      <AppLayout section='events'>
        <Header floated='left'>Event</Header>
        {
          isSupervisor && 
          <Header floated='right'>
            <Button icon='plus' onClick={() => this.handleCreateStart()} />
          </Header>
        }
        <Table compact selectable attached={events.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>Nama</Table.HeaderCell>
              <Table.HeaderCell>Deskripsi</Table.HeaderCell>
              <Table.HeaderCell>Mentor</Table.HeaderCell>
              {
                isSupervisor &&
                <Table.HeaderCell>Edit</Table.HeaderCell>
              }
              {
                isSupervisor &&
                <Table.HeaderCell>Delete</Table.HeaderCell>   
              }
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {events.data ? events.data.map((event) => (
              <Table.Row key={event.id}>
                <Table.Cell>{event.id}</Table.Cell>
                <Table.Cell>{event.name}</Table.Cell>
                <Table.Cell>{event.description}</Table.Cell>
                {mentors.data.some(mentor => mentor.event_id === event.id && mentor.mentor_username === this.props.username) ?
                    <Table.Cell>
                      Anda sudah mendaftarkan diri menjadi mentor
                    </Table.Cell>
                  :
                    <Table.Cell>
                      <Modal
                        trigger={<Button positive onClick={this.handleCreatingOpen} content="Registrasi" />}
                        open={this.state.creatingOpen}
                        onClose={this.handleCreatingClose}
                        size='small'
                      >
                        <Header icon='browser' content={'Pendaftaran Mentor ' + event.name} />
                        <Modal.Content>
                          <h3>Daftar jadi mentor di event : {event.name} ?</h3>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color='red' onClick={this.handleCreatingClose} inverted>
                            <Icon name='checkmark' /> Tidak
                          </Button>
                          <Button color='green' onClick={(e) => this.handleCreateMentor(e, event.id)} inverted>
                            <Icon name='checkmark' /> Ya
                          </Button>                      
                        </Modal.Actions>
                      </Modal>
                    </Table.Cell>
                }
                {
                  isSupervisor &&
                  <Table.Cell><Button icon="edit" onClick={(e) => this.handleEditStart(e, event)} /></Table.Cell>
                }
                {
                  isSupervisor &&
                  <Table.Cell><Button icon="delete" negative onClick={this.handleWarningOpen} /></Table.Cell>
                }
                {
                  isSupervisor &&
                  <Confirm
                    open={this.state.warningOpen}
                    content='This action cannot be undone!'
                    onCancel={this.handleWarningClose}
                    onConfirm={(e) => this.handleDelete(e, event.id)}
                  />
                }
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
    mentors: state.mentors,
    username: state.session.user.username,
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventsDispatcher: (pageInfo) => dispatch(fetchEvents(pageInfo)),
    initEditEventFormDispatcher: initialValues => dispatch(initialize(EDIT_EVENT_FORM, initialValues)),
    initCreateEventFormDispatcher: () => dispatch(initialize(CREATE_EVENT_FORM)),
    createMentorByEventDispatcher: (value) => dispatch(createMentor(value)),
    fetchMentorsDispatcher: (pageInfo) => dispatch(fetchMentors(pageInfo)), 
    deleteEventDispatcher: (id) => dispatch(deleteEvent(id)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);

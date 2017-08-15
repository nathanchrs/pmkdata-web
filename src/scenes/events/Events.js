import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchEvents, deleteEvent } from '../../services/events/actions';
import { fetchMentors } from '../../services/mentors/actions';
import { userStatuses, enumText } from '../../common/enums';
import { Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm } from 'semantic-ui-react';
import EditEvent, { EDIT_EVENT_FORM } from './EditEvent';
import CreateEvent, { CREATE_EVENT_FORM } from './CreateEvent';
import { createMentor } from '../../services/mentors/actions';
import { initialize } from 'redux-form';
import EventId from './EventById';
import SearchBox from '../../common/components/SearchBox';

const StatusMentor = ({ mentors, event, createMentor, username }) => {
  const mentor = mentors.data ? mentors.data.find(mentor => mentor.event_id === event.id && mentor.mentor_username === username) : undefined;
  if(mentor === undefined) {
    return (
      <Table.Cell>
        <Button positive onClick={(e) => createMentor(e, event.id)}>Registrasi</Button>
      </Table.Cell>
    );
  }

  return (
    <Table.Cell
      negative={mentor.status === 'disabled'}
      warning={mentor.status === 'awaiting_validation'}
    >
    {enumText(userStatuses, mentor.status)}
    </Table.Cell>
  );
}

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editing: false, 
      editingEvent: null, 
      creating: false, 
      warningOpen: false, 
      search: ''
    };
  }

  componentDidMount() {
    this.resetSearch();
    this.props.fetchEventsDispatcher(this.props.events);
    this.props.isSupervisor ? this.props.fetchMentorsDispatcher(this.props.mentors) : this.props.fetchMentorsDispatcher({filters: {filter: this.props.username }});
  }

  // ------------ Editing
  handleEditStart = (event, { id, name, description }) => {
    this.props.initEditEventFormDispatcher({ id, name, description });
    this.setState({ editing: true, editingEvent: { id, name, description } });
  };

  handleEditDone = () => {
    this.setState({ editing: false, editingEvent: null });
  };

  // ------------ Daftar mentor
  handleCreateMentor = (e, id) => { 
    this.props.createMentorByEventDispatcher({ mentor_username: this.props.username, event_id: id });
  };

  // ------------ New event
  handleCreateStart = () => {
    this.props.initCreateEventFormDispatcher();
    this.setState({ creating: true });
  };

  handleCreateDone = () => {
    this.setState({ creating: false });
  };

  // ------------ Delete event
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

  // Search Box
  resetSearch = () => {
    this.setState({ search: ''});
    this.props.fetchEventsDispatcher(Object.assign(this.props.events, {search: this.state.search}));
  }
  
  handleSearch = (search) => {
    this.setState({ search });
    this.props.fetchEventsDispatcher(Object.assign(this.props.events, {search: this.state.search}));
  }

  render() {
    const { events, mentors, isSupervisor, username, fetchEventsDispatcher } = this.props;
    let colSpan = 4;
    
    if(this.props.match.params.id) {
       return isSupervisor ? <EventId id={this.props.match.params.id} /> : <Redirect to='/events' />;
    }

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
              <Table.HeaderCell colSpan={isSupervisor ? colSpan+2 : colSpan}>
                <
                  SearchBox 
                  dispatcher={this.props.fetchEventsDispatcher}
                  storeKey='events' 
                />
              </Table.HeaderCell>
            </Table.Row>
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
                <Table.Cell>{isSupervisor ? <Link to={'/events/' + event.id}>{event.id}</Link> : event.id}</Table.Cell>
                <Table.Cell>{event.name}</Table.Cell>
                <Table.Cell>{event.description}</Table.Cell>
                <
                  StatusMentor 
                  event={event} 
                  mentors={mentors}
                  createMentor={this.handleCreateMentor} 
                  username={username} 
                />
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

        <Dimmer inverted active={events.isFetching || mentors.isFetching}><Loader size='big' /></Dimmer>
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

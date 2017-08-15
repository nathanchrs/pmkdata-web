import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { userStatuses, enumText } from '../../common/enums';
import { fetchEvents } from '../../services/events/actions';
import { fetchMentors, deleteMentor } from '../../services/mentors/actions';
import { Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm } from 'semantic-ui-react';
import EditMentor, { EDIT_MENTOR_FORM } from './EditMentor';
import CreateMentor, { CREATE_MENTOR_FORM } from './CreateMentor';
import { initialize } from 'redux-form';
import SearchBox from '../../common/components/SearchBox';

class Mentors extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editingMentor: null, creating: false, warningOpen: false, search: ''};
  }

  componentDidMount() {
    this.resetSearch();
    this.props.fetchEventsDispatcher(Object.assign(this.props.events, {search: ''}));
    this.props.isSupervisor ? this.props.fetchMentorsDispatcher(this.props.mentors) : this.props.fetchMentorsDispatcher({filters: {filter: this.props.username }});
  }

  handleEditStart = (event, { id, mentor_username, event_id, status }) => {
    this.props.initEditMentorFormDispatcher({ id, mentor_username, event_id, status });
    this.setState({ editing: true, editingMentor: { id, mentor_username, event_id, status } });
  };

  handleEditDone = () => {
    this.setState({ editing: false, editingMentor: null });
  };

  handleCreateStart = () => {
    this.props.initCreateMentorFormDispatcher();
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
    this.props.deleteMentorDispatcher(id);
    this.handleWarningClose(event);
  }

  getEventName = (id) => {
    const { events } = this.props;
    const event = events.data ? events.data.find(event => event.id === id) : undefined;
    if(event !== undefined) return event.name;
    return '';
  }

  // Search Box
  resetSearch = () => {
    this.setState({ search: ''});
    this.props.fetchMentorsDispatcher(Object.assign(this.props.mentors, {search: this.state.search}));
  }

  handleSearch = (search) => {
    this.setState({ search });
    this.props.fetchMentorsDispatcher(Object.assign(this.props.mentors, {search: this.state.search}));
  }

  render() {
    const { mentors, isSupervisor, fetchMentorsDispatcher } = this.props;
    let colSpan = 4;
    return (
      <AppLayout section='mentors'>
        <Header floated='left'>Mentor</Header>
        {
          isSupervisor &&
          <Header floated='right'>
            <Button icon='plus' onClick={() => this.handleCreateStart()} />
          </Header>
        }
        <Table compact selectable attached={mentors.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={isSupervisor ? colSpan+2 : colSpan}>
                <
                  SearchBox 
                  dispatcher={this.props.fetchMentorsDispatcher}
                  storeKey='mentors'
                />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Kegiatan</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
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
            {mentors.data ? mentors.data.map((mentor) => (
              <Table.Row key={mentor.id}>
                <Table.Cell>{mentor.id}</Table.Cell>
                <Table.Cell>{mentor.mentor_username}</Table.Cell>
                <Table.Cell>{this.getEventName(mentor.event_id)}</Table.Cell>
                <Table.Cell
                    negative={mentor.status === 'disabled'}
                    warning={mentor.status === 'awaiting_validation'}
                >
                {enumText(userStatuses, mentor.status)}
                </Table.Cell>
                {
                  isSupervisor &&
                  <Table.Cell><Button icon="edit" onClick={(e) => this.handleEditStart(e, mentor)} /></Table.Cell>
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
                    onConfirm={(e) => this.handleDelete(e, mentor.id)}
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
        
        {
          mentors.error &&
          <Message error attached='bottom'>
            <Icon name='warning sign'/> {mentors.error}
          </Message>
        }

        <PageMenu floated='right' size='mini' storeKey='mentors' onPageChange={fetchMentorsDispatcher} />

        <Dimmer inverted active={mentors.isFetching}><Loader size='big' /></Dimmer>
        <EditMentor open={this.state.editing} readOnlyValues={this.state.editingMentor || {}} onClose={this.handleEditDone} />
        <CreateMentor open={this.state.creating} onClose={this.handleCreateDone} />
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
    fetchMentorsDispatcher: (pageInfo) => dispatch(fetchMentors(pageInfo)),
    initEditMentorFormDispatcher: initialValues => dispatch(initialize(EDIT_MENTOR_FORM, initialValues)),
    initCreateMentorFormDispatcher: () => dispatch(initialize(CREATE_MENTOR_FORM)),
    deleteMentorDispatcher: (id) => dispatch(deleteMentor(id)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mentors);

import React from 'react';
import { Header, Segment, Dimmer, Loader, Icon, Label } from 'semantic-ui-react';
import { fetchEvents } from '../../services/events/actions';
import { deleteMentor, fetchMentors } from '../../services/mentors/actions';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import cloneDeep from 'lodash.clonedeep';

const colorChooser = (status) => {
  switch(status) {
    case 'awaiting_validation':
      return 'yellow';
    case 'disabled':
      return 'red';
    default:
      return 'blue';
  }
}

class EventId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        mentors: []
      }
    };
  }

  componentDidMount() {
    const { events, id, fetchEventsDispatcher, fetchMentorsDispatcher, mentors } = this.props;
    fetchEventsDispatcher(events);
    fetchMentorsDispatcher(mentors);
    const event = events.data ? events.data.find((eventEl) => {return eventEl.id === parseInt(id, 10); }) : null;
    this.setState({
      event
    })
  }

  componentWillReceiveProps(nextProps) {
    const { events, id } = this.props;
    if(this.props.mentors.data !== nextProps.mentors.data) {
      const event = events.data ? events.data.find((eventEl) => {return eventEl.id === parseInt(id, 10); }) : null;
      this.setState({
        event
      })
    }
  }

  handleDeleteMentor = (e, id) => {
    const { event } = this.state;
    this.props.deleteMentorDispatcher(id);
    this.props.fetchEventsDispatcher(this.props.events);
    let newEvent = cloneDeep(event);
    newEvent.mentors = newEvent.mentors.filter((eventEl) => (eventEl.id !== id || eventEl.id !== null));
    this.setState({
      event: newEvent
    });
  }

  render() {
    const { event } = this.state;

    return(
      <AppLayout section='events'>
      <Header>Event</Header>
        {
          event && 
          <div>
            <Header as='h2' attached='top'>
              <Icon name='calendar outline' />
              <Header.Content>
                {event.name}
                <Header.Subheader>
                  Id : {event.id}
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Segment attached>
              {event.description}
            </Segment>
            <Segment attached>
              <Header as='h3'>Daftar Mentor</Header>
              {event.mentors.length > 0 ? event.mentors.map((mentor, key) => (
                <Label key={key} color={colorChooser(mentor.status)}>
                  <Icon name='user'/>
                    {mentor.username}
                    <Label.Detail>{mentor.status}</Label.Detail>
                  <Icon name='delete' onClick={e => this.handleDeleteMentor(e, mentor.id)} />
                </Label>
              ))
              :
                <div>Mentor tidak ditemukan!</div>
              }
            </Segment>
            <Dimmer inverted active={event.isFetching}><Loader size='big' /></Dimmer>
          </div>
        }
      </AppLayout>
    );
  }
}

EventId.propTypes = {

}

const mapStateToProps = state => {
  return {
    events: state.events,
    mentors: state.mentors,
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventsDispatcher: (pageInfo) => dispatch(fetchEvents(pageInfo)),
    fetchMentorsDispatcher: (pageInfo) => dispatch(fetchMentors(pageInfo)), 
    deleteMentorDispatcher: (id) => dispatch(deleteMentor(id)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventId);
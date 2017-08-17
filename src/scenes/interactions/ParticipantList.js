import React from 'react';
import { Button, Dimmer, Loader, Search, Divider, List } from 'semantic-ui-react';
import { fetchInteractionParticipants, addInteractionParticipant, removeInteractionParticipant }
  from '../../services/interactions/actions';
import { searchStudents } from '../../services/students/actions';
import { searchUserMentees } from '../../services/mentees/actions';
import { connect } from 'react-redux';

class ParticipantList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {listLoading: false, searchLoading: false, searchResults: [], searchValue: '', participants: []};
  }

  componentWillMount () {
    this.resetComponent();
  }

  resetComponent = async () => {
    const {interaction} = this.props;
    if (interaction && interaction.id) {
      this.setState({listLoading: true});
      let participants = await this.props.fetchInteractionParticipantsDispatcher(interaction.id);
      this.setState({listLoading: false, searchLoading: false, searchResults: [], searchValue: '', participants});
    }
  };

  handleResultSelect = async (e, {result}) => {
    this.setState({searchValue: result.title || result.description });
    await this.props.addInteractionParticipantDispatcher(this.props.interaction.id, result.id);
    this.resetComponent();
  };

  handleSearchChange = async (e, {value}) => {
    this.setState({searchLoading: true, searchValue: value});
    if (value.length < 1) return this.resetComponent();

    //let results = await this.props.searchUserMenteesDispatcher(this.props.user.id, value);
    let results = await this.props.searchStudentsDispatcher(value);
    results = results.map(({id, name, department, year}) => ({id, title: name, description: year + ' | ' + department}));
    this.setState({searchLoading: false, searchResults: results});
  };

  render () {
    const {interaction, removeInteractionParticipantDispatcher} = this.props;
    const {listLoading, searchLoading, searchResults, searchValue} = this.state;
    return (
      <div>
        <Search fluid icon='add' placeholder='Tambahkan mentee...' loading={searchLoading}
                results={searchResults} value={searchValue}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
        />

        <Divider hidden />
        <List divided relaxed verticalAlign='middle'>
          <Dimmer inverted active={listLoading}>
            <Loader />
          </Dimmer>
          {this.state.participants.map(participant => (
            <List.Item key={participant.id}>
              <List.Content floated='right'>
                <Button basic circular icon='trash' negative onClick={
                  async () => {
                    await removeInteractionParticipantDispatcher(interaction.id, participant.student_id);
                    this.resetComponent();
                  }
                }/>
              </List.Content>
              <List.Content>
                <List.Header>{participant.name}</List.Header>
                <List.Description>{
                  (participant.year ? participant.year : '')
                  + (participant.department ? ' | ' + participant.department : '')
                }</List.Description>
              </List.Content>
            </List.Item>
          ))}
          {(!this.state.participants || this.state.participants.length <= 0) &&
          <i>Belum ada mentee yang ditambahkan untuk laporan ini.</i>
          }
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.session.user
  };
};


const mapDispatchToProps = dispatch => {
  return {
    searchStudentsDispatcher: async (search) => {
      let response = await dispatch(searchStudents(search));
      if (response.error) return [];
      return response.payload;
    },
    searchUserMenteesDispatcher: async (userId, search) => {
      let response = await dispatch(searchUserMentees(userId, search));
      if (response.error) return [];
      return response.payload;
    },
    fetchInteractionParticipantsDispatcher: async (interactionId) => {
      let response = await dispatch(fetchInteractionParticipants(interactionId));
      if (response.error) return [];
      return response.payload;
    },
    addInteractionParticipantDispatcher:
      (interactionId, studentId) => dispatch(addInteractionParticipant(interactionId, studentId)),
    removeInteractionParticipantDispatcher:
      (interactionId, studentId) => dispatch(removeInteractionParticipant(interactionId, studentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);
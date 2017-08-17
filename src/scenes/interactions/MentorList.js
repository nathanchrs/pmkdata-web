import React from 'react';
import { Button, Dimmer, Loader, Search, Divider, List } from 'semantic-ui-react';
import { fetchInteractionMentors, addInteractionMentor, removeInteractionMentor }
  from '../../services/interactions/actions';
import { searchUsers } from '../../services/users/actions';
import { connect } from 'react-redux';

class MentorList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {listLoading: false, searchLoading: false, searchResults: [], searchValue: '', mentors: []};
  }

  componentWillMount () {
    this.resetComponent();
  }

  resetComponent = async () => {
    const {interaction} = this.props;
    if (interaction && interaction.id) {
      this.setState({listLoading: true});
      let mentors = await this.props.fetchInteractionMentorsDispatcher(interaction.id);
      this.setState({listLoading: false, searchLoading: false, searchResults: [], searchValue: '', mentors});
    }
  };

  handleResultSelect = async (e, {result}) => {
    this.setState({searchValue: result.title || result.description });
    await this.props.addInteractionMentorDispatcher(this.props.interaction.id, result.id);
    this.resetComponent();
  };

  handleSearchChange = async (e, {value}) => {
    this.setState({searchLoading: true, searchValue: value});
    if (value.length < 1) return this.resetComponent();

    let results = await this.props.searchUsersDispatcher(value);
    results = results.map(({id, username, name, nim}) => ({id, title: name || username, description: username + ' | ' + nim}));
    this.setState({searchLoading: false, searchResults: results});
  };

  render () {
    const {interaction, removeInteractionMentorDispatcher} = this.props;
    const {listLoading, searchLoading, searchResults, searchValue} = this.state;
    return (
      <div>
        <Search fluid icon='add' placeholder='Tambahkan mentor...' loading={searchLoading}
                results={searchResults} value={searchValue}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
        />

        <Divider hidden />
        <List divided relaxed verticalAlign='middle'>
          <Dimmer inverted active={listLoading}>
            <Loader />
          </Dimmer>
          {this.state.mentors.map(mentor => (
            <List.Item key={mentor.id}>
              {this.state.mentors.length > 1 &&
                <List.Content floated='right'>
                  <Button basic circular icon='trash' negative onClick={
                    async () => {
                      await removeInteractionMentorDispatcher(interaction.id, mentor.user_id);
                      this.resetComponent();
                    }
                  }/>
                </List.Content>
              }
              <List.Content>
                <List.Header>{mentor.name || mentor.username}</List.Header>
                <List.Description>{
                  mentor.username
                  + (mentor.year ? ' | ' + mentor.year : '')
                  + (mentor.department ? ' | ' + mentor.department : '')
                }</List.Description>
              </List.Content>
            </List.Item>
          ))}
          {(!this.state.mentors || this.state.mentors.length <= 0) &&
            <i>Belum ada mentor yang ditambahkan untuk laporan ini.</i>
          }
        </List>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchUsersDispatcher: async (search) => {
      let response = await dispatch(searchUsers(search));
      if (response.error) return [];
      return response.payload;
    },
    fetchInteractionMentorsDispatcher: async (interactionId) => {
      let response = await dispatch(fetchInteractionMentors(interactionId));
      if (response.error) return [];
      return response.payload;
    },
    addInteractionMentorDispatcher:
      (interactionId, userId) => dispatch(addInteractionMentor(interactionId, userId)),
    removeInteractionMentorDispatcher:
      (interactionId, userId) => dispatch(removeInteractionMentor(interactionId, userId))
  };
};

export default connect(null, mapDispatchToProps)(MentorList);
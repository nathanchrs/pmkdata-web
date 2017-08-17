import React from 'react';
import { Button, Dimmer, Loader, Search, Divider, List } from 'semantic-ui-react';
import { addMentee, removeMentee } from '../../services/mentees/actions';
import { searchStudents } from '../../services/students/actions';
import { fetchUserMentees } from '../../services/mentees/actions';
import { connect } from 'react-redux';

class UserMenteeList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {listLoading: false, searchLoading: false, searchResults: [], searchValue: '', mentees: []};
  }

  componentWillMount () {
    this.resetComponent();
  }

  resetComponent = async () => {
    const {user} = this.props;
    if (user && user.id) {
      this.setState({listLoading: true});
      let mentees = await this.props.fetchUserMenteesDispatcher(user.id);
      this.setState({listLoading: false, searchLoading: false, searchResults: [], searchValue: '', mentees});
    }
  };

  handleResultSelect = async (e, {result}) => {
    this.setState({searchValue: result.title || result.description});
    await this.props.addMenteeDispatcher({user_id: this.props.user.id, student_id: result.id});
    this.resetComponent();
  };

  handleSearchChange = async (e, {value}) => {
    this.setState({searchLoading: true, searchValue: value});
    if (value.length < 1) return this.resetComponent();

    let results = await this.props.searchStudentsDispatcher(value);
    results = results.map(({id, name, year, department}) => ({
      id,
      title: name,
      description: year + ' | ' + department
    }));
    this.setState({searchLoading: false, searchResults: results});
  };

  render () {
    const {user, removeMenteeDispatcher} = this.props;
    const {listLoading, searchLoading, searchResults, searchValue} = this.state;
    return (
      <div>
        <Search fluid icon='add' placeholder='Tambahkan mentee...' loading={searchLoading}
                results={searchResults} value={searchValue}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
        />

        <Divider hidden/>
        <List divided relaxed verticalAlign='middle'>
          <Dimmer inverted active={listLoading}>
            <Loader />
          </Dimmer>
          {this.state.mentees.map(mentee => (
            <List.Item key={mentee.id}>
              <List.Content floated='right'>
                <Button basic circular icon='trash' negative onClick={
                  async () => {
                    await removeMenteeDispatcher(user.id, mentee.student_id);
                    this.resetComponent();
                  }
                }/>
              </List.Content>
              <List.Content>
                <List.Header>{mentee.name}</List.Header>
                <List.Description>{
                  (mentee.year ? mentee.year : '')
                  + (mentee.department ? ' | ' + mentee.department : '')
                }</List.Description>
              </List.Content>
            </List.Item>
          ))}
          {(!this.state.mentees || this.state.mentees.length <= 0) &&
          <i>Belum ada mentee yang ditambahkan.</i>
          }
        </List>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchStudentsDispatcher: async (search) => {
      let response = await dispatch(searchStudents(search));
      if (response.error) return [];
      return response.payload;
    },
    fetchUserMenteesDispatcher: async (userId) => {
      let response = await dispatch(fetchUserMentees(userId));
      if (response.error) return [];
      return response.payload;
    },
    addMenteeDispatcher: (userId, studentId) => dispatch(addMentee(userId, studentId)),
    removeMenteeDispatcher: (userId, studentId) => dispatch(removeMentee(userId, studentId))
  };
};

export default connect(null, mapDispatchToProps)(UserMenteeList);

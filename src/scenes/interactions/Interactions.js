import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import InteractionDetail from './InteractionDetail';
import { fetchInteractions, deleteInteraction } from '../../services/interactions/actions';
import { Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm } from 'semantic-ui-react';
import EditInteraction, { EDIT_INTERACTION_FORM } from './EditInteraction';
import CreateInteraction, { CREATE_INTERACTION_FORM } from './CreateInteraction';
import { initialize } from 'redux-form';
import moment from 'moment';
import SearchBox from '../../common/components/SearchBox';

class Interactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editingInteraction: null, creating: false, warningOpen: false, search: ''};
  }

  componentDidMount() {
    this.props.isSupervisor ? this.props.fetchInteractionsDispatcher(this.props.interactions) : this.props.fetchInteractionsDispatcher({filters: {filter: this.props.username }});
  }

  handleEditStart = (event, { id, time, notes, tags }) => {
    this.props.initEditInteractionFormDispatcher({ id, time, notes, tags });
    this.setState({ editing: true, editingInteraction: { id, time, notes, tags } });
  };

  handleEditDone = () => {
    this.setState({ editing: false, editingInteraction: null });
  };

  handleCreateStart = () => {
    this.props.initCreateInteractionFormDispatcher();
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
    this.props.deleteInteractionDispatcher(id);
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
    const { interactions, isSupervisor, fetchInteractionsDispatcher } = this.props;
    if(this.props.match.params.id) {
      return (
        <InteractionDetail id={this.props.match.params.id} />
      );
    }
    return (
      <AppLayout section='interactions'>
        <Header floated='left'>Interaksi</Header>
        <Header floated='right'>
          <Button icon='plus' onClick={() => this.handleCreateStart()} />
        </Header>
        <Table compact selectable attached={interactions.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={7}>
                <
                  SearchBox 
                  dispatcher={this.props.fetchInteractionsDispatcher}
                  storeKey='events' 
                />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>Waktu</Table.HeaderCell>
              <Table.HeaderCell>Catatan</Table.HeaderCell>
              <Table.HeaderCell>Tags</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {interactions.data && interactions.data.length > 0 ? interactions.data.map((interaction) => (
              <Table.Row key={interaction.id}>
                <Table.Cell collapsing>
                  <Button content='Detail' positive as={Link} to={'/interactions/' + interaction.id} />
                </Table.Cell>
                <Table.Cell>{interaction.id}</Table.Cell>
                <Table.Cell>{moment(interaction.time).format('LLLL')}</Table.Cell>
                <Table.Cell>{interaction.notes}</Table.Cell>
                <Table.Cell>{interaction.tags}</Table.Cell>
                <Table.Cell><Button icon="edit" onClick={(e) => this.handleEditStart(e, interaction)} /></Table.Cell>
                <Table.Cell><Button icon="delete" negative onClick={this.handleWarningOpen} /></Table.Cell>
                <Confirm
                  open={this.state.warningOpen}
                  content='This action cannot be undone!'
                  onCancel={this.handleWarningClose}
                  onConfirm={(e) => this.handleDelete(e, interaction.id)}
                />
              </Table.Row>
            )) :
              <Table.Row>
                <Table.Cell colSpan='5'><i>Tidak ada data yang sesuai.</i></Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>

        {interactions.error &&
          <Message error attached='bottom'>
            <Icon name='warning sign'/> {interactions.error}
          </Message>
        }

        <PageMenu floated='right' size='mini' storeKey='interactions' onPageChange={fetchInteractionsDispatcher} />

        <Dimmer inverted active={interactions.isFetching}><Loader size='big' /></Dimmer>
        <EditInteraction open={this.state.editing} readOnlyValues={this.state.editingInteraction || {}} onClose={this.handleEditDone} />
        <CreateInteraction open={this.state.creating} onClose={this.handleCreateDone} />
      </AppLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    interactions: state.interactions,
    username: state.session.user.username,
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchInteractionsDispatcher: (pageInfo) => dispatch(fetchInteractions(pageInfo)),
    initEditInteractionFormDispatcher: initialValues => dispatch(initialize(EDIT_INTERACTION_FORM, initialValues)),
    initCreateInteractionFormDispatcher: () => dispatch(initialize(CREATE_INTERACTION_FORM)),
    deleteInteractionDispatcher: (id) => dispatch(deleteInteraction(id)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Interactions);

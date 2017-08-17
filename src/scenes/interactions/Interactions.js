import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchInteractions, deleteInteraction } from '../../services/interactions/actions';
import { Input, Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm } from 'semantic-ui-react';
import EditInteraction, { EDIT_INTERACTION_FORM } from './EditInteraction'
import CreateInteraction, { CREATE_INTERACTION_FORM } from './CreateInteraction'
import EditAttendees from './EditAttendees';
import { initialize } from 'redux-form';
import { getFirstSortDirection } from '../../common/utils';
import moment from 'moment';
import { displayDateTimeFormat } from '../../common/constants';

class Interactions extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      search: '',
      creatingInteraction: false,
      editingInteraction: null,
      editingAttendees: null,
      deleteConfirmInteraction: null
    };
  }

  componentDidMount () {
    this.props.fetchInteractionsDispatcher(this.props.interactions);
  };

  handleSearchChange = (event) => {
    this.setState({search: event.target.value});
  };

  handleSearch = () => {
    this.props.fetchInteractionsDispatcher(Object.assign(this.props.interactions, {search: this.state.search}));
  };

  handleSort = (field) => {
    let sort = [{
      field,
      direction: getFirstSortDirection(this.props.interactions && this.props.interactions.sort, field) === 'ascending' ? 'descending' : 'ascending'
    }];
    this.props.fetchInteractionsDispatcher(Object.assign(this.props.interactions, {sort}));
  };

  handleCreateStart = () => {
    this.props.initCreateInteractionFormDispatcher();
    this.setState({creatingInteraction: true});
  };

  handleEditStart = ({id, ...rest}) => {
    this.props.initEditInteractionFormDispatcher(rest);
    this.setState({editingInteraction: {id, ...rest}});
  };

  handleEditAttendeesStart = (interaction) => {
    this.setState({editingAttendees: interaction});
  };

  render () {
    const {interactions, fetchInteractionsDispatcher, deleteInteractionDispatcher} = this.props;
    return (
      <AppLayout section='interactions'>
        <div style={{display: 'flex'}}>
          <div>
            <Header style={{margin: '5px 0'}}>
              Laporan
              {interactions.search &&
              <small>{' - hasil pencarian untuk \'' + interactions.search + '\''}</small>
              }
            </Header>
          </div>

          <div style={{marginLeft: 'auto'}}>
            <Input type='text' placeholder='Cari...' style={{marginRight: '10px'}}
                   value={this.state.search} onChange={this.handleSearchChange}
                   action={<Button icon='search' onClick={this.handleSearch}/>}
            />
            <Button primary icon='add' onClick={this.handleCreateStart}/>
          </div>
        </div>

        <Table compact sortable singleLine unstackable attached={interactions.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing/>
              <Table.HeaderCell sorted={getFirstSortDirection(interactions.sort, 'id')}
                                onClick={() => this.handleSort('id')}>ID</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(interactions.sort, 'time')}
                                onClick={() => this.handleSort('time')}>Waktu pertemuan</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(interactions.sort, 'title')}
                                onClick={() => this.handleSort('title')}>Materi/kegiatan</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(interactions.sort, 'tags')}
                                onClick={() => this.handleSort('tags')}>Jenis laporan</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(interactions.sort, 'created_at')}
                                onClick={() => this.handleSort('created_at')}>Dibuat pada</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(interactions.sort, 'updated_at')}
                                onClick={() => this.handleSort('updated_at')}>Diubah pada</Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {interactions.data ? interactions.data.map((interaction) => (
              <Table.Row key={interaction.id}>
                <Table.Cell collapsing>
                  <Button size='mini' circular content='Edit' icon='edit'
                          onClick={() => this.handleEditStart(interaction)}/>
                  <Button size='mini' circular content='Kehadiran' icon='users'
                          onClick={() => this.handleEditAttendeesStart(interaction)}/>
                  <Button size='mini' circular icon='trash' basic negative
                          onClick={() => this.setState({deleteConfirmInteraction: interaction})}/>
                </Table.Cell>

                <Table.Cell>{interaction.id}</Table.Cell>
                <Table.Cell>{moment(interaction.time).format(displayDateTimeFormat)}</Table.Cell>
                <Table.Cell>{interaction.title}</Table.Cell>
                <Table.Cell>{interaction.tags}</Table.Cell>
                <Table.Cell>{moment(interaction.created_at).format(displayDateTimeFormat)}</Table.Cell>
                <Table.Cell>{moment(interaction.updated_at).format(displayDateTimeFormat)}</Table.Cell>
              </Table.Row>
            )) :
              <Table.Row>
                <Table.Cell colSpan='7'><i>Tidak ada data yang sesuai.</i></Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>

        {interactions.error &&
        <Message error attached='bottom'>
          <Icon name='warning sign'/> {interactions.error}
        </Message>
        }

        <PageMenu floated='right' size='mini' storeKey='interactions' onPageChange={fetchInteractionsDispatcher}/>

        <Dimmer inverted active={interactions.isFetching}><Loader size='big'/></Dimmer>

        <Confirm
          open={!!this.state.deleteConfirmInteraction}
          content={'Yakin ingin menghapus laporan dengan ID '
          + (this.state.deleteConfirmInteraction && this.state.deleteConfirmInteraction.id) + '?'}
          confirmButton='Hapus'
          cancelButton='Batal'
          onCancel={() => this.setState({deleteConfirmInteraction: null})}
          onConfirm={() => {
            deleteInteractionDispatcher(this.state.deleteConfirmInteraction && this.state.deleteConfirmInteraction.id);
            this.setState({deleteConfirmInteraction: null})
          }
          }
        />

        <CreateInteraction open={this.state.creatingInteraction}
                           onClose={() => this.setState({creatingInteraction: false})}
        />

        <EditInteraction open={!!this.state.editingInteraction}
                         readOnlyValues={this.state.editingInteraction || {}}
                         onClose={() => this.setState({editingInteraction: null})}
        />

        <EditAttendees open={!!this.state.editingAttendees}
                       interaction={this.state.editingAttendees || {}}
                       onClose={() => this.setState({editingAttendees: null})}
        />

      </AppLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    interactions: state.interactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchInteractionsDispatcher: (pageInfo) => dispatch(fetchInteractions(pageInfo)),
    initCreateInteractionFormDispatcher: initialValues => dispatch(initialize(CREATE_INTERACTION_FORM)),
    initEditInteractionFormDispatcher: initialValues => dispatch(initialize(EDIT_INTERACTION_FORM, initialValues)),
    deleteInteractionDispatcher: (id) => dispatch(deleteInteraction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Interactions);

import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import { fetchInteractionDetail, deleteInteractionDetail } from '../../services/interaction_detail/actions';
import { Button, Dimmer, Header, Icon, Loader, Confirm, Segment, Label, Message } from 'semantic-ui-react';
// import EditInteraction, { EDIT_INTERACTION_FORM } from './EditInteraction';
// import CreateInteraction, { CREATE_INTERACTION_FORM } from './CreateInteraction';
// import { initialize } from 'redux-form';
import moment from 'moment';
import isEmpty from 'lodash.isempty';

class InteractionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editingInteraction: null, creating: false, warningOpen: false};
  }

  componentDidMount() {
    this.props.isSupervisor ? this.props.fetchInteractionsDispatcher(this.props.id) : this.props.fetchInteractionsDispatcher(this.props.id, this.props.username);
  }

  handleDelete = (event, id) => {
    this.props.deleteInteractionDispatcher(id);
  }

  render() {
    const { interaction_detail, isSupervisor, fetchInteractionsDispatcher } = this.props;
    const { data, isFetching } = interaction_detail;
    return (
      <AppLayout section='interactions'>
      <Header>Interaksi</Header>
        {
          !isEmpty(data) ? 
          <div>
            <Header as='h2' attached='top'>
              <Icon name='sticky note outline' />
              <Header.Content>
                Mentor : {data.mentor.mentor_username}
                <Header.Subheader>
                  Id Interaksi: {data.id} <br />
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Segment attached>
              <Header as='h3'> Laporan: </Header>
              {data.interaction_notes}
            </Segment>
            <Segment attached>
              <Header as='h3'>Daftar Mentee / Partisipan</Header>
              {data.mentee.length > 0 ?
                data.mentee.map((mentee, key) => (
                  <Label key={key} as='a' color='blue'>
                    <Icon name='user' />
                      {mentee.student_name}
                      <Label.Detail>Student id : {mentee.student_id}</Label.Detail>
                      <Icon name='delete' onClick={e => this.handleDelete(e, mentee.participant_id)}/>
                  </Label>
                ))
                :
                <Message warning>
                  <Message.Header>Tidak ada partisipan</Message.Header>
                  <p>Tambahkan partisipan (mentee) !</p>
                </Message>
              }
            </Segment>
            <Dimmer inverted active={isFetching}><Loader size='big' /></Dimmer>
          </div>
          :
          <Message warning>
            <Message.Header>Data tidak ditemukan!</Message.Header>
            <p>Interaksi dengan nomor id : {this.props.id} mungkin tidak valid atau anda tidak diperbolehkan melihat data ini.</p>
          </Message>
        }
      </AppLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    interaction_detail: state.interaction_detail,
    username: state.session.user.username,
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchInteractionsDispatcher: (id, username) => dispatch(fetchInteractionDetail(id, username)),
    deleteInteractionDispatcher: (id) => dispatch(deleteInteractionDetail(id))
    /* initEditInteractionFormDispatcher: initialValues => dispatch(initialize(EDIT_INTERACTION_FORM, initialValues)),
    initCreateInteractionFormDispatcher: () => dispatch(initialize(CREATE_INTERACTION_FORM)) */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractionDetail);

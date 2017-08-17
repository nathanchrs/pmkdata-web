import React from 'react';
import { Modal, Tab } from 'semantic-ui-react';
import MentorList from './MentorList';
import ParticipantList from './ParticipantList';


class EditAttendees extends React.Component {
  render () {
    const {open, onClose, interaction} = this.props;
    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='tiny'>
        <Modal.Header>Daftar hadir - {interaction.title}</Modal.Header>
        <Tab panes={[
          {menuItem: 'Mentor', render: () => <Tab.Pane>
            <MentorList interaction={interaction}/>
          </Tab.Pane>},
          {menuItem: 'Mentee', render: () => <Tab.Pane>
            <ParticipantList interaction={interaction}/>
          </Tab.Pane>}
        ]}/>
      </Modal>
    );
  }
}

export default EditAttendees;

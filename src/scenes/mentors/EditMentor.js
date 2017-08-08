import React from 'react';
import { Button, Icon, Modal, Form, Message, Select } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import { userStatuses } from '../../common/enums';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { updateMentor } from '../../services/mentors/actions';

export const EDIT_MENTOR_FORM = 'editMentor';

class EditMentor extends React.Component {
  render () {
    const { open, onClose, readOnlyValues, pristine, submitting, error, handleSubmit } = this.props;

    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='mini'>
        <Modal.Header>Edit Mentor - {readOnlyValues.id}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(submit)} error={!!error}>
              <ControlledField name='mentor_username' label='Username' />
              <ControlledField name='event_id' label='No event' />
              <ControlledField name='status' label='Status mentor' fluid component={Select} options={userStatuses} />
              <Message error>{error}</Message>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>Batal</Button>
          <Button primary disabled={pristine || submitting} loading={submitting} onClick={handleSubmit(submit)}>
            Simpan <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

this.defaultProps = {
  readOnlyValues: {}
};

async function submit (values, dispatch, ownProps) {
  let response = await dispatch(updateMentor(ownProps.readOnlyValues.id, values));
  if (response.error) {
    if (response.payload && response.payload.status === 422) {
      throw new SubmissionError({ _error: 'Terdapat input yang tidak valid' });
    }
    throw new SubmissionError({ _error: 'Update data gagal, coba beberapa saat lagi.' });
  }
  ownProps.onClose();
}

const schema = {
  'type': 'object',
  'properties': {
    'mentor_username': commonSchemas.username,
    'event_id': commonSchemas.number(),
    'status': commonSchemas.userStatus
  },
  'required': ['mentor_username', 'event_id', 'status'],
  'errorMessage': {
    'properties': {
      'mentor_username': 'Username harus diisi',
      'event_id': 'No event harus diisi',
      'status': 'Status harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({ form: EDIT_MENTOR_FORM, validate: createValidator(schema) })(EditMentor);

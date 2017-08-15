import React from 'react';
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { createMentor } from '../../services/mentors/actions';

export const CREATE_MENTOR_FORM = 'createMentor';

class CreateMentor extends React.Component {
  render () {
    const { open, onClose, pristine, submitting, error, handleSubmit } = this.props;

    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='mini'>
        <Modal.Header>Tambah Mentor</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(submit)} error={!!error}>
              <ControlledField name='mentor_username' label='Username' />
              <ControlledField name='event_id' label='No event' />
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
  let response = await dispatch(createMentor(values));
  if (response.error) {
    if (response.payload && response.payload.status === 422) {
      throw new SubmissionError({ _error: 'Terdapat input yang tidak valid' });
    }
    throw new SubmissionError({ _error: 'Create data gagal, coba beberapa saat lagi.' });
  }
  ownProps.onClose();
}

const schema = {
  'type': 'object',
  'properties': {
    'mentor_username': commonSchemas.username,
    'event_id': commonSchemas.number()
  },
  'required': ['mentor_username', 'event_id'],
  'errorMessage': {
    'properties': {
      'mentor_username': 'Username harus diisi',
      'event_id': 'No event harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({ form: CREATE_MENTOR_FORM, validate: createValidator(schema) })(CreateMentor);

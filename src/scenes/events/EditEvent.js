import React from 'react';
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { updateEvent } from '../../services/events/actions';

export const EDIT_EVENT_FORM = 'editEvent';

class EditEvent extends React.Component {
  render () {
    const { open, onClose, readOnlyValues, pristine, submitting, error, handleSubmit } = this.props;

    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='mini'>
        <Modal.Header>Edit Event - {readOnlyValues.id}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(submit)} error={!!error}>
              <ControlledField name='name' label='Nama Kegiatan' />
              <ControlledField name='description' label='Deskripsi kegiatan' />
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
  let response = await dispatch(updateEvent(ownProps.readOnlyValues.id, values));
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
    'name': commonSchemas.varchar(255),
    'description': commonSchemas.varchar()
  },
  'required': ['name', 'description'],
  'errorMessage': {
    'properties': {
      'name': 'Nama kegiatan harus diisi',
      'description': 'Deskripsi harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({ form: EDIT_EVENT_FORM, validate: createValidator(schema) })(EditEvent);

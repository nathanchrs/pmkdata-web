import React from 'react';
import { Button, Icon, Modal, Form, Message, TextArea } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import DatePicker from '../../common/components/DatePicker';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { updateInteraction } from '../../services/interactions/actions';

export const EDIT_INTERACTION_FORM = 'editInteraction';

class EditInteraction extends React.Component {
  render () {
    const { open, onClose, readOnlyValues, pristine, submitting, error, handleSubmit } = this.props;

    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='mini'>
        <Modal.Header>Edit Interaksi - {readOnlyValues.id}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(submit)} error={!!error}>
              <ControlledField name='time' label='Waktu' component={DatePicker} timeFormat />
              <ControlledField name='notes' label='Catatan' component={TextArea} />
              <ControlledField name='tags' label='Tags' />
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
  if (values.nim === '') values.nim = undefined;
  if (values.tpb_nim === '') values.tpb_nim = undefined;
  let response = await dispatch(updateInteraction(ownProps.readOnlyValues.id, values));
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
    'time': commonSchemas.datetime,
    'notes': commonSchemas.varchar(),
    'tags': commonSchemas.varchar(255)
  },
  'required': ['time', 'notes', 'tags'],
  'errorMessage': {
    'properties': {
      'time': 'Waktu harus diisi',
      'notes': 'Catatan harus diisi',
      'tags': 'Tags harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({ form: EDIT_INTERACTION_FORM, validate: createValidator(schema) })(EditInteraction);

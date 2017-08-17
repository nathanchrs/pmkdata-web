import React from 'react';
import { Button, Icon, Modal, Form, Message, TextArea } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { createInteraction } from '../../services/interactions/actions';
import Datetime from 'react-datetime';

export const CREATE_INTERACTION_FORM = 'createInteraction';

class CreateInteraction extends React.Component {
  render () {
    const {open, onClose, pristine, submitting, error, handleSubmit} = this.props;
    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='large'>
        <Modal.Header>Buat Laporan Baru</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(submit)} error={!!error}>
              <ControlledField name='title' label='Materi/kegiatan'/>
              <ControlledField name='time' label='Waktu pertemuan' component={Datetime}/>
              <ControlledField name='tags' label='Jenis laporan' placeholder='Komsel/Personal/KTB'/>
              <ControlledField name='notes' label='Isi laporan' component={TextArea} rows='20' spellCheck={false}/>
              <Message error>{error}</Message>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>Batal</Button>
          <Button primary disabled={pristine || submitting} loading={submitting} onClick={handleSubmit(submit)}>
            Simpan <Icon name='right chevron'/>
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

async function submit (values, dispatch, ownProps) {
  if (values.nim === '') delete values.nim;
  if (values.tpb_nim === '') delete values.tpb_nim;
  let response = await dispatch(createInteraction(values));
  if (response.error) {
    if (response.payload && response.payload.status === 422) {
      throw new SubmissionError({_error: 'Terdapat input yang tidak valid'});
    }
    throw new SubmissionError({_error: 'Update data gagal, coba beberapa saat lagi.'});
  }
  ownProps.onClose();
}

const schema = {
  'type': 'object',
  'properties': {
    'time': commonSchemas.datetime,
    'title': commonSchemas.varchar(255),
    'notes': commonSchemas.text,
    'tags': commonSchemas.varchar(255)
  },
  'required': ['time', 'title', 'notes'],
  'errorMessage': {
    'properties': {
      'time': 'Waktu pertemuan harus diisi',
      'title': 'Judul laporan harus diisi',
      'notes': 'Isi laporan tidak boleh kosong'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({form: CREATE_INTERACTION_FORM, validate: createValidator(schema)})(CreateInteraction);

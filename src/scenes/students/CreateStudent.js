import React from 'react';
import { Button, Select, Icon, Modal, Form, Message, TextArea } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import { genders, departments } from '../../common/enums';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { createStudent } from '../../services/students/actions';

export const CREATE_STUDENT_FORM = 'createStudent';

class CreateStudent extends React.Component {
  render () {
    const {open, onClose, pristine, submitting, error, handleSubmit} = this.props;
    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='tiny'>
        <Modal.Header>Buat Data Anggota Baru</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(submit)} error={!!error}>
              <ControlledField name='id' label='ID'/>
              <ControlledField name='name' label='Nama'/>
              <ControlledField name='year' label='Angkatan'/>
              <ControlledField name='department' label='Fakultas/prodi' fluid component={Select} options={departments}/>
              <ControlledField name='tpb_nim' label='NIM TPB'/>
              <ControlledField name='nim' label='NIM'/>
              <ControlledField name='gender' label='Jenis kelamin' fluid component={Select} options={genders}/>
              <ControlledField name='birth_date' label='Tanggal lahir'/>
              <ControlledField name='phone' label='Telepon'/>
              <ControlledField name='parent_phone' label='Telepon orangtua'/>
              <ControlledField name='line' label='LINE'/>
              <ControlledField name='current_address' label='Alamat tinggal' component={TextArea}/>
              <ControlledField name='hometown_address' label='Alamat asal' component={TextArea}/>
              <ControlledField name='high_school' label='Asal sekolah'/>
              <ControlledField name='church' label='Gereja'/>
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
  let response = await dispatch(createStudent(values));
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
    'tpb_nim': commonSchemas.nim,
    'nim': commonSchemas.nim,
    'year': commonSchemas.year,
    'department': commonSchemas.department,
    'name': commonSchemas.varchar(255),
    'gender': commonSchemas.gender,
    'birth_date': commonSchemas.date,
    'phone': commonSchemas.phone,
    'parent_phone': commonSchemas.phone,
    'line': commonSchemas.line,
    'current_address': commonSchemas.text,
    'hometown_address': commonSchemas.text,
    'high_school': commonSchemas.varchar(255),
    'church': commonSchemas.varchar(255)
  },
  'required': ['year', 'department', 'name', 'gender', 'birth_date', 'phone', 'parent_phone', 'current_address', 'hometown_address', 'high_school', 'church'],
  'errorMessage': {
    'properties': {
      'year': 'Angkatan harus diisi',
      'department': 'Fakultas/prodi harus diisi',
      'name': 'Nama harus diisi',
      'gender': 'Jenis kelamin harus diisi',
      'birth_date': 'Tanggal lahir harus diisi',
      'phone': 'Nomor telepon harus diisi',
      'parent_phone': 'Nomor telepon orangtua harus diisi',
      'current_address': 'Alamat tinggal saat ini harus diisi',
      'hometown_address': 'Alamat di daerah asal harus diisi',
      'high_school': 'Asal sekolah harus diisi',
      'church': 'Gereja harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({form: CREATE_STUDENT_FORM, validate: createValidator(schema)})(CreateStudent);

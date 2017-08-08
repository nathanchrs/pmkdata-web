import React from 'react';
import { Button, Select, Icon, Modal, Form, Message, Confirm } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import DatePicker from '../../common/components/DatePicker';
import { departmentInItb, genderEnum } from '../../common/enums';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { updateStudent } from '../../services/students/actions';

export const EDIT_STUDENT_FORM = 'editStudent';

class EditStudent extends React.Component {
  state = { warningOpen: false }

  render () {
    const { open, onClose, readOnlyValues, pristine, submitting, error, handleSubmit } = this.props;

    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='mini'>
        <Modal.Header>Edit Akun - {readOnlyValues.name}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(submit)} error={!!error}>
              <ControlledField name='nim' label='NIM' />
              <ControlledField name='tpb_nim' label='NIM TPB' />
              <ControlledField name='name' label='Nama' />
              <ControlledField name='year' label='Tahun' />
              <ControlledField name='department' label='Fakultas' fluid component={Select} options={departmentInItb} />
              <ControlledField name='gender' label='Jenis Kelamin' fluid component={Select} options={genderEnum} />
              <ControlledField name='birth_date' label='Tanggal Lahir' component={DatePicker} timeFormat={false} />
              <ControlledField name='phone' label='No. Handphone' />
              <ControlledField name='parent_phone' label='No. HP Orang Tua' />
              <ControlledField name='line' label='Line account' />
              <ControlledField name='high_school' label='Asal Sekolah' />
              <ControlledField name='church' label='Gereja' />
              <ControlledField name='bandung_address' label='Alamat Bandung' />
              <ControlledField name='hometown_address' label='Alamat Asal' />
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
  let response = await dispatch(updateStudent(ownProps.readOnlyValues.id, values));
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
    'tpb_nim': commonSchemas.nim,
    'nim': commonSchemas.nim,
    'year': commonSchemas.year,
    'department': commonSchemas.department,
    'name': commonSchemas.varchar(255),
    'gender': commonSchemas.gender,
    'birth_date': commonSchemas.date,
    'phone': commonSchemas.phone,
    'line': commonSchemas.line,
    'high_school': commonSchemas.varchar(255),
    'church': commonSchemas.varchar(255)
  },
  'required': ['year', 'name', 'department', 'gender', 'birth_date', 'phone', 'line', 'high_school', 'church'],
  'errorMessage': {
    'properties': {
      'year': 'Tahun harus diisi',
      'name': 'Nama harus diisi',
      'department': 'Fakultas harus diisi',
      'gender': 'Jenis kelamin harus diisi',
      'birth_date': 'Tanggal lahir harus diisi',
      'phone': 'Nomor handphone harus diisi',
      'line': 'Username line harus diisi',
      'high_school': 'Asal SMA harus diisi',
      'church': 'Gereja harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({ form: EDIT_STUDENT_FORM, validate: createValidator(schema) })(EditStudent);

import React from 'react';
import { Button, Select, Icon, Modal, Form, Message } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import { userRoles, userStatuses } from '../../common/enums';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { createUser } from '../../services/users/actions';

export const CREATE_USER_FORM = 'createUser';

class CreateUser extends React.Component {
  render () {
    const {open, onClose, pristine, submitting, error, handleSubmit} = this.props;
    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='tiny'>
        <Modal.Header>Buat Akun Baru</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(submit)} error={!!error}>
              <ControlledField name='username' label='Username'/>
              <ControlledField name='nim' label='NIM'/>
              <ControlledField name='email' label='Email'/>
              <ControlledField type='password' name='password' label='Password'/>
              <ControlledField name='role' label='Jenis akun' fluid component={Select} options={userRoles}/>
              <ControlledField name='status' label='Status akun' fluid component={Select} options={userStatuses}/>
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
  let response = await dispatch(createUser(values));
  if (response.error) {
    if (response.payload && response.payload.status === 409) {
      if (response.payload.response && response.payload.response.message === 'Username already exists.') {
        throw new SubmissionError({username: 'Username sudah terpakai', _error: 'Username sudah terpakai'});
      } else {
        throw new SubmissionError({
          nim: 'Sudah ada username yang terdaftar untuk NIM ini',
          _error: 'Sudah ada username yang terdaftar untuk NIM ini'
        });
      }
    } else if (response.payload && response.payload.status === 422) {
      throw new SubmissionError({_error: 'Terdapat input yang tidak valid'});
    }
    throw new SubmissionError({_error: 'Update data gagal, coba beberapa saat lagi.'});
  }
  ownProps.onClose();
}

const schema = {
  'type': 'object',
  'properties': {
    'username': commonSchemas.username,
    'nim': commonSchemas.nim,
    'email': commonSchemas.email,
    'password': commonSchemas.password,
    'status': commonSchemas.userStatus,
    'role': commonSchemas.role
  },
  'required': ['username', 'email', 'password', 'role', 'status'],
  'errorMessage': {
    'properties': {
      'username': 'Username harus diisi',
      'email': 'Email harus diisi',
      'password': 'Password harus diisi',
      'role': 'Jenis akun harus diisi',
      'status': 'Status akun harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({form: CREATE_USER_FORM, validate: createValidator(schema)})(CreateUser);

import React from 'react';
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { updateUser } from '../../services/users/actions';

export const EDIT_USER_PASSWORD_FORM = 'editUserPassword';

class EditUserPassword extends React.Component {
  render () {
    const {open, onClose, readOnlyValues, pristine, submitting, error, handleSubmit, isSupervisor} = this.props;
    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='mini'>
        <Modal.Header>Ubah Password - {readOnlyValues.username}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit(submit)} error={!!error}>
              {!isSupervisor &&
              <ControlledField name='oldPassword' type='password' label='Password lama'/>
              }
              <ControlledField name='newPassword' type='password' label='Password baru'/>
              <ControlledField name='confirmNewPassword' type='password' label='Konfirmasi password baru'/>
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

this.defaultProps = {
  readOnlyValues: {}
};

async function submit (values, dispatch, ownProps) {
  if (values.oldPassword === '') delete values.oldPassword;
  if (values.newPassword !== values.confirmNewPassword) {
    throw new SubmissionError({confirmNewPassword: 'Konfirmasi password harus sama dengan password baru'});
  }
  let response = await dispatch(updateUser(ownProps.readOnlyValues.username, values));
  if (response.error) {
    if (response.payload && response.payload.status === 403) {
      throw new SubmissionError({oldPassword: 'Password lama salah'});
    } else if (response.payload && response.payload.status === 422) {
      throw new SubmissionError({_error: 'Terdapat input yang tidak valid.'});
    }
    throw new SubmissionError({_error: 'Update data gagal, coba beberapa saat lagi.'});
  }
  ownProps.onClose();
}

const schema = {
  'type': 'object',
  'properties': {
    'oldPassword': commonSchemas.varchar(255),
    'newPassword': commonSchemas.password,
    'confirmNewPassword': commonSchemas.password
  },
  'required': ['newPassword', 'confirmNewPassword'],
  'errorMessage': {
    'properties': {
      'newPassword': 'Password baru harus diisi',
      'confirmNewPassword': 'Konfirmasi password baru harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({form: EDIT_USER_PASSWORD_FORM, validate: createValidator(schema)})(EditUserPassword);

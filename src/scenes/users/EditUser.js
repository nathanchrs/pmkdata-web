import React from 'react';
import { Button, Tab, Select, Icon, Modal, Form, Message } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm, SubmissionError } from 'redux-form';
import { userRoles, userStatuses } from '../../common/constants';
import commonSchemas from '../../common/schemas';
import { createValidator } from '../../common/validation';
import { updateUser } from '../../services/users/actions';
import UserMenteeList from './UserMenteeList';

export const EDIT_USER_FORM = 'editUser';

class EditUser extends React.Component {
  render () {
    const {open, onClose, readOnlyValues, pristine, submitting, error, handleSubmit} = this.props;
    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='tiny'>
        <Modal.Header>Edit Akun - {readOnlyValues.username}</Modal.Header>
        <Tab panes={[
          {menuItem: 'Detail akun', render: () => <Tab.Pane>
            <Modal.Content>
              <Modal.Description>
                <Form onSubmit={handleSubmit(submit)} error={!!error}>
                  <ControlledField name='nim' label='NIM'/>
                  <ControlledField name='email' label='Email'/>
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
          </Tab.Pane>},
          {menuItem: 'Mentee', render: () => <Tab.Pane>
            <UserMenteeList user={readOnlyValues}/>
          </Tab.Pane>}
        ]}/>
      </Modal>
    );
  }
}

this.defaultProps = {
  readOnlyValues: {}
};

async function submit (values, dispatch, ownProps) {
  if (values.nim === '') delete values.nim;
  let response = await dispatch(updateUser(ownProps.readOnlyValues.username, values));
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
    'nim': commonSchemas.nim,
    'email': commonSchemas.email,
    'role': commonSchemas.role,
    'status': commonSchemas.userStatus
  },
  'required': ['email', 'role', 'status'],
  'errorMessage': {
    'properties': {
      'email': 'Email harus diisi',
      'role': 'Jenis akun harus diisi',
      'status': 'Status akun harus diisi'
    },
    '_': 'Terdapat input yang tidak valid.'
  }
};

export default reduxForm({form: EDIT_USER_FORM, validate: createValidator(schema)})(EditUser);

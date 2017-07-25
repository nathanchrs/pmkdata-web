import React from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import ControlledField from '../../common/components/ControlledField';
import { reduxForm } from 'redux-form';

export const EDIT_USER_FORM = 'editUser';

class EditUser extends React.Component {
  render() {
    const { open, onClose, readOnlyValues, pristine, submitting } = this.props;
    return (
      <Modal open={open} closeOnDimmerClick={false} onClose={onClose} closeIcon='close' size='mini'>
        <Modal.Header>Edit Akun - {readOnlyValues.username}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <ControlledField name='nim' label='NIM'/>
              <ControlledField name='role' label='Jenis akun'/>
              <ControlledField name='status' label='Status akun'/>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>Batal</Button>
          <Button primary disabled={pristine || submitting} loading={submitting}>
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

export default reduxForm({ form: EDIT_USER_FORM })(EditUser);

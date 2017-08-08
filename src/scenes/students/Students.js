import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchStudents, deleteStudent } from '../../services/students/actions';
import { Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm } from 'semantic-ui-react';
import EditStudent, { EDIT_STUDENT_FORM } from './EditStudent';
import { initialize } from 'redux-form';
import { enumText, userStatuses, userRoles } from '../../common/enums';
import moment from 'moment';

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editingStudent: null, warningOpen: false };
  }

  handleWarningOpen = (e) => this.setState({
    warningOpen: true,
  })

  handleWarningClose = (e) => this.setState({
    warningOpen: false,
  })

  componentDidMount() {
    this.props.fetchStudentsDispatcher(this.props.students);
  }

  handleEditStart = (event, { id, tpb_nim, nim, year, department, name, gender, birth_date, phone, line, high_school, church }) => {
    this.props.initEditStudentFormDispatcher({ id, tpb_nim, nim, year, department, name, gender, birth_date, phone, line, high_school, church });
    this.setState({ editing: true, editingStudent: { id, tpb_nim, nim, year, department, name, gender, birth_date, phone, line, high_school, church } });
  };

  handleEditDone = () => {
    this.setState({ editing: false, editingStudent: null });
  };

  handleDelete = (event, id) => {
    this.props.deleteStudentDispatcher(id);
    this.handleWarningClose(event);
  }

  render() {
    const { students, isSupervisor, fetchStudentsDispatcher } = this.props;
    return (
      <AppLayout section='students'>
        <Header>Anggota</Header>

        <Table collapsing compact selectable attached={students.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>NIM TPB</Table.HeaderCell>
              <Table.HeaderCell>NIM</Table.HeaderCell>
              <Table.HeaderCell>Tahun Angkatan</Table.HeaderCell>
              <Table.HeaderCell>Fakultas</Table.HeaderCell>
              <Table.HeaderCell>Nama</Table.HeaderCell>
              <Table.HeaderCell>Jenis kelamin</Table.HeaderCell>
              <Table.HeaderCell>Tanggal Lahir</Table.HeaderCell>
              <Table.HeaderCell>No. HP</Table.HeaderCell>
              <Table.HeaderCell>No. HP Orang Tua</Table.HeaderCell>
              <Table.HeaderCell>Line</Table.HeaderCell>
              <Table.HeaderCell>Asal Sekolah</Table.HeaderCell>
              <Table.HeaderCell>Gereja</Table.HeaderCell>
              <Table.HeaderCell>Alamat Bandung</Table.HeaderCell>
              <Table.HeaderCell>Alamat Asal</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {students.data ? students.data.map((student) => (
              <Table.Row verticalAlign='top' key={student.id}>
                <Table.Cell>{student.id}</Table.Cell>
                <Table.Cell>{student.tpb_nim}</Table.Cell>
                <Table.Cell>{student.nim}</Table.Cell>
                <Table.Cell>{student.year}</Table.Cell>
                <Table.Cell>{student.department}</Table.Cell>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.gender}</Table.Cell>
                <Table.Cell>{moment(student.birth_date).format('DD-MM-YYYY')}</Table.Cell>
                <Table.Cell>{student.phone}</Table.Cell>
                <Table.Cell>{student.parent_phone}</Table.Cell>
                <Table.Cell>{student.line}</Table.Cell>
                <Table.Cell>{student.high_school}</Table.Cell>
                <Table.Cell>{student.church}</Table.Cell>
                <Table.Cell>{student.bandung_address}</Table.Cell>
                <Table.Cell>{student.hometown_address}</Table.Cell>
                <Table.Cell>
                  <Button icon="edit" onClick={(e) => this.handleEditStart(e, student)} />
                  <Button icon="delete" negative onClick={this.handleWarningOpen} />
                </Table.Cell>
                <Confirm
                  open={this.state.warningOpen}
                  content='This action cannot be undone!'
                  onCancel={this.handleWarningClose}
                  onConfirm={(e) => this.handleDelete(e, student.id)}
                />
              </Table.Row>
            )) :
              <Table.Row>
                <Table.Cell colSpan='5'><i>Tidak ada data yang sesuai.</i></Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>

        {students.error &&
          <Message error attached='bottom'>
            <Icon name='warning sign'/> {students.error}
          </Message>
        }

        <PageMenu floated='right' size='mini' storeKey='students' onPageChange={fetchStudentsDispatcher} />

        <Dimmer inverted active={students.isFetching}><Loader size='big' /></Dimmer>
        <EditStudent open={this.state.editing} readOnlyValues={this.state.editingStudent || {}} onClose={this.handleEditDone} />

      </AppLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
    isSupervisor: state.session.user && (state.session.user.role === 'supervisor' || state.session.user.role === 'admin')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStudentsDispatcher: (pageInfo) => dispatch(fetchStudents(pageInfo)),
    initEditStudentFormDispatcher: initialValues => dispatch(initialize(EDIT_STUDENT_FORM, initialValues)),
    deleteStudentDispatcher: (idStudents) => dispatch(deleteStudent(idStudents))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);

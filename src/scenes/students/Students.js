import React from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../common/components/AppLayout';
import PageMenu from '../../common/components/Pagination/PageMenu';
import { fetchStudents, deleteStudent } from '../../services/students/actions';
import { Input, Button, Dimmer, Header, Icon, Loader, Message, Table, Confirm } from 'semantic-ui-react';
import EditStudent, { EDIT_STUDENT_FORM } from './EditStudent'
import CreateStudent, { CREATE_STUDENT_FORM } from './CreateStudent'
import { initialize } from 'redux-form';
import { enumText, departments, genders, displayDateFormat, displayDateTimeFormat } from '../../common/constants';
import { getFirstSortDirection } from '../../common/utils';
import moment from 'moment';

class Students extends React.Component {
  constructor (props) {
    super(props);
    this.state = {search: '', creatingStudent: false, editingStudent: null, deleteConfirmStudent: null};
  }

  componentDidMount () {
    this.props.fetchStudentsDispatcher(this.props.students);
  };

  handleSearchChange = (event) => {
    this.setState({search: event.target.value});
  };

  handleSearch = () => {
    this.props.fetchStudentsDispatcher(Object.assign(this.props.students, {search: this.state.search}));
  };

  handleSort = (field) => {
    let sort = [{
      field,
      direction: getFirstSortDirection(this.props.students && this.props.students.sort, field) === 'ascending' ? 'descending' : 'ascending'
    }];
    this.props.fetchStudentsDispatcher(Object.assign(this.props.students, {sort}));
  };

  handleCreateStart = () => {
    this.props.initCreateStudentFormDispatcher();
    this.setState({creatingStudent: true});
  };

  handleEditStart = ({id, ...rest}) => {
    this.props.initEditStudentFormDispatcher(rest);
    this.setState({editingStudent: {id, ...rest}});
  };

  render () {
    const {students, fetchStudentsDispatcher, deleteStudentDispatcher} = this.props;
    return (
      <AppLayout section='students'>
        <div style={{display: 'flex'}}>
          <div>
            <Header style={{margin: '5px 0'}}>
              Data Anggota
              {students.search &&
              <small>{' - hasil pencarian untuk \'' + students.search + '\''}</small>
              }
            </Header>
          </div>

          <div style={{marginLeft: 'auto'}}>
            <Input type='text' placeholder='Cari...' style={{marginRight: '10px'}}
                   value={this.state.search} onChange={this.handleSearchChange}
                   action={<Button icon='search' onClick={this.handleSearch}/>}
            />
            <Button primary icon='add' onClick={this.handleCreateStart}/>
          </div>
        </div>

        <Table compact sortable singleLine unstackable attached={students.error ? 'top' : null}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing/>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'id')}
                                onClick={() => this.handleSort('id')}>ID</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'name')}
                                onClick={() => this.handleSort('name')}>Nama</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'year')}
                                onClick={() => this.handleSort('year')}>Angkatan</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'department')}
                                onClick={() => this.handleSort('department')}>Fakultas/Prodi</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'tpb_nim')}
                                onClick={() => this.handleSort('tpb_nim')}>NIM TPB</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'nim')}
                                onClick={() => this.handleSort('nim')}>NIM</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'gender')}
                                onClick={() => this.handleSort('gender')}>Jenis kelamin</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'birth_date')}
                                onClick={() => this.handleSort('birth_date')}>Tanggal lahir</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'phone')}
                                onClick={() => this.handleSort('phone')}>Telepon</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'parent_phone')}
                                onClick={() => this.handleSort('parent_phone')}>Telepon orangtua</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'line')}
                                onClick={() => this.handleSort('line')}>LINE</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'current_address')}
                                onClick={() => this.handleSort('current_address')}>Alamat tinggal</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'hometown_address')}
                                onClick={() => this.handleSort('hometown_address')}>Alamat asal</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'high_school')}
                                onClick={() => this.handleSort('high_school')}>Asal sekolah</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'church')}
                                onClick={() => this.handleSort('church')}>Gereja</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'created_at')}
                                onClick={() => this.handleSort('created_at')}>Dibuat pada</Table.HeaderCell>
              <Table.HeaderCell sorted={getFirstSortDirection(students.sort, 'updated_at')}
                                onClick={() => this.handleSort('updated_at')}>Diubah pada</Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {students.data ? students.data.map((student) => (
              <Table.Row key={student.id}>
                <Table.Cell collapsing>
                  <Button size='mini' circular content='Edit' icon="edit"
                          onClick={() => this.handleEditStart(student)}/>
                  <Button size='mini' circular icon="trash" basic negative
                          onClick={() => this.setState({deleteConfirmStudent: student})}/>
                </Table.Cell>

                <Table.Cell>{student.id}</Table.Cell>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.year}</Table.Cell>
                <Table.Cell>{enumText(departments, student.department)}</Table.Cell>
                <Table.Cell>{student.tpb_nim}</Table.Cell>
                <Table.Cell>{student.nim}</Table.Cell>
                <Table.Cell>{enumText(genders, student.gender)}</Table.Cell>
                <Table.Cell>{moment(student.birth_date).format(displayDateFormat)}</Table.Cell>
                <Table.Cell>{student.phone}</Table.Cell>
                <Table.Cell>{student.parent_phone}</Table.Cell>
                <Table.Cell>{student.line}</Table.Cell>
                <Table.Cell>{student.current_address}</Table.Cell>
                <Table.Cell>{student.hometown_address}</Table.Cell>
                <Table.Cell>{student.high_school}</Table.Cell>
                <Table.Cell>{student.church}</Table.Cell>
                <Table.Cell>{moment(student.created_at).format(displayDateTimeFormat)}</Table.Cell>
                <Table.Cell>{moment(student.updated_at).format(displayDateTimeFormat)}</Table.Cell>
              </Table.Row>
            )) :
              <Table.Row>
                <Table.Cell colSpan='18'><i>Tidak ada data yang sesuai.</i></Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>

        {students.error &&
        <Message error attached='bottom'>
          <Icon name='warning sign'/> {students.error}
        </Message>
        }

        <PageMenu floated='right' size='mini' storeKey='students' onPageChange={fetchStudentsDispatcher}/>

        <Dimmer inverted active={students.isFetching}><Loader size='big'/></Dimmer>

        <Confirm
          open={!!this.state.deleteConfirmStudent}
          content={'Yakin ingin menghapus data anggota dengan ID '
          + (this.state.deleteConfirmStudent && this.state.deleteConfirmStudent.id) + '?'}
          confirmButton='Hapus'
          cancelButton='Batal'
          onCancel={() => this.setState({deleteConfirmStudent: null})}
          onConfirm={() => {
            deleteStudentDispatcher(this.state.deleteConfirmStudent && this.state.deleteConfirmStudent.id);
            this.setState({deleteConfirmStudent: null})
          }
          }
        />

        <CreateStudent open={this.state.creatingStudent}
                       onClose={() => this.setState({creatingStudent: false})}
        />

        <EditStudent open={!!this.state.editingStudent}
                     readOnlyValues={this.state.editingStudent || {}}
                     onClose={() => this.setState({editingStudent: null})}
        />

      </AppLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStudentsDispatcher: (pageInfo) => dispatch(fetchStudents(pageInfo)),
    initCreateStudentFormDispatcher: initialValues => dispatch(initialize(CREATE_STUDENT_FORM)),
    initEditStudentFormDispatcher: initialValues => dispatch(initialize(EDIT_STUDENT_FORM, initialValues)),
    deleteStudentDispatcher: (id) => dispatch(deleteStudent(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);

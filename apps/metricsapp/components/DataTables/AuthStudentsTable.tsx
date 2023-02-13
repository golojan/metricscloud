import React, { forwardRef, useState } from 'react';
import MaterialTable, { Icons, Column, Action } from '@material-table/core';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  PanoramaFishEye,
} from '@material-ui/icons';

const tableIcons: Icons<AuthUserInfo> = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

import { authSchoolId } from '@metricsai/metrics-hocs';
import { AuthUserInfo, DepartmentsInfo, FacultiesInfo } from '@metricsai/metrics-interfaces';
import Image from 'next/image';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { RootState } from '@metricsai/metrics-store';

import {
  getSchoolSettings,
  citationByWeight,
  hindexByWeight,
  i10indexByWeight,
  totalRanking,
  citationsPerCapita,
  hindexPerCapita,
  i10hindexPerCapita
} from '@metricsai/metrics-utils';
import AuthStudentProfileRow from './AuthStudentProfileRow';


const schoolId = authSchoolId();
const apiUri = process.env.NEXT_PUBLIC_API_URI;


type Props = {
  title: string;
  data: AuthUserInfo[];
  loading: boolean;
};



const AuthStudentsTable = (props: Props) => {

  const { title, data, loading } = props;
  const [selectedRow, setSelectedRow] = useState<AuthUserInfo>({
    _id: ''
  });

  const { statistics_lecturers } = useSelector((state: RootState) => state.lecturers);

  const { data: faculties, isLoading: fac_loading } = useSWR<{ status: boolean, data: FacultiesInfo[] }>(`${apiUri}faculties/${schoolId}/list`, () => fetch(`${apiUri}faculties/${schoolId}/list`).then(res => res.json()));
  const { data: departments, isLoading: dep_loading } = useSWR<{ status: boolean, data: DepartmentsInfo[] }>(`${apiUri}departments/${schoolId}/list`, () => fetch(`${apiUri}departments/${schoolId}/list`).then(res => res.json()));

  const dName = (departmentId: string) => {
    if (dep_loading) return '...';
    const department = departments.data.find(dep => dep._id === departmentId);
    return department ? department.departmentName : 'No Department';
  }

  const fName = (facultyId: string) => {
    const faculty = faculties.data.find(fac => fac._id === facultyId);
    return faculty?.facultyName ? faculty.facultyName : 'No Faculty';
  }

  const options = {
    paging: true,
    pageSize: 10,
    exportButton: true,
    selection: true,
    sorting: true,
    exportAllData: true,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 100, 200, 300, 400],
    headerStyle: {
      fontWeight: 'bold',
      backgroundColor: '#01579b',
      color: '#FFF'
    },
    rowStyle: rowData => ({
      backgroundColor: (selectedRow === rowData._id) ? '#EEE' : '#FFF'
    })
  };


  const columns: Column<AuthUserInfo>[] = [
    {
      field: 'picture',
      title: '-',
      render: rowData => <Image alt={`${rowData.fullname}`} src={rowData.picture} width={40} height={40} className='rounded-[50%]' />
    },
    { title: 'Name', field: 'fullname' },
    { title: 'Faculty', field: 'facultyId', render: rowData => <span>{fName(rowData.facultyId)}</span> },
    { title: 'Department', field: 'departmentId', render: rowData => <span>{dName(rowData.departmentId)}</span> },
    { title: 'Citations', field: 'citations', render: rowData => <span>{citationsPerCapita(rowData.citations, rowData.totalPublications)}</span> },
    { title: 'H-Index', field: 'hindex', render: rowData => <span>{hindexPerCapita(rowData.hindex, rowData.firstPublicationYear)}</span> },
    { title: 'i10-Index', field: 'i10hindex', render: rowData => <span>{i10hindexPerCapita(rowData.i10hindex, rowData.firstPublicationYear)}</span> }
  ];

  const detailPanel = [
    {
      tooltip: 'Show Student Details',
      render: rowData => {
        return (
          <AuthStudentProfileRow row={rowData} />
        )
      },
    },
  ];

  return (
    <MaterialTable
      title={title}
      isLoading={loading}
      data={data}
      options={options}
      columns={columns}
      icons={tableIcons}
      detailPanel={detailPanel}
      onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow))}
    />
  );
};

export default AuthStudentsTable;

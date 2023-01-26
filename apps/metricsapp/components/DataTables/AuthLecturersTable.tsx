import React, { forwardRef } from 'react';
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
import PieChart from 'apps/metricsapp/widgets/charts/PieChart';

const schoolId = authSchoolId();

const options = {
  paging: true,
  pageSize: 10,
  emptyRowsWhenPaging: false,
  pageSizeOptions: [10, 100, 200, 300, 400],
  headerStyle: {
    fontWeight: 'bold',
    backgroundColor: '#01579b',
    color: '#FFF'
  },
  exportButton: true,
  exportFileName: `metricsai-${schoolId}-users`,
};

type Props = {
  title: string;
  data: AuthUserInfo[];
  loading: boolean;
};


const AuthLecturersTable = (props: Props) => {
  const { title, data, loading } = props;

  const { data: faculties, isLoading: fac_loading } = useSWR<{ status: boolean, data: FacultiesInfo[] }>(`/api/faculties/${schoolId}/list`, () => fetch(`/api/faculties/${schoolId}/list`).then(res => res.json()));
  const { data: departments, isLoading: dep_loading } = useSWR<{ status: boolean, data: DepartmentsInfo[] }>(`/api/departments/${schoolId}/list`, () => fetch(`/api/departments/${schoolId}/list`).then(res => res.json()));

  const dName = (departmentId: string) => {
    if (dep_loading) return '...';
    const department = departments.data.find(dep => dep._id === departmentId);
    return department ? department.departmentName : 'No Department';
  }

  const fName = (facultyId: string) => {
    if (fac_loading) return '...';
    const faculty = faculties.data.find(fac => fac._id === facultyId);
    return faculty ? faculty.facultyName : 'No Faculty';
  }

  const columns: Column<AuthUserInfo>[] = [

    { title: 'ID', field: '_id', hidden: true },
    { title: 'Name', field: 'fullname' },
    { title: 'Gender', field: 'gender' },
    { title: 'Faculty', field: 'facultyId', render: rowData => <span>{fName(rowData.facultyId)}</span> },
    { title: 'Department', field: 'departmentId', render: rowData => <span>{dName(rowData.departmentId)}</span> },
    { title: 'Citations', field: 'citationsPerCapita', render: rowData => <span>{rowData.citationsPerCapita.toFixed(2)}</span> },
    { title: 'H-Index', field: 'hindexPerCapita', render: rowData => <span>{rowData.hindexPerCapita.toFixed(2)}</span> },
    { title: 'i10-Index', field: 'i10hindexPerCapita', render: rowData => <span>{rowData.i10hindexPerCapita.toFixed(2)}</span> },
  ];

  const detailPanel = [
    {
      tooltip: 'Show Lecture Details',
      render: rowData => {
        return (
          <div className='bg-gray-300 m-4 min-h-[50px]'>
            <h1>{rowData.firstname}</h1>
          </div>
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
    />
  );
};

export default AuthLecturersTable;
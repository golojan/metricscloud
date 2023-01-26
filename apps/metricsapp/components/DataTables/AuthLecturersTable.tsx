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
import { AuthUserInfo } from '@metricsai/metrics-interfaces';
import Image from 'next/image';

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
  const columns: Column<AuthUserInfo>[] = [
    {
      field: 'picture',
      title: '-',
      render: rowData => <Image alt={`${rowData.fullname}`} src={rowData.picture} width={40} height={40} className='rounded-[50%]' />
    },
    { title: 'Name', field: 'fullname' },
    { title: 'Gender', field: 'gender' },
    { title: 'Faculty', field: 'departmentId' },
    { title: 'Faculty', field: 'facultyId' },
    { title: 'Department', field: 'facultyId' },
    { title: 'Citations', field: 'citationsPerCapita', render: rowData => <span>{rowData.citationsPerCapita.toFixed(2)}</span> },
    { title: 'H-Index', field: 'hindexPerCapita', render: rowData => <span>{rowData.hindexPerCapita.toFixed(2)}</span> },
    { title: 'i10-Index', field: 'i10hindexPerCapita', render: rowData => <span>{rowData.i10hindexPerCapita.toFixed(2)}</span> },
  ];

  const detailPanel = [
    {
      tooltip: 'Show Lecture Details',
      render: rowData => {
        return (
          <div className='w-full h-[20px]'>
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

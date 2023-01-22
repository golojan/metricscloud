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

const options = {
  paging: true,
  pageSize: 10,
  emptyRowsWhenPaging: false,
  pageSizeOptions: [10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  headerStyle: {
    fontWeight: 'bold',
  },
  selection: true,
  exportButton: true,
  exportFileName: `metricsai-${authSchoolId()}-users`,
};

const actions = [
  {
    icon: tableIcons.Edit,
    tooltip: 'Edit User',
    onClick: (evt, data) => {
      console.log('Edit User', data);
    },
  },
  {
    icon: tableIcons.Delete,
    tooltip: 'Delete User',
    onClick: (evt, data) => {
      console.log('Delete User', data);
    },
  },
];

type Props = {
  title: string;
  data: AuthUserInfo[];
  columns: Column<AuthUserInfo>[];
  loading: boolean;
};

const AuthUserTable = (props: Props) => {
  const { title, data, columns, loading } = props;
  const schoolId = authSchoolId();

  return (
    <MaterialTable
      actions={actions}
      title={title}
      isLoading={loading}
      columns={columns}
      data={data}
      options={options}
      icons={tableIcons}
    />
  );
};

export default AuthUserTable;

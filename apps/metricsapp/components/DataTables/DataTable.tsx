import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { useMemo } from 'react';
import { AuthUserInfo } from '@metricsai/metrics-interfaces';

type Props = {
  title: string;
  data: AuthUserInfo[];
  loading: boolean;
};

const DataTable = (props: Props) => {
  const { title, data, loading } = props;
  return (
    <>
      <TableVirtuoso
        style={{ height: 400 }}
        className="table table-striped table-hover"
        data={data}
        totalCount={data.length}
        fixedHeaderContent={() => (
          <tr>
            <th style={{ background: 'white' }}>ID</th>
            <th style={{ background: 'white' }}>FULL NAME</th>
            <th style={{ background: 'white' }}>CITATIONS</th>
            <th style={{ background: 'white' }}>H-INDEX </th>
            <th style={{ background: 'white' }}>I10-INDEX </th>
            <th style={{ background: 'white' }}>TOTAL </th>
          </tr>
        )}
        itemContent={(index, user) => (
          <>
            <td style={{ width: 150 }}>{user.username}</td>
            <td>{user.firstname}</td>
            <td>{user.citations}</td>
            <td>{user.hindex}</td>
            <td>{user.i10hindex}</td>
            <td>{0}</td>
          </>
        )}
      />
    </>
  );
};

export default DataTable;

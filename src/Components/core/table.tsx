import * as React from 'react';
import { DataGrid, GridApi, GridColDef, GridEditCellValueParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

export type rowData = {
  id: number;
  task_name: string;
  status: string
}

export type IProps = {
  rows: rowData[]
  setSelectedRow: (data: rowData[]) => void;
  openEditModal: (data: any) => void;
}

const DataTable = (props: IProps) => {

  const columns: GridColDef[] = React.useMemo(() => {
    return [
      { field: 'id', headerName: 'No.', width: 70 },
      {
        field: 'task_name',
        headerName: 'Task Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
      },
      {
        field: 'status',
        headerName: 'Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
      },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params: any) => {
          const onClick = (e: any) => {
            e.stopPropagation(); // don't select this row after clicking
            props?.openEditModal(params.row)
            console.log(params.row, "onclick");
          };

          return <Button onClick={onClick}>Edit</Button>;
        }
      },
    ];
  }, [])

  return (
    <Box style={{ height: "50vh", width: '75%' }} >
      <DataGrid
        rows={props?.rows}
        columns={columns}
        //@ts-ignore
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onRowSelectionModelChange={(ids: any) => {
          const selectedIDs = new Set(ids);
          const selectedRows = props.rows.filter((row) =>
            selectedIDs.has(row.id),
          );
          props?.setSelectedRow(selectedRows);
        }}
      />
    </Box>
  );
}

export default DataTable;
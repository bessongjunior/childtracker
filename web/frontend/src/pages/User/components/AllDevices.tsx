import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'serial number',
    headerName: 'Device SN',
    width: 150,
    editable: false,
  },
  {
    field: 'name',
    headerName: 'Device Name',
    width: 150,
    editable: false,
  },
  {
    field: 'task',
    headerName: 'State (Active)',
    // type: 'boolean',
    width: 110,
    editable: false,
  }, 
];

export const AllDevices: FC = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/admin/alldevices")
          .then((res) => res.json())
          .then((res) => {
            // console.log(res);
            setData(res);
          });
      }, []);
      console.log(data);

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={setData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
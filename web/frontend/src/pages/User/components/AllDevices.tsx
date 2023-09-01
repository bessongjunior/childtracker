import { FC, Fragment, useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Title from '../../dashboard/components/Title';
// import { useAuthContext } from '../../../hooks/useAuthContext';


export const AllDevices: FC = () => {

  // const { user } = useAuthContext()

  
  // console.log(user)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '');
    console.log(user, 'done', user.token)

    // if (user) {
    //   dispatch({ type: 'LOGIN', payload: user });
    // }
  }, []);
  // console.log(user.token)

  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '');
      fetch("http://127.0.0.1:5000/admin/v1/alldevices",
      {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`}
    })
        .then((res) => res.json())
        .then((res) => { console.log(res); setData(res); })
        .catch((err) => console.log(err))
    }, []);
    console.log(data);

  const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'serial number',
        headerName: 'Device SN',
        width: 130,
        editable: false,
      },
      {
        field: 'name',
        headerName: 'Device Name',
        width: 130,
        editable: false,
      },
      {
        field: 'task',
        headerName: 'State (Active)',
        // type: 'boolean',
        width: 130,
        editable: false,
      }, 
      {
        field: 'owner',
        headerName: "Owner's name",
        width: 130,
        editable: false
      }
  ];

  return (
      <Fragment>
          {/* <Box sx={{my: 5}}>{' '}Hello</Box> */}
          <Card>
          <CardContent>
            <Title>All Devices Information</Title>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
              pagination: {
                  paginationModel: {
                  pageSize: 5,
                  },
              },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{my: 1}}
          />
          </CardContent>
          </Card>
      </Fragment>
  )
}
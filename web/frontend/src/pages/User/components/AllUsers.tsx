import { FC, Fragment, useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
// 
import Title from '../../dashboard/components/Title';

// https://stackoverflow.com/questions/75437594/displaying-data-in-material-ui-table-from-api-using-fetch-api


export const AllUsers: FC = () => {

    const [data, setData] = useState([]);

    const accessToken = ''

    useEffect(() => {
        fetch("http://127.0.0.1:5000/admin/v1/allusers",
        {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`}
        })
          .then((res) => res.json())
          .then((res) => { setData(res); })
          .catch((err) => console.log(err))
      }, []);
      console.log(data);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { 
            field: 'username',
            headerName: 'User name',
            width: 130,
            editable: false,
       },
        {
          field: 'firstname',
          headerName: 'First name',
          width: 130,
          editable: false,
        },
        {
          field: 'lastname',
          headerName: 'Last name',
          width: 130,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
        //   type: 'number',
          width: 150,
          editable: false,
        },
        // {
        //     field: 'profile_photo',
        //     headerName: 'Profile',
        //     // width: '150',
        //     editable: false,
        // },
        {
            field: 'sex',
            headerName: 'Sex',
            // width: '130',
            editable: false,
        },
        {
            field: 'date_joined',
            headerName: 'Date Joined',
            // width: '150',
            editable: false,
        },
        {
            field: 'country',
            headerName: 'Country',
            // width: '150',
            editable: false,
        },

    ];

    // const rows = [setData]
    return (
        <Fragment>
            {/* <Box sx={{ height: 400, width: '100%' }}> */}
            <Card>
                <CardContent>
                    <Title>All Users Information</Title>
                    <DataGrid
                        // rows={rows}
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
            {/* </Box> */}
        </Fragment>
    )
}
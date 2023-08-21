import { FC, Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef} from '@mui/x-data-grid';


// import Link from '@mui/material/Link';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TablePagination from '@mui/material/TablePagination';
import Title from '../../dashboard/components/Title';

// https://stackoverflow.com/questions/75437594/displaying-data-in-material-ui-table-from-api-using-fetch-api


export const AllUsers: FC = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/user/v1/allusers")
          .then((res) => res.json())
          .then((res) => {
            // console.log(res);
            setData(res);
          });
      }, []);
      console.log(data);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { 
            field: 'username',
            headerName: 'User name',
            width: 150,
            editable: false,
       },
        {
          field: 'firstname',
          headerName: 'First name',
          width: 150,
          editable: false,
        },
        {
          field: 'lastname',
          headerName: 'Last name',
          width: 150,
          editable: false,
        },
        {
          field: 'profile',
          headerName: 'Email',
        //   type: 'number',
          width: 150,
          editable: false,
        },
        {
            field: 'profile_photo',
            headerName: 'Profile',
            width: '150',
            editable: false,
        },
        {
            field: 'sex',
            headerName: 'Sex',
            width: '130',
            editable: false,
        },
        {
            field: 'date_joined',
            headerName: 'Date Joined',
            width: '150',
            editable: false,
        },
        {
            field: 'xountry',
            headerName: 'Country',
            width: '150',
            editable: false,
        },

    ];

    // const rows = [setData]
    return (
        <Fragment>
            <Title>All Customers</Title>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    // rows={rows}
                    rows={setData}
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
                />
            </Box>
        </Fragment>
    )
}




// export default function DataGridDemo() {
//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// }
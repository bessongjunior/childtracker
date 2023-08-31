import { FC, Fragment } from 'react';
import { AllUsers } from './components/AllUsers';
import { AllDevices } from './components/AllDevices';
import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

const Users: FC = () => {
    return (
        // <ThemeProvider theme={defaultTheme}>
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={4}>
                    <Grid2 xs={12}>
                        <AllUsers />
                    </Grid2>
                    <Grid2 xs={12}>
                        <AllDevices />
                    </Grid2>
                </Grid2>
            </Box>
        </Fragment>
        // </ThemeProvider>
    );
}


export default Users;

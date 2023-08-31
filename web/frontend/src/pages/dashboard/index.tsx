import { FC, Fragment} from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import { AddDevice } from './components/AddDevice';
import { UserInfo } from './components/SearchUser';
import { TrackDevice } from './components/TrackDevice';
import { FindADeviceInfo } from './components/DeviceInfo';
import { CardContent } from '@mui/material';
import Title from './components/Title';


// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

const Dashboard: FC = () => {

  return (
    // <ThemeProvider theme={defaultTheme}>
        <Fragment>   
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={4} md={4} lg={4}>
                      <Card><CardContent><Title>Hello</Title></CardContent></Card>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                      <Card><CardContent><Title>Hello</Title></CardContent></Card>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                      <Card><CardContent><Title>Hello</Title></CardContent></Card>
                    </Grid>
                    {/* <Grid item xs={3} md={3} lg={3}>
                      <Card><CardContent><Title>Hello</Title></CardContent></Card>
                    </Grid> */}
                  </Grid>
              </Grid>
              {/* Register a user device */}
              <Grid item xs={12} md={8} lg={8}>
                <AddDevice />
              </Grid>
              {/* Get user info from mail */}
              <Grid item xs={12} md={4} lg={4}>
                <UserInfo />
              </Grid>

              {/* Track a Device */}
              <Grid item xs={12}  md={8} lg={8}>
                <TrackDevice />
              </Grid>

              {/* Get device Info */}
              <Grid item xs={12} md={4} lg={4}>
                <FindADeviceInfo />
              </Grid>
            </Grid>
        </Fragment>
  );
}

export default Dashboard;


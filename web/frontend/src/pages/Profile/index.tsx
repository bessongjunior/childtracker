import { FC, Fragment } from 'react';
import Grid from '@mui/material/Grid';


import { EditProfile } from './components/EditProfile';
import { ProfileInfo } from './components/ProfileInfo';
import { AdminReviews } from './components/Reviews';


const Profile: FC = () => {

    return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item md={5} xs={12} >
            <ProfileInfo />
          </Grid>

          <Grid item md={7} xs={12} >
            <AdminReviews />
          </Grid>

          <Grid item xs={12}>
            <EditProfile />
          </Grid>
        </Grid>
      </Fragment>
    )
}

export default Profile;


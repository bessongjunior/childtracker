import { FC, Fragment } from 'react';
import { TrackDevices } from './components/TrackDevice';
import Container from '@mui/material/Container';
import { TrackHistoryShort } from './components/TrackHistory';


export const UserDashboard: FC = () => {

    return (
        <Fragment>
            <Container sx={{ mt: 3 }} maxWidth="lg">
                <TrackDevices />
                <TrackHistoryShort />
            </Container>
        </Fragment>
    )
}
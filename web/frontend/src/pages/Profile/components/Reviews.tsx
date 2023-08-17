import { FC, Fragment, } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

export const AdminReviews: FC = () => {

    return (
        <Fragment>
            <Card>
                <h2>Review</h2> <hr />
                <Grid container spacing={3}>
                    <Grid item>
                        <h4>Upvotes:</h4>
                        <h4>Reviews:</h4>
                        <h4>Location:</h4>
                        <h4>Disponibility:</h4>
                        <h4>Experience:</h4>
                    </Grid>
                    <Grid item>
                        <h5>1000</h5>
                        <h5>200</h5>
                        <h5>Buea, Cameroon</h5>
                        <h5>24/6</h5>
                        <h5>3+ years</h5>
                    </Grid>
                </Grid>              
            </Card>
        </Fragment>
    )
}
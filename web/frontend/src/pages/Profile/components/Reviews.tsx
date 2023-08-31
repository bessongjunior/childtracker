import { FC, Fragment, } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

export const AdminReviews: FC = () => {

    return (
        <Fragment>
            {/* <Card>
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
            </Card> */}
            <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        My Reviews
                                        </Typography>
                                        <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={9}>
                                            <Box sx={{
                                                display: 'grid',
                                                gridAutoFlow: 'row',
                                                gridTemplateColumns: 'repeat(2, 0fr)',
                                                gridTemplateRows: 'repeat(1, 25px)',
                                                gap: 1,
                                            }}>
                                                <Stack>
                                                <Typography variant="h6" component="h4">
                                                    Upvotes
                                                </Typography>
                                                <Typography variant="h6" component="h4">
                                                    Rating
                                                </Typography>
                                                <Typography variant="h6" component="h4">
                                                    Location
                                                </Typography>
                                                <Typography variant="h6" component="h4">
                                                    Availability
                                                </Typography>
                                                <Typography variant="h6" component="h4">
                                                    Experience
                                                </Typography>
                                                </Stack>

                                                <Stack>
                                                <Typography variant="h6" component="div">
                                                    :
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    :
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    :
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    :
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    :
                                                </Typography>
                                                </Stack>
                                            </Box>
                                            <Box>
                                            <Typography variant="h6" component="div">
                                                    234 votes
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    <Rating name="half-rating" defaultValue={3.5} precision={0.5} />  
                                                </Typography>
                                                <Typography variant="h6" component="div" sx={{mt: '2px'}}>
                                                    Yaounde, Cameroon
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    24/6
                                                </Typography>
                                                <Typography variant="h6" component="div">
                                                    5+ years
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <Typography sx={{ my: 1 }} color="text.secondary">
                                        Quote of the Day
                                        </Typography>
                                        <Typography variant="body2">
                                        Success seems to be connected with action. Successful people keep moving. They make mistakes, but they don’t quit.
                                        <br />
                                        {'"Conrad Hilton"'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{mb:'2px'}}>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
        </Fragment>
    )
}
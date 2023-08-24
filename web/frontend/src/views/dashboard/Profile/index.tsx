import { 
    Card, 
    CardContent, 
    Grid,
    Box,
    Typography,
    CardHeader,
    Button, 
    Divider
} from '@mui/material';
import Container from '@mui/material/Container';
import { FC, Fragment } from 'react';
import ProfileCover from './components/ProfileCover';



export const UserProfile: FC = () => {

    const user = {
        savedCards: 7,
        name: 'Catherine Pike',
        coverImg: '/static/images/placeholders/covers/5.jpg',
        avatar: '/static/images/avatars/4.jpg',
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
        jobtitle: 'Medical Doctor',
        location: 'Yaounde, Cameroon',
        followers: '465'
      };

    return (
        <Fragment>
            <Container sx={{ mt: 3 }} maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    {/* md={8} */}
                    <Grid item xs={12}>
                        <ProfileCover user={user} />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Card>
                            <CardHeader title='My details' />
                            <Divider />
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Card>
                            <CardHeader title='Recent Activities' />
                            <Divider />
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>
                    
                    {/* <h1>sample</h1> */}
                </Grid>
            </Container>
        </Fragment>
    )
}
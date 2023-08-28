import { FC, Fragment, useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { ProfileCover } from './components/ProfileCover';

interface DataTypes {
    //Defines shape of data
    id: number;
    username: string;
    profile_photo: string;
    email: string;
    firstname: string;
    lastname: string;
    date_of_birth: string;
    sex: string;
    country: string;
    province: string;
    description: string;
    jobtitle: string;
}

export const UserProfile: FC = () => {



    //   const [data, setData] = useState([])

    //   useEffect(() => {
    //         fetch('http://127.0.0.1:5000/user/user-info')
    //         .then((res) => res.json())
    //         .then((data) => setData(data));
            
    //   }, []);

    // const [data, setData] = useState<DataTypes[]>([]);

    const [data, setData] = useState<DataTypes | null>(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/user/user-info')
        .then((res) => res.json())
        .then((data: DataTypes) => {
            console.log(data);
            setData(data);
        });
    }, []);

    const user = {
        savedCards: 7,
        name: data ? data?.firstname+' '+data?.lastname : 'Catherine Pike', //
        coverImg: 'https://source.unsplash.com/random?wallpapers',
        avatar: data?.profile_photo, //url_for('static', filename=f'profile/{user.id}/{user.profile_photo}', _external=True)
        description: data && data?.description === null ?  data?.description : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
        jobtitle: data && data?.jobtitle ? data?.jobtitle :'Software Engineer',
        location: data ? data?.province+', '+data?.country : 'Yaounde, Cameroon',
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
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title='My details' />
                            <Divider />
                            <CardContent>
                                <Stack direction='row' spacing={8}>
                                    <Stack spacing={3}>
                                        <Typography>First Name</Typography>
                                        <Typography>Last Name</Typography>
                                        <Typography>User Name</Typography>
                                        <Typography>Email</Typography>
                                        <Typography>Sex</Typography>
                                        <Typography>Date of Birth</Typography>
                                        <Typography>Province</Typography>
                                        <Typography>Country</Typography>
                                    </Stack>
                                {/* {data.map(item => (
                                    <Stack spacing={3} key={item.id}>
                                        <Typography>{item.firstname}</Typography>
                                        <Typography>1</Typography>
                                        <Typography>3</Typography>
                                        <Typography>4</Typography>
                                        <Typography>5</Typography>
                                        <Typography>6</Typography>
                                        <Typography>7</Typography>
                                        <Typography>8</Typography>
                                    </Stack>
                                ))} */}
                                {data && (
                                    <Stack spacing={3}>
                                    <Typography>{data.firstname}</Typography>
                                    <Typography>{data.lastname}</Typography>
                                    <Typography>{data.username}</Typography>
                                    <Typography>{data.email}</Typography>
                                    <Typography>{data.sex}</Typography>
                                    <Typography>{data.date_of_birth}</Typography>
                                    <Typography>{data.province}</Typography>
                                    <Typography>{data.country}</Typography>
                                </Stack>
                                )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{mb:4}}>
                        <Card>
                            <CardHeader title='Recent Activities' />
                            <Divider />
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}
import { FC, Fragment, useEffect, useState } from 'react'; //  

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import defaults from '../../../assets/images/defaults.jpg';
import Mail from '@mui/icons-material/Mail';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import LocationOn from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useAuthContext } from '../../../hooks/useAuthContext';

type DataTypes = {
    date_joined: string;
    email: string;
    name: string;
    image_url: string;
    username: string;
    location: string;
}

export const ProfileInfo: FC = () => {
    
    const [data, setData] = useState<DataTypes | null>(null)
    const {user} = useAuthContext()
    console.log(user?.token)

    useEffect(() => {
        fetch('http://127.0.0.1:5000/admin/v1/profile-info', 
        {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user?.token}`}
        })
        .then((res) => res.json())
        .then((data: DataTypes) => {
            console.log(data);
            setData(data);
        });
    }, []);

    

    return (
        <Fragment>
            <Card sx={{ minWidth: 275 }}>
                {data &&
                    (
                        <CardContent>
                            <Typography sx={{ fontSize: 14, alignContent: 'center' }} color="text.secondary" gutterBottom>
                                My Informations
                            </Typography>
                            <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar
                                    alt={data.username}
                                    // src="../../assets/images/defaults.jpg"
                                    src={ data && data.image_url != null ? data.image_url : defaults }
                                    sx={{ width: 100, height: 100 }}
                                />
                                <Typography sx={{ alignContent: 'center' }} variant="h5" component="div">
                                    {data.username}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    @{data.name} - Administrator
                                </Typography>
                            </Stack>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Profile Information
                            </Typography>

                            {/* <Typography component='h4' noWrap><LocationOn fontSize='small' /> {' '}<span style={{marginBottom: '5px'}}>values</span></Typography> */}
                            <Stack direction="row" alignItems="center" gap={4}>
                                <LocationOn fontSize='small' sx={{ color: 'blue[500]' }} />
                                <Typography variant="body1">Littoral, Cameroon</Typography>
                            </Stack>
                            {/* <Typography component='h4' noWrap><CalendarMonth fontSize='small' /> {' '}values</Typography> */}
                            <Stack direction="row" alignItems="center" gap={4}>
                                <CalendarMonth fontSize='small' sx={{ color: 'blue[500]' }} />
                                <Typography variant="body1">{data.date_joined}</Typography>
                            </Stack>
                            {/* <Typography component='h4' noWrap><Mail fontSize='small' /> {' '}values</Typography> */}

                            <Stack direction="row" alignItems="center" gap={4}>
                                <Mail fontSize='small' sx={{ color: 'blue[600]' }} />
                                <Typography variant="body1">{data.email}</Typography>
                            </Stack>
                        </CardContent>
                    )
                // :
                //     (
                //         <CardContent>
                //             <Typography sx={{ fontSize: 14, alignContent: 'center' }} color="text.secondary" gutterBottom>
                //                 My Informations
                //             </Typography>
                //             <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                //                 <Avatar
                //                     alt="Remy Sharp"
                //                     // src="../../assets/images/defaults.jpg"
                //                     src={defaults}
                //                     sx={{ width: 100, height: 100 }}
                //                 />
                //                 <Typography sx={{ alignContent: 'center' }} variant="h5" component="div">
                //                     Carzola Jorgensen
                //                 </Typography>
                //                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                //                     @username - Administrator
                //                 </Typography>
                //             </Stack>
                //             <Typography sx={{ mb: 1.5 }} color="text.secondary">
                //                 Profile Information
                //             </Typography>

                //             {/* <Typography component='h4' noWrap><LocationOn fontSize='small' /> {' '}<span style={{marginBottom: '5px'}}>values</span></Typography> */}
                //             <Stack direction="row" alignItems="center" gap={4}>
                //                 <LocationOn fontSize='small' sx={{ color: 'blue[500]' }} />
                //                 <Typography variant="body1">Littoral, Cameroon</Typography>
                //             </Stack>
                //             {/* <Typography component='h4' noWrap><CalendarMonth fontSize='small' /> {' '}values</Typography> */}
                //             <Stack direction="row" alignItems="center" gap={4}>
                //                 <CalendarMonth fontSize='small' sx={{ color: 'blue[500]' }} />
                //                 <Typography variant="body1">2020-10-30.08:09:12</Typography>
                //             </Stack>
                //             {/* <Typography component='h4' noWrap><Mail fontSize='small' /> {' '}values</Typography> */}

                //             <Stack direction="row" alignItems="center" gap={4}>
                //                 <Mail fontSize='small' sx={{ color: 'blue[600]' }} />
                //                 <Typography variant="body1">cotub@ubuea.cm</Typography>
                //             </Stack>
                //         </CardContent>
                //     )
                }
                <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* <Button size="small">Learn More</Button> */}
                    <Stack direction="row" alignItems="center" gap={2} sx={{ mb: '6px' }}>
                        <FacebookIcon />
                        <LinkedInIcon />
                        <TwitterIcon />
                        <InstagramIcon />
                        <WhatsAppIcon />
                    </Stack>
                </CardActions>
            </Card>
        </Fragment>
    )
}

// const UpdateProfileImage = () => {

//     return(
//         <></>
//     )
// }
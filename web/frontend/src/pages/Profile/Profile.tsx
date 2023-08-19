import { FC, useState, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import { mainListItems, secondaryListItems } from '../../layouts/AdminSidebar/sidebar';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
// import Paper from '@mui/material/Paper';
import { Card, CardContent, CardActions, Button, Stack, Rating, TextField } from '@mui/material';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import defaults from '../../assets/images/defaults.jpg';
import Mail from '@mui/icons-material/Mail';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import LocationOn from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


// import { Link } from 'react-router-dom';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


// function Copyright(props) {
    // function Copyright() {
    //     return (
    //       // <Typography variant="body2" color="text.secondary" align="center" {...props}>
    //       <Typography variant="body2" color="text.secondary" align="center">
    //         {'Copyright © '}
    //         <Link color="inherit" to="https://mui.com/">
    //           Your Website
    //         </Link>{' '}
    //         {new Date().getFullYear()}
    //         {'.'}
    //       </Typography>
    //     );
    //   }

    function Copyright() {
        return (
          // <Typography variant="body2" color="text.secondary" align="center" {...props}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {/* <Link to="https://mui.com/">
              Your Website
            </Link>  
            {' '} */}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      
      const drawerWidth: number = 240;
      
      interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
      }
      
      const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));
      
      const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              width: theme.spacing(7),
              [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
              },
            }),
          },
        }),
      );


export const Profile: FC = () => {

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    return (
        <Fragment>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                        {/* <Typography sx={{ mt: '16.5rem'}}>Test</Typography> */}
                    </List>
                </Drawer>
                
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container sx={{ my: '2rem'}}>
                        <Grid container spacing={3}>
                            <Grid item md={5} xs={12} >
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14, alignContent: 'center' }} color="text.secondary" gutterBottom>
                                        My Informations
                                        </Typography>
                                        <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                            <Avatar
                                            alt="Remy Sharp"
                                            // src="../../assets/images/defaults.jpg"
                                            src={defaults}
                                            sx={{ width: 100, height: 100 }}
                                            />
                                            <Typography sx={{ alignContent: 'center'}} variant="h5" component="div">
                                            Carzola Jorgensen
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            @username - Administrator
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
                                            <Typography variant="body1">2020-10-30T08:09:12</Typography>
                                        </Stack>
                                        {/* <Typography component='h4' noWrap><Mail fontSize='small' /> {' '}values</Typography> */}

                                        <Stack direction="row" alignItems="center" gap={4}>
                                            <Mail fontSize='small' sx={{ color: 'blue[600]'}}/>
                                            <Typography variant="body1">cotub@ubuea.cm</Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardActions sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        {/* <Button size="small">Learn More</Button> */}
                                        <Stack direction="row" alignItems="center" gap={2} sx={{mb:'6px'}}>
                                            <FacebookIcon />
                                            <LinkedInIcon />
                                            <TwitterIcon />
                                            <InstagramIcon />
                                            <WhatsAppIcon />
                                        </Stack>
                                    </CardActions>
                                    </Card>
                            </Grid>

                            <Grid item md={7} xs={12} >
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
                            </Grid>

                            <Grid item xs={12}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Edit Profile Details
                                        </Typography>
                                        {/* <Typography variant="h5" component="div">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum iure deserunt omnis voluptatem perspiciatis vero corporis id, corrupti suscipit atque debitis quis excepturi at. Laudantium perferendis dolor mollitia impedit?
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic a ipsa officiis ipsum quas non. Ad mollitia obcaecati quas iste incidunt vitae natus id! Provident similique molestias voluptatem at obcaecati?
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                        </Typography>
                                        <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                        </Typography> */}
                                        <Box component="form" noValidate action="" method="post" 
                                        sx={{
                                            my: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                          }}
                                        >
                                            <TextField
                                                label='Username'
                                                name='username' 
                                                variant='outlined'
                                                color='primary'
                                                autoFocus
                                                fullWidth
                                                required
                                                sx={{my: '4px'}}
                                            />
                                             <TextField
                                                label='Email' 
                                                name='email'
                                                variant='outlined'
                                                color='primary'
                                                fullWidth
                                                required
                                                sx={{my: '4px'}}
                                            />
                                            <TextField
                                                label='Contact' 
                                                name='contact'
                                                variant='outlined'
                                                color='primary'
                                                fullWidth
                                                required
                                                sx={{my: '4px'}}
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3}}
                                            >
                                                Sign In
                                            </Button>
                                        </Box>
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions> */}
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                    <Copyright />
                </Box>
            </Box>
        </Fragment>
    )
}
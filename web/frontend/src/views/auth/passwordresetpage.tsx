import { Fragment, FC} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent  from '@mui/material/CardContent'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const PasswordReset: FC = ()  =>{
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      newpassword: data.get('newpassword')
    });
  };

  // const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Fragment>
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Card sx={{mt: 7,}} elevation={24}>
                <CardContent sx={{mx: 2}}>
                    <Box
                    sx={{
                        // marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        size='small'
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        size='small'
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newpassword"
                        label="Confirm New Password"
                        type="password"
                        id="newpassword"
                        autoComplete="current-password"
                        size='small'
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Confirm reset
                        </Button>
                        <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            Remember? Sign in
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                            {"Sign Up"}
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </CardContent>
            </Card>
            <Copyright sx={{ mt: 6 }} />
        </Container>
        </ThemeProvider>
    </Fragment>
  );
}
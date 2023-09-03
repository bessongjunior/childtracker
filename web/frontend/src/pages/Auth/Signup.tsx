import {FC, Fragment, forwardRef, useState, FormEvent} from 'react';
import { useSignup } from '../../hooks/useRegister';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card, CardContent } from '@mui/material';
import { Navigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// https://www.youtube.com/watch?v=CrHQBzwus3s&list=PLMr94OOKrgmsTN1ZRxKyDMfBGmgRg_a8_
// https://tomchentw.github.io/react-google-maps/


// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export const SignUp: FC = () => {

  const [state, setState] = useState<boolean>(false);
  const handlestateClick = () => {
    setState(true);
  };
  const handlestateClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {return;}
    setState(false);
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [first_name, SetFirstname] = useState('')
  const [last_name, setLastname] = useState('')
  const [admin_username, setUsername] = useState('')
  // const [terms, setTerms] = useState<boolean>(false)
  const {signup, error, isLoading, success} = useSignup()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    await signup({ last_name, first_name, admin_username, email, password })

  };

  if (success === true) {
    // console.log('success');
    handlestateClick();
    // setTimeout(() => {
    //   /* do stuff */
    //   return <Navigate to='/admin/signin' />
    // }, 1750);
    // return <Navigate to='/admin/signin' />
  }

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card sx={{mt: 10}}>
          <CardContent>
            <Box
              sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up Administrator 
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="first_name"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      size='small'
                      value={first_name}
                      onChange={(e) => SetFirstname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="last_ame"
                      size='small'
                      value={last_name}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="admin_sername"
                      label="Username"
                      type="text"
                      id="UserName"
                      size='small'
                      value={admin_username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      size='small'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      size='small'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label={<div>I agree to the <a href=''>terms</a> and <a href=''>conditions</a></div>}
                      // value={terms} 
                      // onChange={() => setTerms(!terms)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }} 
                  disabled={isLoading ? true : false}
                >
                  Sign Up
                </Button>
                {/* <Snackbar open={state} autoHideDuration={1700} onClose={handlestateClose}>
                  <Alert onClose={handlestateClose} severity='success' sx={{ width: '100%' }}> 
                  This is a success message!
                  {error ? error : "This is a success message!"}
                  {error? "error" :"success"}
                  </Alert>
                </Snackbar> */}
                {/* {error && <Box className="error">{error}</Box>} */}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </Fragment>
    // </ThemeProvider>
  );
}


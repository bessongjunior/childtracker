import {FC, Fragment, useState, FormEvent}  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useLogin} from '../../hooks/useLogin';
import { Navigate } from 'react-router-dom';


export const SignIn: FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState<boolean>(false)
  const {login, error, isLoading, success} = useLogin()


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (email === "") {
    //   return setErrors("You must enter your email.");
    // }
    // if (password === "") {
    //   return setErrors("You must enter a password.");
    // }

    await login({email, password})

  };

  if (success === true) {
    console.log('success');
    return <Navigate to='/admin/dashboard' />
  }

  return (

    <Fragment>
        <Container component="main" maxWidth="xs" sx={{height: '75vh'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In Administrator
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              value={terms} 
              onChange={() => setTerms(!terms)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading ? true : false}
              // onClick={() => {success === true ? redirect('/admin/dashboard') : null}}
            >
              Sign In 
            </Button>
            {/* {success === true ? navigate. push('/admin/dashboard'): null} */}
            {/* <Grid container mt={3}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                 <Link href="#" variant="body2">
                   {"Don't have an account? Sign Up"}
                 </Link> 
              </Grid>
            </Grid> */}
          </Box>
          {error && <Box className="error">{error}</Box>}
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </Fragment>

  );
}
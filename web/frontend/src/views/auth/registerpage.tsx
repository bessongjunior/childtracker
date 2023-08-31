import * as React from 'react';
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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 2, mb:2}}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const sexofuser = [
    {
      value: 'F',
      label: 'Female',
    },
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'O',
      label: 'Others',
    },
  ];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const UserSignUp = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

//   const [showPassword, setShowPassword] = React.useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card elevation={16} sx={{mt: 2}}>
            <CardContent sx={{mx: 2}}>
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
                    Sign Up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        size='small'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        size='small'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="sex"
                            required
                            fullWidth
                            select
                            label="Select your sex"
                            name="Select your sex"
                            defaultValue="Please select your sex"
                            // helperText="Please select your currency"
                            size='small'
                            >
                            {sexofuser.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* <TextField
                        required
                        fullWidth
                        id="dob"
                        label="Date of Birth"
                        name="dob"
                        size='small'
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* <DemoContainer components={['DatePicker']}> */}
                                <DatePicker label="Date of Birth" slotProps={{ textField: { size: 'small' } }} />
                            {/* </DemoContainer> */}
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="province"
                        label="Region / Province"
                        name="province"
                        size='small'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="country"
                        label="Country"
                        name="country"
                        size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="contact"
                        label="Phone Number"
                        name="contact"
                        size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                        autoComplete="user-name"
                        size='small'
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" size='small'/>}
                        label={
                            <p>
                            Accept our 
                            <Link sx={{mx: 1}}
                            onClick={(e) => {
                            e.preventDefault();
                            alert('Terms & Conditions Accepted');
                            }}
                            >
                            Terms & Conditions
                            </Link>
                            </p>
                            }
                        />
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
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
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
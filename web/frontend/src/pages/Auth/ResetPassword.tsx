import React, { FC, Fragment, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';




export const ResetPasscode: FC = () => {

    const [valueerr, setValueerr] = useState<null | string>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });

        const target = event.target as typeof event.target & {
            email: {value: string};
            password: {value: string};
            confirmpassword: {value: string};
          };
          const email = target.email.value; // typechecks!
          const password = target.password.value; // typechecks!
          const confirmpassword = target.password.value;// typechecks!

          if (password != confirmpassword) {
            setValueerr(valueerr)
            console.log('password mismatch')
        }
        if (password === confirmpassword) {
            const res = await fetch('http://127.0.0.1:5000/admin/v1/resetpassword',
                { method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
                })
            const json = await res.json()
            console.log(json)
            if (res.status != 202) {console.log('failed');}
            if (res.status === 202) {console.log('success');
            }
        }
    };


    return (
        <Fragment>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <Card sx={{ mt: 18, backgroundColor: '#fffff' }}>
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
                                Admin Reset Password
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
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
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmpassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="newpassword"
                                            autoComplete="new-password"
                                            size='small'
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
                                {/* <Grid container justifyContent="Space-between">
                                <Grid item>
                                        <Link href="#" variant="body2">
                                            Create Account
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            Recall or Don't? Sign in
                                        </Link>
                                    </Grid>
                                </Grid> */}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </Fragment>
    )
}
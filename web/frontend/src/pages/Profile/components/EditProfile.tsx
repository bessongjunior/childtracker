import { FC, Fragment, forwardRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import { Card, CardContent, Button, TextField } from '@mui/material';
// import { useAuthContext } from '../../../hooks/useAuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


export const EditProfile: FC = () => {

    // const {user} = useAuthContext()
    const [state, setState] = useState<boolean>(false);

  const handlestateClick = () => {
    setState(true);
  };

  const activateSnack = () => handlestateClick;

  const handlestateClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setState(false);
  };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          username: data.get('username'),
          email: data.get('email'),
          contact: data.get('contact'),
        });
    
        const target = event.target as typeof event.target & {
          email: {value: string};
          username: {value: string};
          contact: {value: string};
        };
        const email = target.email.value; // typechecks!
        const username = target.username.value; // typechecks!
        const contact = target.contact.value; // typechecks!
    
        const user = JSON.parse(localStorage.getItem('user') || '');
        const res = await fetch('http://127.0.0.1:5000/admin/v1/edit',
        { method: 'PATCH',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`}, 
          body: JSON.stringify({email, username, contact}),
        })
        const json = await res.json()
        console.log(json)
        if (!res.ok) {console.log('failed')}
        if (res.ok) {console.log('success')}
        if (res.ok) {handlestateClick()}  
      };

    return (
        <Fragment>
            {/* update, username, email */}
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Edit Profile Details
                    </Typography>
                    <Box component="form" noValidate action="" method="post"
                        sx={{
                            my: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            label='Username'
                            name='username'
                            variant='outlined'
                            color='primary'
                            type='username'
                            size='small'
                            autoFocus
                            fullWidth
                            required
                            sx={{ my: '8px' }}
                        />
                        <TextField
                            label='Email'
                            name='email'
                            variant='outlined'
                            color='primary'
                            type='email'
                            size='small'
                            fullWidth
                            required
                            sx={{ my: '8px' }}
                        />
                        <TextField
                            label='Contact'
                            name='contact'
                            type='number'
                            size='small'
                            variant='outlined'
                            color='primary'
                            fullWidth
                            required
                            sx={{ my: '8px' }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            // onClick={() => handlestateClick}
                            // onClick={() => setTimeout(()=> {})}
                        >
                            Sign In
                        </Button>
                        {/* <Button onClick={handlestateClick}>snackbar</Button> */}
                        <Snackbar open={state} autoHideDuration={6000} onClose={handlestateClose}>
                            <Alert onClose={handlestateClose} severity="success" sx={{ width: '100%' }}>
                            This is a success message!
                            </Alert>
                        </Snackbar>
                    </Box>
                </CardContent>
                {/* <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions> */}
            </Card>
        </Fragment>
    )
}
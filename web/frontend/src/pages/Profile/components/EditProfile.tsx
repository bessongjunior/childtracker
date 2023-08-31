import { FC, Fragment } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import { Card, CardContent, Button, TextField } from '@mui/material';

export const EditProfile: FC = () => {

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
    
        const accessToken = ''
        const res = await fetch('http://127.0.0.1:5000/admin/v1/edit',
        { method: 'PATCH',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`}, //'Content-Type': 'application/json', 
          // headers: {'Authorization': `${accessToken}`},
          body: JSON.stringify({email, username, contact}),
        })
        const json = await res.json()
        console.log(json)
        if (!res.ok) {console.log('failed')}
        if (res.ok) {console.log('success')}
      };

    return (
        <Fragment>
            {/* update, username, email */}
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
                        >
                            Sign In
                        </Button>
                    </Box>
                </CardContent>
                {/* <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions> */}
            </Card>
        </Fragment>
    )
}
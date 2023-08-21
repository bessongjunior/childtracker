import { FC, Fragment } from 'react';
import Title from './Title';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



export const AddDevice: FC = () => {

    return (
        <Fragment>
            <Box sx={{ minWidth: 275 }}>
                  <Card>
                    <CardContent>
                      <Title>Register a Device</Title>
                      <Box
                        component="form"
                        sx={{
                          // '& .MuiTextField-root': { m: 1, width: '25ch' },
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          label="User name"
                          id="outlined-size-small"
                          // defaultValue="username"
                          size="small"
                          autoFocus
                          fullWidth
                          required
                          sx={{my: '4px'}}
                        />
                        <TextField
                          label="Email"
                          id="outlined-size-small"
                          // defaultValue="username"
                          size="small"
                          autoFocus
                          fullWidth
                          required
                          sx={{my: '4px'}}
                        />
                        <TextField
                          label="Device name"
                          id="outlined-size-small"
                          // defaultValue="username"
                          size="small"
                          autoFocus
                          fullWidth
                          required
                          sx={{my: '4px'}}
                        />
                        <TextField
                          label="Serial number"
                          id="outlined-size-small"
                          // defaultValue="username"
                          size="small"
                          autoFocus
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
                          Assign Device
                        </Button>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Box>
        </Fragment>
    )
}
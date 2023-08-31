import { FC, Fragment } from 'react';
import Title from './Title';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export const TrackDevice: FC = () => {
// get form data, add in get request, make it run every 0.3s
    return (
        <Fragment>
            <Box component='div'>
                  <Card>
                    <CardContent>
                      <Title>Track a Device</Title>
                      <Box
                        component="form"
                        sx={{
                          // '& .MuiTextField-root': { m: 1, width: '80ch' },
                          display: 'flex',
                          flexDirection: 'row',
                          mb: 1.5
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          size='small' 
                          autoFocus
                          required
                          type='devicename'
                          label='Device name'
                          // sx={{mr: 1}}
                          fullWidth
                        />
                        <TextField 
                          size='small'
                          type='seralnumber'
                          autoFocus
                          required
                          label='Serial number'
                          sx={{mx: 1}}
                          fullWidth
                        />
                        <Button
                          variant='contained'
                          type="submit"
                          size="small"
                          fullWidth
                          // sx={{mt: 0}}
                        >Track
                          {/* <Box component='span' sx={{mx: 'auto'}}>Track</Box> */}
                        </Button>
                      </Box>
                      <Card variant='outlined'>
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Google Maps Here!!
                          </Typography>
                          
                        </CardContent>
                        <CardActions>
                          <Button size="small">Learn More</Button>
                        </CardActions>
                      </Card>
                    </CardContent>
                  </Card>
                </Box>
        </Fragment>
    )
}
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

    return (
        <Fragment>
            <Box component='div'>
                  <Card>
                    <CardContent>
                      <Title>Track a Device</Title>
                      <Box
                        component="form"
                        sx={{
                          // '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                          label='Device name'
                          sx={{mr: 1}}
                        />
                        <TextField 
                          size='small'
                          autoFocus
                          required
                          label='Serial number'
                          sx={{mr: 1}}
                        />
                        <Button
                          variant='contained'
                          type="submit"
                          size="small"
                          // fullWidth
                          sx={{ml: 2}}
                        >
                          Track
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
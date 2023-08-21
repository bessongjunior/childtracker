import { FC, Fragment } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


import Title from './Title';
import { Box } from '@mui/material';


export const UserInfo: FC = () => {

    return (
        <Fragment>
      <Card>
        <CardContent>
          <Title>User Informations</Title>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Today 15 March, 2023
          </Typography>
          <TextField
            size="small"
            label="Search"
            sx={{my: '8px'}}
            type='search'
            InputProps={{
              endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
              )
            }}
          />
          
          <Box component='div' sx={{ width: '100%', mt: 0.5 }}>
            <Stack direction="row" spacing={2}>
              <Stack>
                <Typography sx={{my: '2px'}}>Username</Typography>
                <Typography sx={{my: '2px'}}>Email</Typography>
                <Typography sx={{my: '2px'}}>Firstname</Typography>
                <Typography sx={{my: '2px'}}>Lastname</Typography>
                <Typography sx={{my: '2px'}}>Phone</Typography>
                <Typography sx={{my: '2px'}}>Datetime</Typography>
              </Stack>
              <Stack>
              <Typography sx={{my: '2px'}}>carzola</Typography>
              <Typography sx={{my: '2px'}}>carzolajorgensen@gmail.com</Typography>
              <Typography sx={{my: '2px'}}>Carzola</Typography>
              <Typography sx={{my: '2px'}}>Jorgensen</Typography>
              <Typography sx={{my: '2px'}}>+237 651481602</Typography>
              <Typography sx={{my: '2px'}}>2022:12:01T14:00:00</Typography>
              </Stack>
            </Stack>
          </Box>
          {/* <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div> */}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
          </Card>
    </Fragment>
    )
}
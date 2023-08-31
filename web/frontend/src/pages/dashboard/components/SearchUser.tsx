import { FC, Fragment, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
// import axios from 'axios';

import Title from './Title';


type Person = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: number;
  date_joined: string;
}


export const UserInfo: FC = () => {

  const [person, setPerson] = useState<null | Person>(null) //same as below
  // const [person, setPerson] = useState<Person>({} as Person);

  const [searchInput, setSearchInput] = useState(''); //cld be replace with serchparams from react-router-dom

  const accessToken = ''
   

  useEffect(() => {
    if (searchInput) {
      // using Fetch API
      fetch(`http://127.0.0.1:5000/admin/v1/device/${searchInput}`, {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`}
      })
        .then((res) => res.json())
        .then((person: Person) => setPerson(person))  //{ console.log(person);setPerson(person);})
        .catch((err) => console.log(err))
      }
      // using Axios
    //   axios.get(`http://127.0.0.1:5000/admin/v1/users/${searchInput}`)
    //     // .then(response => setPerson(response.data))
    //     .then((response: Person) => setPerson(response))
    //     .catch((error) => console.error(error));
    // }
    }, [searchInput])

  const handleSearchChange = (event: any) => {
    setSearchInput(event.target.value);
  };

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
            fullWidth
            label="Search"
            sx={{my: '8px'}}
            type='search'
            value={searchInput}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                  <IconButton onClick={() => setSearchInput('')}>
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
                <Typography sx={{my: '2px'}}>Date Joined</Typography>
              </Stack>
              <Stack>
              {person ? (
                <Box>
                  <Typography sx={{my: '2px'}}>{person.username}</Typography>
                  <Typography sx={{my: '2px', mb: '1px'}}>{person.email}</Typography>
                  <Typography sx={{my: '2px'}}>{person.firstname}</Typography>
                  <Typography sx={{my: '2px'}}>{person.lastname}</Typography>
                  <Typography sx={{my: '2px'}}>{`+237 `+person.phone}</Typography>
                  <Typography sx={{my: '2px'}}>{person.date_joined}</Typography>
                </Box>
              ) : (
                <Box>
                  {/* <Typography sx={{my: '2px'}}>carzola</Typography>
                  <Typography sx={{my: '2px'}}>carzolajorgensen@gmail.com</Typography>
                  <Typography sx={{my: '2px'}}>Carzola</Typography>
                  <Typography sx={{my: '2px'}}>Jorgensen</Typography>
                  <Typography sx={{my: '2px'}}>+237 651481602</Typography>
                  <Typography sx={{my: '2px'}}>2022:12:01T14:00:00</Typography> */}
                  <Typography sx={{my: 5, mx: 2}}>No Information</Typography>
                  <Typography sx={{my: 5, mx: 2}}>Please Search</Typography>
                </Box>
              )
              }
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
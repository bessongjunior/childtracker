import { FC, Fragment, useState, useEffect, ChangeEvent } from 'react';
import Title from './Title';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search'
// import { useAuthContext } from '../../../hooks/useAuthContext';

type Device = {
    devicename: string;
    serialnumber: string;
    status: boolean;
    ownername: string;
    ownerphone: number;
    registrar: string;

}

export const FindADeviceInfo: FC = () => {

    // const {user} = useAuthContext()

    const [device, setDevice] = useState<null | Device>(null)

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if (searchInput) {
          // using Fetch API
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          fetch(`http://127.0.0.1:5000/admin/v1/device/${searchInput}`, {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`}
          })
            .then((res) => res.json())
            .then((device: Device) => setDevice(device)) //{ console.log(device);setDevice(device);})
            .catch((err) => console.log(err))
          }
          // using Axios
        //   axios.get(`http://127.0.0.1:5000/admin/v1/users/${searchInput}`)
        //     // .then(response => setDevice(response.data))
        //     .then((response: Device) => setDevice(response))
        //     .catch((error) => console.error(error));
        // }
        }, [searchInput])

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setSearchInput(event.target.value);
    };

    return (
        <Fragment>
            <Card>
                <CardContent>
                <Title>Find Device Info</Title>
                <TextField
                    size="small"
                    label="Search"
                    sx={{my: '8px'}}
                    fullWidth
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
                        <Typography sx={{my: '2px'}}>Name</Typography>
                        <Typography sx={{my: '2px'}}>SerialNmber</Typography>
                        <Typography sx={{my: '2px'}}>Active</Typography>
                        <Typography sx={{my: '2px'}}>OwnerName</Typography>
                        <Typography sx={{my: '2px'}}>Phone</Typography>
                        <Typography sx={{my: '2px'}}>Registrant</Typography>
                    </Stack>
                    <Stack>
                    { device ? 
                    (
                        <Box>
                            <Typography sx={{my: '2px'}}>{device.devicename}</Typography>
                            <Typography sx={{my: '2px'}}>{device.serialnumber}</Typography>
                            <Typography sx={{my: '2px'}}>{device.status}</Typography>
                            <Typography sx={{my: '2px'}}>{device.ownername}</Typography>
                            <Typography sx={{my: '2px'}}>{device.ownerphone}</Typography>
                            <Typography sx={{my: '2px'}}>{device.registrar}</Typography>
                        </Box>
                    ) : 
                    (
                        <Box>
                            {/* <Typography sx={{my: '2px'}}>carzola</Typography>
                            <Typography sx={{my: '2px'}}>9FG2KFT9</Typography>
                            <Typography sx={{my: '2px'}}>True</Typography>
                            <Typography sx={{my: '2px'}}>Jorgensen</Typography>
                            <Typography sx={{my: '2px'}}>+237 651481602</Typography> */}
                            <Typography sx={{my: 5, mx: 2}}>No Information</Typography>
                            <Typography sx={{my: 5, mx: 2}}>Please Search</Typography>
                        </Box>
                    )
                    }
                        
                    </Stack>
                    </Stack>
                </Box>
                </CardContent>
                <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Fragment>
    )
}
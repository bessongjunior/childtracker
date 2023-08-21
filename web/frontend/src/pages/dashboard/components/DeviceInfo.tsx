import { FC, Fragment } from 'react';
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

export const FindADeviceInfo: FC = () => {

    return (
        <Fragment>
            <Card>
                <CardContent>
                <Title>Find Device Info</Title>
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
                        <Typography sx={{my: '2px'}}>Name</Typography>
                        <Typography sx={{my: '2px'}}>SerialNmber</Typography>
                        <Typography sx={{my: '2px'}}>Active</Typography>
                        <Typography sx={{my: '2px'}}>OwnerName</Typography>
                        <Typography sx={{my: '2px'}}>Phone</Typography>
                    </Stack>
                    <Stack>
                    <Typography sx={{my: '2px'}}>carzola</Typography>
                    <Typography sx={{my: '2px'}}>9FG2KFT9</Typography>
                    <Typography sx={{my: '2px'}}>True</Typography>
                    <Typography sx={{my: '2px'}}>Jorgensen</Typography>
                    <Typography sx={{my: '2px'}}>+237 651481602</Typography>
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
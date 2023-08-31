import { FC, Fragment } from 'react';
import Title from './Title';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// type Formdata = {
//   email: string;
//   username: string;
//   devicename: string;
//   serialnumber: string;
// }

export const AddDevice: FC = () => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   username: data.get('username'),
    //   email: data.get('email'),
    //   devicename: data.get('devicename'),
    //   serailnumber: data.get('serialnumber'),
    // });

    const target = event.target as typeof event.target & {
      email: {value: string};
      username: {value: string};
      devicename: {value: string};
      serialnumber: {value: string};
    };
    const email = target.email.value; // typechecks!
    const username = target.username.value; // typechecks!
    const devicename = target.devicename.value; // typechecks!
    const serialnumber = target.serialnumber.value; // typechecks!

    const accessToken = ''
    const res = await fetch('http://127.0.0.1:5000/admin/v1/device/registration',
    { method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
      body: JSON.stringify({email, username, devicename, serialnumber}),
    })
    const json = await res.json()
    console.log(json)
    if (!res.ok) {console.log('failed');}
    if (res.ok) {console.log('success');}
  }

  // useEffect(() => {
  //   fetch(``,
  //   { method: 'POST',
  //     headers: {'Content-Type': 'application/json'}, //'Content-Type': 'application/json', 
  //     headers: {'Content-Type': 'Bearer '},
  //     body: JSON.stringify({email, username, devicename, serialnumber}),
  //     // console.log(`${data}`) 
  //   }
  //   )
  //   .then(res => res.json())
  //   .then(res => !res.ok? console.log('failed'): console.log('success')) //replace with notif
  //   .catch((err) => console.log(err))
  // }, [])

    return (
        <Fragment>
            <Box sx={{ minWidth: 275 }}>
                  <Card>
                    <CardContent>
                      <Title>Register a Device</Title>
                      <Box
                        component="form"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                      >
                        <TextField
                          label="User name"
                          id="username"
                          // defaultValue="username"
                          name='username'
                          size="small"
                          autoFocus
                          fullWidth
                          required
                          sx={{my: '4px'}}
                        />
                        <TextField
                          label="Email"
                          id="email"
                          name='email'
                          size="small"
                          autoFocus
                          fullWidth
                          required
                          sx={{my: '4px'}}
                        />
                        <TextField
                          label="Device name"
                          id="devicename"
                          name='devicename'
                          size="small"
                          autoFocus
                          fullWidth
                          required
                          sx={{my: '4px'}}
                        />
                        <TextField
                          label="Serial number"
                          id="serailnumber"
                          name='serialnumber'
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
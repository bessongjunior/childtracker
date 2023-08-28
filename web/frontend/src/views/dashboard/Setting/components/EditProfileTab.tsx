import { FC, Fragment, useState, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
// import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import { UpdateDetails } from './UpdateUserdata';
// import Text from 'src/components/Text';
// import Label from 'src/components/Label';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const languages = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'fr',
    label: 'French',
  }
]

const EditProfileTab: FC = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = useState(false);

  const handlestateClick = () => {
    setState(true);
  };

  const handlestateClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setState(false);
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <UpdateDetails />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Account Settings
                </Typography>
                <Typography variant="subtitle2">
                  Manage details related to your account
                </Typography>
              </Box>
              <Box component='div'>
                <Button variant="text" onClick={handleClickOpen} startIcon={<EditTwoToneIcon />}>
                  Edit
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Change language</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Select a language of your choice from our supported languages
                    </DialogContentText>
                    <Box
                      component='form'
                      sx={{
                        // '& .MuiTextField-root': { m: 1, width: '25ch' },
                        // display: 'flex',
                        // flexDirection: 'column',
                        // alignItems: 'center',
                        mt: 2
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-select-currency"
                        select
                        fullWidth
                        label="Select"
                        defaultValue="en"
                        helperText="Please select your currency"
                      >
                        {languages.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={() => {handleClose; handlestateClick;}}
                        // onClick={handleClose}
                      >
                        update
                      </Button>
                      <Snackbar open={state} autoHideDuration={6000} onClose={handlestateClose}>
                        <Alert onClose={handlestateClose} severity="success" sx={{ width: '100%' }}>
                          This is a success message!
                        </Alert>
                      </Snackbar>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/* <Button onClick={handleClose}>Subscribe</Button> */}
                  </DialogActions>
                </Dialog>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Language:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    {/* <Text color="black"> */}
                      <b>English (US)</b>
                    {/* </Text> */}
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Timezone:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    {/* <Text color="black"> */}
                      <b>GMT +1</b>
                    {/* </Text> */}
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Account status:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    {/* <Label color="success">
                      <DoneTwoToneIcon fontSize="small" />
                      <b>Active</b>
                    </Label> */}
                    <Typography color="success">
                      <DoneTwoToneIcon fontSize="small" />
                      <b>Active</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Email Addresses
                </Typography>
                <Typography variant="subtitle2">
                  Manage details related to your associated email addresses
                </Typography>
              </Box>
              <Button variant="text" startIcon={<EditTwoToneIcon />}>
                Edit
              </Button>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Email ID:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    {/* <Text color="black"> */}
                      <b>example@demo.com</b>
                    {/* </Text> */}
                    <Box pl={1} component="span">
                      {/* <Label color="success">
                        Primary
                        </Label> */}
                        {/* <Typography color='success'>Primary</Typography> */}
                    </Box>
                  </Grid>
                  {/* <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Email ID:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>demo@example.com</b>
                    </Text>
                  </Grid> */}
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </Fragment>

  );
}

export default EditProfileTab;

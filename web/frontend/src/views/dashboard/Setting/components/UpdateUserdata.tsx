import { FC, Fragment, useState, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export const UpdateDetails: FC = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const [state, setState] = useState(false);
  
    const handlestateClick = () => {
    //   setState(true);
      setTimeout(() => {
        setState(true);
      }, 2000);
    };
  
    const handlestateClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setState(false);
    };

    // const action = (
    //     <Fragment>
    //       <Button color="secondary" size="small" onClick={handlestateClose}>
    //         UNDO
    //       </Button>
    //       <IconButton
    //         size="small"
    //         aria-label="close"
    //         color="inherit"
    //         onClick={handlestateClose}
    //       >
    //         <CloseIcon fontSize="small" />
    //       </IconButton>
    //     </Fragment>
    // );


    return (
        <Fragment>
            <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Personal Details
                </Typography>
                <Typography variant="subtitle2">
                  Manage informations related to your personal details
                </Typography>
                {/* <Button onClick={handlestateClick}>snackbar</Button>
                <Snackbar open={state} autoHideDuration={6000} onClose={handlestateClose}>
                            <Alert onClose={handlestateClose} severity="success" sx={{ width: '100%' }}>
                            This is a success message!
                            </Alert>
                        </Snackbar> */}
              </Box>

              <Box component='div'>
                <Button variant="text" onClick={handleClickOpen} startIcon={<EditTwoToneIcon />}>
                  Edit
                </Button>
                <Dialog open={open} onClose={() => {handleClose;handlestateClick}}>
                  <DialogTitle>update Personal Details</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To update your details, please fill the form below.
                    </DialogContentText>
                    <Box
                      component='form'
                      sx={{
                        // '& .MuiTextField-root': { m: 1, width: '25ch' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 2
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        autoComplete="user-name"
                        name="userName"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        autoFocus
                        size='small'
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        size='small'
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={() => {handlestateClick; handleClose; }}
                        // onClick={handlestateClick}
                      >
                        update credentials
                      </Button>
                      
                       
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/* <Button onClick={handleClose}>Subscribe</Button> */}
                  </DialogActions>
                </Dialog>

                <Snackbar open={state} autoHideDuration={6000} onClose={handlestateClose}>
                  <Alert onClose={handlestateClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                  </Alert>
                </Snackbar>
              </Box>

            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    {/* <Text color="black"> */}
                      <b>Craig Donin</b>
                    {/* </Text> */}
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Date of birth:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    {/* <Text color="black"> */}
                      <b>15 March 1977</b>
                    {/* </Text> */}
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Address:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                      {/* <Text color="black"> */}
                        1749 High Meadow Lane, SEQUOIA NATIONAL PARK, California,
                        93262
                      {/* </Text> */}
                    </Box>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Fragment>
    )
}


// export const UpdateMail: FC = () => {

//     return (
//         <Fragment>
//             <Card>
//                 <CardHeader title='Update your Mail' />
//                 <CardContent>
//                     <Box 
//                         component='form' 
//                         sx={{
//                             '& .MuiTextField-root': { m: 1, width: '25ch' },
//                             // display: 'flex',
//                             // flexDirection: 'column',
//                             // alignItems: 'center',
//                         }}
//                         noValidate
//                         autoComplete="off"
//                     >
//                         <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="email"
//                         label="Email Address"
//                         name="email"
//                         autoComplete="email"
//                         autoFocus
//                         size='small'
//                         />
//                         <Button 
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 3 }}
//                         >   
//                             update
//                         </Button>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Fragment>
//     )
// }

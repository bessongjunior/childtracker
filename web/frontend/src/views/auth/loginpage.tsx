
// import Button from '@mui/material/Button';
// import { FC, useState } from "react";

// // import { Link } from "react-router-dom";

// // @mui material components
// import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import Box from '@mui/material/Box';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import Input from '@mui/material/Input';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import MuiLink from "@mui/material/Link";

// import FacebookIcon from "@mui/icons-material/Facebook";
// import AppleIcon from "@mui/icons-material/Apple";
// import GoogleIcon from "@mui/icons-material/Google";
// import MicrosftIcon from "@mui/icons-material/Microsoft"


// export const LoginPage: FC = () => {

//     const [rememberMe, setRememberMe] = useState(false);

//   const handleSetRememberMe = () => setRememberMe(!rememberMe);

//     return (
//         <Box sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}>
//         <Card>
//         <Box>
//           <Typography variant='h2'  justifyContent="center">
//             Sign in
//           </Typography>
//           <Grid container spacing={4} justifyContent="center">
//           <Grid item xs={2}>
//               <Typography component={MuiLink}>
//                 <MicrosftIcon color="inherit" />
//               </Typography>
//             </Grid>
//             <Grid item xs={2}>
//               <Typography component={MuiLink}>
//                 <FacebookIcon color="inherit" />
//               </Typography>
//             </Grid>
//             <Grid item xs={2}>
//               <Typography component={MuiLink}>
//                 <AppleIcon color="inherit" />
//               </Typography>
//             </Grid>
//             <Grid item xs={2}>
//               <Typography component={MuiLink}>
//                 <GoogleIcon color="inherit" />
//               </Typography>
//             </Grid>
//           </Grid>
//         </Box>
//         <Box pt={4} pb={3} px={3}>
//           <Box component="form" role="form">
//             <Box mb={2}>
//               {/* <Input type="email" label="Email" fullWidth /> */}
//               <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//             </Box>
//             <Box mb={2}>
//               {/* <Input type="password" label="Password" fullWidth /> */}
//               <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//             </Box>
//             <Box display="flex" alignItems="center" ml={-1}>
//               <Switch checked={rememberMe} onChange={handleSetRememberMe} />
//               <Typography
//                 // variant="button"
//                 // fontWeight="regular"
//                 // color="text"
//                 // onClick={handleSetRememberMe}
//                 // sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
//               >
//                 &nbsp;&nbsp;Remember me
//               </Typography>
//             </Box>
//             <Box mt={4} mb={1}>
//               <Button color="info" fullWidth>
//                 sign in
//               </Button>
//             </Box>
//             <Box>
//                 <Typography variant="button" color="text">
//                     Forgot password?
//                 </Typography>
//             </Box>
//             <Box mt={3} mb={1} textAlign="center">
//               <Typography variant="button" color="text">
//                 Don&apos;t have an account?{" "}
//                 <Typography
//                   color="info"
//                   fontWeight="medium"
//                 >
//                   Sign up
//                 </Typography>
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Card>
//     </Box>
//     )
// }





// // // Material Dashboard 2 React components
// // import Box from "components/Box";
// // import Typography from "components/Typography";
// // import Input from "components/Input";
// // import Button from "components/Button";

// // Authentication layout components
// // import BasicLayout from "layouts/authentication/components/BasicLayout";

// // Images
// // import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// // function Basic() {
// //   const [rememberMe, setRememberMe] = useState(false);

// //   const handleSetRememberMe = () => setRememberMe(!rememberMe);

// //   return (
// //     <BasicLayout image={bgImage}>
// //       <Card>
// //         <Box
// //           variant="gradient"
// //           bgColor="info"
// //           borderRadius="lg"
// //           coloredShadow="info"
// //           mx={2}
// //           mt={-3}
// //           p={2}
// //           mb={1}
// //           textAlign="center"
// //         >
// //           <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
// //             Sign in
// //           </Typography>
// //           <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
// //             <Grid item xs={2}>
// //               <Typography component={MuiLink}>
// //                 <FacebookIcon color="inherit" />
// //               </Typography>
// //             </Grid>
// //             <Grid item xs={2}>
// //               <Typography component={MuiLink}>
// //                 <GitHubIcon color="inherit" />
// //               </Typography>
// //             </Grid>
// //             <Grid item xs={2}>
// //               <Typography component={MuiLink}>
// //                 <GoogleIcon color="inherit" />
// //               </Typography>
// //             </Grid>
// //           </Grid>
// //         </Box>
// //         <Box pt={4} pb={3} px={3}>
// //           <Box component="form" role="form">
// //             <Box mb={2}>
// //               <Input type="email" label="Email" fullWidth />
// //             </Box>
// //             <Box mb={2}>
// //               <Input type="password" label="Password" fullWidth />
// //             </Box>
// //             <Box display="flex" alignItems="center" ml={-1}>
// //               <Switch checked={rememberMe} onChange={handleSetRememberMe} />
// //               <Typography
// //                 variant="button"
// //                 fontWeight="regular"
// //                 color="text"
// //                 onClick={handleSetRememberMe}
// //                 sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
// //               >
// //                 &nbsp;&nbsp;Remember me
// //               </Typography>
// //             </Box>
// //             <Box mt={4} mb={1}>
// //               <Button variant="gradient" color="info" fullWidth>
// //                 sign in
// //               </Button>
// //             </Box>
// //             <Box mt={3} mb={1} textAlign="center">
// //               <Typography variant="button" color="text">
// //                 Don&apos;t have an account?{" "}
// //                 <Typography
// //                   component={Link}
// //                   to="/authentication/sign-up"
// //                   variant="button"
// //                   color="info"
// //                   fontWeight="medium"
// //                   textGradient
// //                 >
// //                   Sign up
// //                 </Typography>
// //               </Typography>
// //             </Box>
// //           </Box>
// //         </Box>
// //       </Card>
// //     </BasicLayout>
// //   );
// // }

// // export default Basic;

import { FC, Fragment, ReactNode } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';

interface StyleProps {
  props : ReactNode
}
const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const UserSignIn: FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  // const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Fragment>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{height: '100vh'}}>
          <Box sx={{mt: 4, mx: 5}}>
          <Card elevation={24}>
            <Grid container component="main" sx={{ height: '90vh' }}>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign In
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      size='small'
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
          </Box>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}
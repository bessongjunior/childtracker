
import Button from '@mui/material/Button';
import { FC, useState } from "react";

// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiLink from "@mui/material/Link";

import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosftIcon from "@mui/icons-material/Microsoft"


export const LoginPage: FC = () => {

    const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Card>
        <Box>
          <Typography variant='h2'  justifyContent="center">
            Sign in
          </Typography>
          <Grid container spacing={4} justifyContent="center">
          <Grid item xs={2}>
              <Typography component={MuiLink}>
                <MicrosftIcon color="inherit" />
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component={MuiLink}>
                <FacebookIcon color="inherit" />
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component={MuiLink}>
                <AppleIcon color="inherit" />
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component={MuiLink}>
                <GoogleIcon color="inherit" />
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box pt={4} pb={3} px={3}>
          <Box component="form" role="form">
            <Box mb={2}>
              {/* <Input type="email" label="Email" fullWidth /> */}
              <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
            </Box>
            <Box mb={2}>
              {/* <Input type="password" label="Password" fullWidth /> */}
              <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
            </Box>
            <Box display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <Typography
                // variant="button"
                // fontWeight="regular"
                // color="text"
                // onClick={handleSetRememberMe}
                // sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </Typography>
            </Box>
            <Box mt={4} mb={1}>
              <Button color="info" fullWidth>
                sign in
              </Button>
            </Box>
            <Box>
                <Typography variant="button" color="text">
                    Forgot password?
                </Typography>
            </Box>
            <Box mt={3} mb={1} textAlign="center">
              <Typography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <Typography
                  color="info"
                  fontWeight="medium"
                >
                  Sign up
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
    )
}





// // Material Dashboard 2 React components
// import Box from "components/Box";
// import Typography from "components/Typography";
// import Input from "components/Input";
// import Button from "components/Button";

// Authentication layout components
// import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// function Basic() {
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSetRememberMe = () => setRememberMe(!rememberMe);

//   return (
//     <BasicLayout image={bgImage}>
//       <Card>
//         <Box
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="info"
//           mx={2}
//           mt={-3}
//           p={2}
//           mb={1}
//           textAlign="center"
//         >
//           <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
//             Sign in
//           </Typography>
//           <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
//             <Grid item xs={2}>
//               <Typography component={MuiLink}>
//                 <FacebookIcon color="inherit" />
//               </Typography>
//             </Grid>
//             <Grid item xs={2}>
//               <Typography component={MuiLink}>
//                 <GitHubIcon color="inherit" />
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
//               <Input type="email" label="Email" fullWidth />
//             </Box>
//             <Box mb={2}>
//               <Input type="password" label="Password" fullWidth />
//             </Box>
//             <Box display="flex" alignItems="center" ml={-1}>
//               <Switch checked={rememberMe} onChange={handleSetRememberMe} />
//               <Typography
//                 variant="button"
//                 fontWeight="regular"
//                 color="text"
//                 onClick={handleSetRememberMe}
//                 sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
//               >
//                 &nbsp;&nbsp;Remember me
//               </Typography>
//             </Box>
//             <Box mt={4} mb={1}>
//               <Button variant="gradient" color="info" fullWidth>
//                 sign in
//               </Button>
//             </Box>
//             <Box mt={3} mb={1} textAlign="center">
//               <Typography variant="button" color="text">
//                 Don&apos;t have an account?{" "}
//                 <Typography
//                   component={Link}
//                   to="/authentication/sign-up"
//                   variant="button"
//                   color="info"
//                   fontWeight="medium"
//                   textGradient
//                 >
//                   Sign up
//                 </Typography>
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Card>
//     </BasicLayout>
//   );
// }

// export default Basic;

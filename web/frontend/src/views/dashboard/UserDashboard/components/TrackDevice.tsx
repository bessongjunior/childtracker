import { FC, Fragment, useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { Map, Marker } from 'google-maps-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
import { faker } from "@faker-js/faker";

// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// const MapWithAMarker = withGoogleMap(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={props.center}>
//     <Marker position={props.center} />
//   </GoogleMap>
// ));

// import { withGoogleMap, GoogleMap, Marker, WithGoogleMapProps } from "react-google-maps";


// interface MapWithAMarkerProps extends WithGoogleMapProps {
//   center: {
//     lat: number;
//     lng: number;
//   };
// }


// const MapWithAMarker = withGoogleMap<MapWithAMarkerProps>((props) => (
//   <GoogleMap defaultZoom={8} defaultCenter={props.center}>
//     <Marker position={props.center} />
//   </GoogleMap>
// ));

// import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// const MapWithAMarker = withGoogleMap(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={props.position}>
//     <Marker position={props.position} />
//   </GoogleMap>
// ));


const containerStyle = {
  width: '400px',
  height: '400px'
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Last Week Track History',
      },
    },
  };
  
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'server data',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };



export const TrackDevices: FC = () => {

    const devices = [
        {
            value: 'Text',
            label: 'Select Device',
        },
        {
          value: 'SerialNumber1',
          label: 'Device Name 1',
        },
        {
          value: 'SerialNumber2',
          label: 'Device Name 2',
        },
        {
          value: 'SerialNumberx',
          label: 'Device Name x',
        }
      ];

    type LocalType ={
      longitude: string | number;
      latitude: string | number;
    }

    type IntType = {
      lng: number; // | string;
      lat: number; // | string;
    }

      const [location, setLocation] = useState<null | LocalType>(null);

      useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
        });
      }, []);

      // useEffect(() => {
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(
      //       (location) => {
      //         setLocation(location);
      //       },
      //       (error) => {
      //         console.error(error);
      //       }
      //     );
      //   } else {
      //     console.error("Geolocation is not supported by this browser.");
      //   }
      // }, []);

    // const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         position => {
    //           setCenter({
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //           });
    //         },
    //         error => {
    //           console.error(error);
    //         }
    //       );
    //     } else {
    //       console.error("Geolocation is not supported by this browser.");
    //     }
    //   }, []);


    const [position, setPosition] = useState<null | IntType>(null);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }, []);

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    <Card>
                        <CardContent>
                            {/* <Title>Choose a Device</Title> */}
                            {/* 
                            <Typography>choose a device to track</Typography>
                            <Typography>track button</Typography> */}
                            <Box component="form" noValidate autoComplete="off">
                                <Stack spacing={2}>
                                    <Typography>Active devices: 4</Typography>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Select a Device"
                                        defaultValue="Text"
                                        helperText="Please select your trackable device"
                                    >
                                        {devices.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <Button variant="contained">Track</Button>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} md={4}>
                    <Card>
                        {/* <Titles>Your current Position</Titles> */}
                        <CardContent>
                            {/* <Typography>small map indicating user current position</Typography> */}
                            {/* {position && (
                                <h6>
                                Latitude: {position.coords.latitude}, Longitude:{" "}
                                {position.coords.longitude}
                                </h6>style={{ height: `400px` }}
                                
                            )} */}
                            {/* <MapWithAMarker
                                containerElement={<div style={{ height: `400px` }}/>}
                                mapElement={<div style={{ height: `100%` }} />}
                                center={center}
                            /> */}
                            {/* {position && (
                              <MapWithAMarker
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                position={position}
                              />
                            )} */}
                            {position && (
                              <Map
                                containerStyle={containerStyle}
                                google={window.google}
                                initialCenter={position}
                                zoom={8}
                               />
                                // {/* <Marker position={position} /> */}
                              // {/* </Map> */}
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Line options={options} data={data} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 4}}>
                <Grid xs={12} md={8}>
                    <Card>
                      <CardContent>
                        <Typography>google map here</Typography>
                      </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography>Precise Informations</Typography>
                        <Divider sx={{my: 1}} />
                        <Stack spacing={2}><Typography sx={{alignItems: 'center'}}>Current Position</Typography></Stack>
                          <Stack direction="row" spacing={16}>
                            <Stack>
                                <Box>
                                  <p>Longitude</p>
                                  <p>Latitude</p>
                                </Box>
                            </Stack>
                            <Stack>
                            {location ? ( 
                                <Box>
                                  <p>{location.latitude}</p>
                                  <p>{location.longitude}</p>
                                </Box>
                            ) : ( 
                                <Box>
                                  <p>loading...</p>
                                  <p>loading...</p>
                                </Box>
                            )}
                            </Stack>
                          </Stack>
                        <Stack spacing={2}><Typography sx={{alignItems: 'center'}}>Get to Target</Typography></Stack>
                          <Stack direction='row' spacing={7}>
                          <Stack>
                                <Box>
                                  <p>Status</p>
                                  <p>Dist To Target</p>
                                  <p>Your Speed to Target</p>
                                </Box>
                            </Stack>
                            <Stack>
                            
                                <Box>
                                <p>Active</p>
                                <p>29 km</p>
                                <p>25 km/h</p>
                                </Box>
                            
                            </Stack>
                          </Stack>
                      </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Fragment>
    )
}
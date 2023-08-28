import { FC, Fragment } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chart from "react-apexcharts";

const data = {
    series: [
      {
        name: "Minutes",
        data: [10, 41, 35,149, 51, 49,87, 62, 69, 91, 148, 260],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Track History Annual",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
      },
    },
  };


export const TrackHistoryShort: FC = () => {

    return (
        <Fragment>
            {/* <h1>still to!</h1> */}
            {/* <Grid container>
                <Grid item>
                    track history (2)
                </Grid>
                <Grid item>
                     user weekly track stats
                </Grid>
            </Grid> */}
            <Card sx={{my: 4}}>
              <CardContent>
                <Chart
                  options={data.options}
                  series={data.series}
                  type="area"
                  height={350}
                />
                
              </CardContent>
            </Card>
        </Fragment>
    )
}
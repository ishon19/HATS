import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { IPOIStatsProps } from "../../interfaces/interface";
import { fetchPOITweetDates } from "../../services/covid-tracker";
import { cardStyles } from "../styles/card-styles";
import { chartStyles } from "../styles/chart-styles";
import { convertToCapitalCase, countryMap, COVID_DATA_ARR } from "./covid-data";

const POIStats = (props: IPOIStatsProps) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Array<Record<string, any>>>([]);
  const { poi, country } = props;
  const classes = cardStyles();
  const chartClasses = chartStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPOITweetDates(poi);
      console.log("[POIStats] response", response);
      if (response.poiDateCountArr.length > 0) {
        console.log("Setting data", response.poiDateCountArr);
        setData(response.poiDateCountArr[0]);
      } else {
        setData([]);
      }
      setLoading(false);
    };

    setLoading(true);
    fetchData();
  }, [poi]);

  return (
    <Grid
      item
      xs={12}
      sx={{ marginTop: "2rem", padding: "0.5rem" }}
      justifyItems="center"
    >
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        fontSize={24}
        fontWeight={25}
        color="#616161"
      >
        {`${poi} Tweet Counter vs COVID-19 curve in ${convertToCapitalCase(
          country
        )}`}
      </Typography>
      <Card className={classes.root}>
        <CardContent style={{ textAlign: "center" }}>
          {!loading && data.length > 0 ? (
            <>
              <ResponsiveContainer
                width="40%"
                height="100%"
                aspect={2}
                className={chartClasses.root}
              >
                <BarChart
                  width={300}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#ff4081" />
                </BarChart>
              </ResponsiveContainer>
              <ResponsiveContainer
                width="40%"
                height="100%"
                aspect={2}
                className={chartClasses.root}
              >
                <BarChart
                  width={300}
                  height={300}
                  data={COVID_DATA_ARR}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey={`${
                      countryMap[convertToCapitalCase(country)]
                    }_rolling`}
                    fill="#0d47a1"
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <CircularProgress />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default POIStats;

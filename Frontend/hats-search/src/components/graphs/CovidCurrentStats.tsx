import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { cardStyles } from "../styles/card-styles";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { ICovidStatsByCountry } from "../../interfaces/interface";
import { fetchCountryDataLive } from "../../services/covid-tracker";
import { chartStyles } from "../styles/chart-styles";

const CovidCurrentStats = (props: ICovidStatsByCountry) => {
  const [data, setData] = React.useState([]);
  const [countries, setCountries] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const classes = cardStyles();
  const chartClasses = chartStyles();

  useEffect(() => {
    const fetchData = async () => {
      const countryCases = await fetchCountryDataLive(props.country);
      setData(countryCases);
      setCountries(countries);
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, [countries]);

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
        {props.country} COVID Stats
      </Typography>
      <Card className={classes.root}>
        <CardContent>
          {!loading ? (
            <Grid>
              <ResponsiveContainer width="50%" height="40%" aspect={3} className={chartClasses.root}>
                <AreaChart
                  width={500}
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
                  <Area dataKey="confirmed" fill="#4dd0e1" />
                  <Area dataKey="deaths" fill="#ff8a65" />                  
                  <Area dataKey="active" fill="#4caf50" />
                </AreaChart>
              </ResponsiveContainer>
            </Grid>
          ) : (
            <CircularProgress style={{ marginLeft: "50%" }} />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CovidCurrentStats;

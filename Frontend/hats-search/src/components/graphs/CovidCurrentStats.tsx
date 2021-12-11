import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { cardStyles } from "../styles/card-styles";
import { fetchCovidCountries, fetchCovidData } from "./constants";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ICovidStatsByCountry } from "../../interfaces/interface";

const CovidCurrentStats = (props: ICovidStatsByCountry) => {
  const [data, setData] = React.useState<{
    confirmed: Record<string, number>;
    deaths: Record<string, number>;
    recovered: Record<string, number>;
  }>({
    confirmed: { value: 0 },
    deaths: { value: 0 },
    recovered: { value: 0 },
  });
  const [value, setValue] = React.useState("");
  const [countries, setCountries] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const classes = cardStyles();

  useEffect(() => {
    const fetchData = async () => {
      const countryCases = await fetchCovidData(props.country);
      console.log("CovidCurrentStats", countryCases);
      const countries = await fetchCovidCountries();
      console.log("Covid Countries", countries);
      setData({
        confirmed: countryCases?.confirmed || 0,
        deaths: countryCases?.deaths || 0,
        recovered: countryCases?.recovered || 0,
      });
      setCountries(countries);
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  const handleChange = (
    _event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setValue(value);
  };

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
      >
        {props.country} COVID Stats
      </Typography>
      <Card className={classes.root}>
        <CardContent>
          {!loading ? (
            <Grid>
              <ResponsiveContainer width="40%" height="30%" aspect={3}>
                <BarChart
                  width={500}
                  height={300}
                  data={[data]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="confirmed" fill="#8884d8" />
                  <Bar dataKey="deaths" fill="#82ca9d" />
                </BarChart>
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

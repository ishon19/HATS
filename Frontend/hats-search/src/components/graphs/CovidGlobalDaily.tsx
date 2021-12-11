import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cardStyles } from "../styles/card-styles";
import { fetchCovidDailyData } from "./constants";

const CovidGlobalDaily = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const classes = cardStyles();

  React.useEffect(() => {
    const fetchDailyData = async () => {
      const data = await fetchCovidDailyData();
      console.log("Daily Cases: ", data);
      setData(data);
      setLoading(false);
    };
    setLoading(true);
    fetchDailyData();
  }, []);

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
        Covid Daily Cases Tracker
      </Typography>
      <Card className={classes.root}>
        <CardContent style={{ textAlign: "center" }}>
          {!loading ? (
            <ResponsiveContainer width="70%" height="30%" aspect={3}>
              <LineChart
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
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="confirmed"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <CircularProgress style={{ marginLeft: "50%" }} />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CovidGlobalDaily;

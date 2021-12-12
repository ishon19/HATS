import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { getPOITweetCounts } from "../../services/solrSearch";
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
import { cardStyles } from "../styles/card-styles";
import { chartStyles } from "../styles/chart-styles";

const PoITweetCounts = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Array<Record<string, any>>>([]);
  const classes = cardStyles();
  const chartClasses = chartStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPOITweetCounts();
      setData(response);
      setLoading(false);
    };
    setLoading(true);
    fetchData();
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
        color="#616161"
      >
        Tweet Counts of Top POIs
      </Typography>
      <Card className={classes.root}>
        <CardContent style={{ textAlign: "center" }}>
          {!loading ? (
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
                <XAxis dataKey="poi" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ff4081" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <CircularProgress />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PoITweetCounts;

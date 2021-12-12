import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { APP_ENDPOINT, LANGUAGES } from "../../services/constants";
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
import { cardStyles } from "../styles/card-styles";

const fetchLanguageDistribution = async () => {
  const finalArr: Array<Record<string, any>> = [];

  const response = await axios.get(`${APP_ENDPOINT}/get-language-dist`);
  const { data } = response.data;
  console.log(data);
  Object.keys(data).forEach((key) => {
    finalArr.push({
      language: LANGUAGES[key],
      count: data[key],
    });
  });
  return finalArr;
};

const LanguageDistribution = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Array<Record<string, any>>>([]);
  const classes = cardStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchLanguageDistribution();
      console.log("[LanguageDistribution] Response", response);
      setData(response);
      setLoading(false);
    };
    fetchData();
    setLoading(true);
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
        Language wise distribution of Tweets
      </Typography>
      <Card className={classes.root}>
        <CardContent style={{ textAlign: "center" }}>
          {!loading ? (
            <ResponsiveContainer width="40%" height="100%" aspect={2}>
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
                <XAxis dataKey="language" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" barSize={73}/>
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

export default LanguageDistribution;

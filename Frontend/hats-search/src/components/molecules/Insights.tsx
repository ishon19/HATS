import React from "react";
import { Grid } from "@mui/material";
import CovidGlobalDaily from "../graphs/CovidGlobalDaily";
import CovidCurrentStats from "../graphs/CovidCurrentStats";
import LanguageDistribution from "../graphs/LanguageDistribution";
import CountryDistribution from "../graphs/CountryTweetDistribution";
import PoITweetCounts from "../graphs/PoITweetCounts";

const Insights = () => {
  return (
    <Grid container spacing={2}>
      <CovidGlobalDaily />
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <CovidCurrentStats country="USA" />
          </Grid>
          <Grid item xs={12}>
            <CovidCurrentStats country="India" />
          </Grid>
          <Grid item xs={12}>
            <CovidCurrentStats country="Mexico" />
          </Grid>
        </Grid>
      </Grid>
      <LanguageDistribution />
      <CountryDistribution />
      <PoITweetCounts />
    </Grid>
  );
};

export default Insights;

import React from "react";
import { Grid } from "@mui/material";
import CovidGlobalDaily from "../graphs/CovidGlobalDaily";
import CovidCurrentStats from "../graphs/CovidCurrentStats";
import LanguageDistribution from "../graphs/LanguageDistribution";
import CountryDistribution from "../graphs/CountryTweetDistribution";
import PoITweetCounts from "../graphs/PoITweetCounts";

const Insights = () => {
  return (
    <Grid container spacing={2} padding={7}>
      <CovidGlobalDaily />
      <LanguageDistribution />
      <CountryDistribution />
      <PoITweetCounts />
      <Grid item xs={12}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <CovidCurrentStats country="USA" />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CovidCurrentStats country="India" />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CovidCurrentStats country="Mexico" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Insights;

import React from "react";
import { Grid } from "@mui/material";
import CovidGlobalDaily from "../graphs/CovidGlobalDaily";
import CovidCurrentStats from "../graphs/CovidCurrentStats";

const Insights = () => {
  return (
    <Grid container>
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
    </Grid>
  );
};

export default Insights;

import { Grid, Typography } from "@mui/material";
import React from "react";

const NoResults = () => {
  return (
    <Grid
      container
      alignItems="center"
      component="div"
      justifyContent="center"
      sx={{ marginTop: "30vh" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h3"
          fontWeight={600}
          fontSize={40}
          sx={{ color: "#bdbdbd" }}
        >
          No results found
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NoResults;

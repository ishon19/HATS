import { Grid, Typography } from "@mui/material";
import React from "react";
import { INoResultProps } from "../../interfaces/interface";

const NoResults = (props: INoResultProps) => {
  const { title, mainResults } = props;

  return (
    <Grid
      container
      alignItems="center"
      component="div"
      justifyContent="center"
      sx={{ marginTop: mainResults ? "30vh" : "1rem" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h3"
          fontWeight={600}
          fontSize={40}
          sx={{ color: "#bdbdbd" }}
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NoResults;

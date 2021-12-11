import { Grid, Typography } from "@mui/material";
import React from "react";
import { ITextAnnotation } from "../../interfaces/interface";

const TextAnnotation = (props: ITextAnnotation) => {
  const { sentiment, country, time, verified, poi_name } = props;
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item>
        <Typography variant="caption" fontWeight={600}>
          POI Name:{" "}
        </Typography>
        <Typography variant="caption">{poi_name || 'N/A'}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption" fontWeight={600}>
          Sentiment:{" "}
        </Typography>
        <Typography variant="caption">{sentiment}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption" fontWeight={600}>
          Country:{" "}
        </Typography>
        <Typography variant="caption">{country}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption" fontWeight={600}>
          Time:{" "}
        </Typography>
        <Typography variant="caption">
          {new Date(time as string).toUTCString()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TextAnnotation;

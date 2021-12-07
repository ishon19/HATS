import { Grid, Typography } from "@mui/material";
import React from "react";
import { ITextAnnotation } from "../../interfaces/interface";

const TextAnnotation = (props: ITextAnnotation) => {
  const { sentiment, country, time, verified, poiName } = props;
  return (
    <Grid container direction="row" spacing={1}>
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

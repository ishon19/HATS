import { Grid, Typography } from "@mui/material";
import React from "react";
import { ITextAnnotation } from "../../interfaces/interface";

const TextAnnotation = (props: ITextAnnotation) => {
  const { sentiment, country, time, poi_name, sentiment_score } = props;
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item>
        <Typography variant="caption" fontWeight={600} color="#616161">
          POI Name:{" "}
        </Typography>
        <Typography variant="caption">{poi_name || "N/A"}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption" fontWeight={600} color="#616161">
          Sentiment:{" "}
        </Typography>
        <Typography variant="caption">{sentiment || "N/A"}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption" fontWeight={600} color="#616161">
          Country:{" "}
        </Typography>
        <Typography variant="caption">{country|| "N/A"}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption" fontWeight={600} color="#616161">
          Time:{" "}
        </Typography>
        <Typography variant="caption">
          {new Date(time as string).toUTCString() || "N/A"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TextAnnotation;

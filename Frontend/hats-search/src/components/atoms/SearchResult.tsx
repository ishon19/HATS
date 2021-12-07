import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { SEARCH_IMAGE_URL } from "../../constants";
import { ISearchResult } from "../../interfaces/interface";
import TextAnnotation from "../molecules/TextAnnotation";
import { cardStyles } from "../styles/card-styles";
import { getColorBySentiment } from "../utils";

const SearchResult = (props: ISearchResult) => {
  const classes = cardStyles();

  return (
    <Card className={classes.root}>
      <CardMedia image={SEARCH_IMAGE_URL} />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6" className={classes.title}>
            <Link
              className={classes.link}
              to="/search-details"
              style={{
                color: getColorBySentiment(
                  props.annotation.sentiment?.toLowerCase() || "neutral"
                ),
              }}
            >
              {props.title}
            </Link>
          </Typography>
          <Typography variant="body2" className={classes.annotation}>
            <TextAnnotation
              country={props.annotation.country}
              verified={props.annotation.verified}
              poiName={props.annotation.poiName}
              time={props.subtitle}
              sentiment={props.annotation.sentiment}
            />
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SearchResult;

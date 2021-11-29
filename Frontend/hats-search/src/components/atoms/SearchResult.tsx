import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { SEARCH_IMAGE_URL } from "../../constants";
import { ISearchResult } from "../../interfaces/interface";
import { cardStyles } from "../styles/card-styles";

const SearchResult = (props: ISearchResult) => {
  const classes = cardStyles();

  return (
    <Card className={classes.root}>
      <CardMedia image={SEARCH_IMAGE_URL} />
      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/search-details">
              {props.title}
            </Link>
          </Typography>
          <Typography variant="body2" className={classes.annotation}>
            {props.annotation}
          </Typography>
          <Typography variant="subtitle1">{props.subtitle}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SearchResult;

import { Card, CardContent, Skeleton, Stack } from "@mui/material";
import React from "react";
import { cardStyles } from "./styles/card-styles";

const SearchResultSkeleton = () => {
  const classes = cardStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Stack spacing={1}>
          <Skeleton
            variant="rectangular"
            width="80%"
            height={30}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width="70%"
            height={10}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width="70%"
            height={20}
            animation="wave"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SearchResultSkeleton;

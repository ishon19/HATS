import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IRootView } from "../interfaces/interface";

const RootView = (props: IRootView) => {
  return (
    <Box flexGrow={1}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">HATS Search</Typography>
        </Toolbar>
      </AppBar>
      {props.root}
    </Box>
  );
};

export default RootView;

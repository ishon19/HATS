import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SearchField from "./SearchField";

const SearchHome = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    console.log("[SearchHome] ", newValue);
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100vw",
        paddingLeft: "15vw",
      }}
    >
      <Grid container spacing={1} direction="row" alignItems="center">
        <Grid item xs={6}>
          <FormControl fullWidth>
            <SearchField value={value} handleChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained">Search</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchHome;

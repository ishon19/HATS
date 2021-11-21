import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const SearchHome = () => {
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
          <FormControl fullWidth sx={{ m: 1 }}>            
            <OutlinedInput
              id="search-query"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }              
            />
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

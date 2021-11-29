import { Button, FormControl, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchField from "./atoms/SearchField";

const SearchHome = () => {
  const [value, setValue] = useState("");

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
          <Link
            to={{ pathname: "/search", search: "q=" + value }}
            style={{ textDecoration: "none" }}            
          >
            <Button variant="contained">Search</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchHome;

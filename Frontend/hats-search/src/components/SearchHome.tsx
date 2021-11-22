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
            <Autocomplete
              freeSolo
              disableClearable
              options={["Test", "covid", "india"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"            
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchHome;

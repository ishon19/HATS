import {
  AppBar,
  Button,
  Drawer,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React from "react";
import { IRootView } from "../interfaces/interface";
import FilterMenu from "./atoms/FilterMenu";

export const FilterContext = React.createContext([]);

const RootView = (props: IRootView) => {
  const hideFilter = props.hideFilter;
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState([]);

  const filterClickHandler = () => {
    console.log("filter button clicked");
    setOpen(!open);
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  return (
    <FilterContext.Provider value={filters}>
      <Box flexGrow={1}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">HATS Search</Typography>
            <Box
              sx={{
                marginLeft: "auto",
                display: hideFilter ? "none" : "block",
              }}
            >
              <Button
                variant="text"
                aria-label="menu"
                sx={{ color: "white" }}
                onClick={filterClickHandler}
              >
                <FilterAltRoundedIcon />
                <Typography variant="h6">Filters</Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box role="presentation">
          <Drawer
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
              sx: {
                width: "25%",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "1rem",
              },
            }}
          >
            <Grid container flexDirection="column">
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600}>
                  Filters
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                alignContent="right"
                display="flex"
                alignSelf="flex-end"
              >
                <CloseRoundedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={onDrawerClose}
                  fontWeight={600}
                />
              </Grid>
            </Grid>
            <Grid container direction="column">
              <Grid item xs={12}>
                <FilterMenu
                  title="POIs"
                  handleFilterChange={() => {}}
                  options={["Joe Biden", "Narendra Modi"]}
                />
                <FilterMenu
                  title="Language"
                  handleFilterChange={() => {}}
                  options={["English", "Hindi", "Spanish"]}
                />
                <FilterMenu
                  title="Country"
                  handleFilterChange={() => {}}
                  options={["USA", "India", "Mexico"]}
                />
              </Grid>
            </Grid>
          </Drawer>
        </Box>
        {props.root}
      </Box>
    </FilterContext.Provider>
  );
};

export default RootView;

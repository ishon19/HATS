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
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useEffect } from "react";
import { IFilterState, IRootView } from "../interfaces/interface";
import FilterMenu from "./atoms/FilterMenu";
import { FilterContext } from "../contexts/FilterContext";
import { FILTER_OPTIONS } from "../constants";
import { useLocation, useNavigate } from "react-router";
import { getFilterString } from "./utils";
import { Link } from "react-router-dom";

const RootView = (props: IRootView) => {
  const hideFilter = props.hideFilter;
  const [open, setOpen] = React.useState(false);
  const [filterState, setFilterState] = React.useState<IFilterState>({
    poi: FILTER_OPTIONS.poi,
    lang: FILTER_OPTIONS.lang,
    country: FILTER_OPTIONS.country,
  });
  const navigate = useNavigate();
  const { search } = useLocation();

  const handleFilterChange = (
    filterName: string,
    name: string,
    checked: boolean
  ) => {
    const newFilterState = { ...filterState };
    newFilterState[filterName] = newFilterState[filterName].map(
      (filter: { name: string; value: string; checked: boolean }) => {
        if (filter.name === name) {
          filter.checked = checked;
        }
        return filter;
      }
    );
    setFilterState(newFilterState);

    // TODO: use navigate to update url
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get("q");
    const filterString = getFilterString(newFilterState);
    navigate(`/search?q=${query}&${filterString}`);
  };

  const filterClickHandler = () => {
    console.log("filter button clicked");
    setOpen(!open);
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // fetch the top POIs
  },[])

  return (
    <Box flexGrow={1}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              HATS Search
            </Link>
          </Typography>
          <Box
            sx={{
              marginLeft: "auto",
              display: hideFilter ? "none" : "block",
            }}
          >
            <Button variant="text" aria-label="menu" sx={{ color: "white" }}>
              <BarChartRoundedIcon />
              <Typography variant="h6">
                <Link
                  to="/insights"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Insights
                </Link>
              </Typography>
            </Button>
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
                filterName="poi"
                handleFilterChange={handleFilterChange}
                options={filterState.poi}
              />
              <FilterMenu
                title="Country"
                filterName="country"
                handleFilterChange={handleFilterChange}
                options={filterState.country}
              />
              <FilterMenu
                title="Language"
                filterName="lang"
                handleFilterChange={handleFilterChange}
                options={filterState.lang}
              />
            </Grid>
          </Grid>
        </Drawer>
      </Box>
      {props.root}
    </Box>
  );
};

export default RootView;

import { Button, Grid, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchField from "./atoms/SearchField";
import SearchResult from "./atoms/SearchResult";
import Paginate from "./molecules/Paginate";
import SearchResultSkeleton from "./SearchResultSkeleton";

const SearchResults = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [params] = useSearchParams();
  const searchQuery = params.get("q");
  console.log(searchQuery);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ padding: "1rem", marginBottom: "2rem" }}
      alignItems="flex-start"
    >
      <Grid item xs={12} sx={{ width: "100%" }}>
        <Grid container direction="row">
          <Grid item xs={10}>
            <SearchField handleChange={() => {}} value="" />
          </Grid>
          <Grid item xs={2}>
            <Link
              to={{ pathname: "/search", search: "q=" + value }}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained">Search</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <Grid item key={i} xs={12} sx={{ width: "100%" }}>
          {isLoading ? (
            <SearchResultSkeleton />
          ) : (
            <SearchResult
              annotation={`Search ${i}`}
              subtitle={`Search ${i}`}
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
            />
          )}
        </Grid>
      ))}
      <Grid item>
        <Paginate
          handlePageChange={() => {}}
          handlePerPageChange={() => {}}
          page={1}
          perPage={10}
          total={100}
        />
      </Grid>
    </Grid>
  );
};

export default SearchResults;

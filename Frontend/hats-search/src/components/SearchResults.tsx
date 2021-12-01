import { Button, Grid, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// import { styled } from "@mui/material/styles";
import { ISearchResultResponse } from "../interfaces/interface";
import { getSearchResults } from "../services/solrSearch";
import SearchField from "./atoms/SearchField";
import SearchResult from "./atoms/SearchResult";
import Paginate from "./molecules/Paginate";
import SearchResultSkeleton from "./SearchResultSkeleton";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<ISearchResultResponse[]>(
    []
  );
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [params] = useSearchParams();
  const searchQuery = (params.get("q") as string) ?? "";
  console.log(searchQuery);

  useEffect(() => {
    const fetchData = async () => {
      const data: ISearchResultResponse[] = await getSearchResults(searchQuery);
      if (data.length > 0) {
        setSearchResults(data);
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchData();
  }, [searchQuery]);

  // const CustomGrid = styled(Grid)(({ theme }) => ({
  //   root: {
  //     [theme.breakpoints.down("md")]: {
  //       padding: "1rem 15rem 5rem 15rem",
  //     },
  //     [theme.breakpoints.up("md")]: {
  //       padding: "1rem 20rem 5rem 20rem",
  //     },
  //   },
  // }));

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ padding: "1rem 10rem 5rem 10rem" }}
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
      {isLoading
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Grid item key={i} xs={12} sx={{ width: "100%" }}>
              <SearchResultSkeleton />
            </Grid>
          ))
        : searchResults.map((searchResult: ISearchResultResponse) => (
            <Grid item key={searchResult.id} xs={12} sx={{ width: "100%" }}>
              {
                <SearchResult
                  annotation={searchResult.country || "N/A"}
                  subtitle={searchResult.tweet_date || "N/A"}
                  title={searchResult.tweet_text || "Title not available"}
                />
              }
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

import { Button, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";

import { ISearchResultResponse } from "../interfaces/interface";
import { getSearchResults } from "../services/solrSearch";
import NoResults from "./atoms/NoResults";
import SearchField from "./atoms/SearchField";
import SearchResult from "./atoms/SearchResult";
import Legends from "./molecules/Legends";
import Paginate from "./molecules/Paginate";
import SearchResultSkeleton from "./SearchResultSkeleton";

const getFilterObj = (params: URLSearchParams) => {
  const filterObj: { pois: string[]; language: string[]; country: string[] } = {
    pois: [],
    language: [],
    country: [],
  };
  const pois = params.getAll("poi") || "";
  const country = params.getAll("country") || "";
  const lang = params.getAll("lang") || "";

  filterObj.pois = pois;
  filterObj.country = country;
  filterObj.language = lang;

  return filterObj;
};

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<ISearchResultResponse[]>(
    []
  );
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [params] = useSearchParams();
  const query = (params.get("q") as string) ?? "";
  const filters = getFilterObj(params);
  const { enqueueSnackbar } = useSnackbar();

  const handlePageChange = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, count } = await getSearchResults({
        query,
        filters,
        page_number: page,
        rows_per_page: rowsPerPage,
      });
      if (data.length > 0) {
        setSearchResults(data);
        setTotalResults(count);
        enqueueSnackbar(`${count} search results found`, {
          variant: "success",
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
        });
      } else {
        setSearchResults([]);
        enqueueSnackbar(`No results found`, {
          variant: "warning",
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
        });
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchData();
  }, [page, rowsPerPage, params, enqueueSnackbar, query]);

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
            <SearchField
              handleChange={(_e, value) => {
                setValue(value);
              }}
              value={query || value}
            />
          </Grid>
          <Grid item xs={1} marginTop={1}>
            <Link
              to={{ pathname: "/search", search: "q=" + value }}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained">Search</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} paddingTop={2}>
          <Legends />
        </Grid>
      </Grid>
      {isLoading ? (
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Grid item key={i} xs={12} sx={{ width: "100%" }}>
            <SearchResultSkeleton />
          </Grid>
        ))
      ) : searchResults.length > 0 ? (
        searchResults.map((searchResult: any) => (
          <Grid item key={searchResult[0].id} xs={12} sx={{ width: "100%" }}>
            {
              <SearchResult
                annotation={searchResult[0] || "N/A"}
                subtitle={searchResult[0].tweet_date || "N/A"}
                title={searchResult[0].tweet_text || "Title not available"}
              />
            }
          </Grid>
        ))
      ) : (
        <NoResults />
      )}
      <Grid item>
        <Paginate
          handlePageChange={handlePageChange}
          handlePerPageChange={handleRowsPerPageChange}
          page={page}
          perPage={rowsPerPage}
          total={totalResults}
        />
      </Grid>
    </Grid>
  );
};

export default SearchResults;

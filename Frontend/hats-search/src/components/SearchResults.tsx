import { Button, Grid, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";
import { FilterContext } from "../contexts/FilterContext";

import { ISearchResultResponse } from "../interfaces/interface";
import { getSearchResults } from "../services/solrSearch";
import SearchField from "./atoms/SearchField";
import SearchResult from "./atoms/SearchResult";
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
  const [isLoading, setIsLoading] = useState(false);
  const [params] = useSearchParams();
  const query = (params.get("q") as string) ?? "";
  const filters = getFilterObj(params);

  useEffect(() => {
    const fetchData = async () => {
      const data: ISearchResultResponse[] = await getSearchResults({
        query,
        filters,
        page_number: page,
        rows_per_page: rowsPerPage,
      });
      if (data.length > 0) {
        setSearchResults(data);
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchData();
  }, [query, filters, page, rowsPerPage]);

  return (
    <FilterContext.Consumer>
      {(context) => {
        console.log("[SearchResults] context: ", context);
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
              : searchResults.map((searchResult: any) => (
                  <Grid
                    item
                    key={searchResult[0].id}
                    xs={12}
                    sx={{ width: "100%" }}
                  >
                    {
                      <SearchResult
                        annotation={searchResult[0] || "N/A"}
                        subtitle={searchResult[0].tweet_date || "N/A"}
                        title={
                          searchResult[0].tweet_text || "Title not available"
                        }
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
      }}
    </FilterContext.Consumer>
  );
};

export default SearchResults;

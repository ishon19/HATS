import { CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ISearchResultDetails } from "../../interfaces/interface";
import { getTweetByID } from "../../services/solrSearch";
import SearchResultSkeleton from "../SearchResultSkeleton";
import NoResults from "./NoResults";
import SearchResult from "./SearchResult";

const SearchResultInfo = () => {
  const [params] = useSearchParams();
  const poiName = (params.get("poi") as string) ?? "";
  const tweetId = (params.get("id") as string) ?? "";
  const [data, setData] = React.useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  console.log("SearchResultInfo", tweetId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTweetByID(tweetId || "");
      if (response.length > 0) {
        setData(response);
      } else {
        setData([]);
      }
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, [params, tweetId, poiName]);

  return (
    <Grid item xs={12}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <Typography variant="caption" fontSize={24} color="#616161">
            Tweet
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            ["Result"].map((i) => (
              <Grid item key={i} xs={12} sx={{ width: "100%" }}>
                <SearchResultSkeleton />
              </Grid>
            ))
          ) : data.length > 0 ? (
            data.map((searchResult: any) => (
              <Grid
                item
                key={searchResult[0].id}
                xs={12}
                sx={{ width: "100%" }}
              >
                {
                  <SearchResult
                    routeToTwitter
                    annotation={searchResult[0] || "N/A"}
                    subtitle={searchResult[0].tweet_date || "N/A"}
                    title={searchResult[0].tweet_text || "Title not available"}
                  />
                }
              </Grid>
            ))
          ) : (
            <NoResults title="Tweet info not found" />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchResultInfo;

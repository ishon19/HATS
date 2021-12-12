import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ISearchResultDetails } from "../../interfaces/interface";
import { getTweetRepliesByID } from "../../services/solrSearch";
import SearchResultSkeleton from "../SearchResultSkeleton";
import NoResults from "./NoResults";
import SearchResult from "./SearchResult";

const SearchResultReplies = (props: ISearchResultDetails) => {
  const [params] = useSearchParams();
  const poiName = (params.get("poi") as string) ?? "";
  const tweetId = (params.get("id") as string) ?? "";
  const [replies, setReplies] = React.useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = React.useState(false);
  console.log("SearchResultReplies", tweetId);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTweetRepliesByID(tweetId || "");
      if (result.length > 0) {
        setReplies(result);
      } else {
        setReplies([]);
      }
      setLoading(false);
    };

    setLoading(true);
    fetchData();
  }, [params, tweetId, poiName]);

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption" fontSize={24} color="#616161">
            Replies
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            {loading ? (
              ["1", "2"].map((i) => (
                <Grid item key={i} xs={12} sx={{ width: "100%" }}>
                  <SearchResultSkeleton />
                </Grid>
              ))
            ) : replies.length > 0 ? (
              replies.map((searchResult: any) => (
                <Grid
                  item
                  key={searchResult[0].id}
                  xs={12}
                  sx={{ width: "100%", marginBottom: "1rem" }}
                >
                  {
                    <SearchResult
                      routeToTwitter
                      annotation={searchResult[0] || "N/A"}
                      subtitle={searchResult[0].tweet_date || "N/A"}
                      title={
                        searchResult[0].tweet_text || "Title not available"
                      }
                    />
                  }
                </Grid>
              ))
            ) : (
              <NoResults title="No replies found" />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchResultReplies;

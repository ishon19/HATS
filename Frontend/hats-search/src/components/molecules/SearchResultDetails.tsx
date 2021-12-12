import { Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchResultInfo from "../atoms/SearchResultInfo";
import SearchResultReplies from "../atoms/SearchResultReplies";
import POIStats from "../graphs/POIStats";

const SearchResultDetails = () => {
  const [params] = useSearchParams();
  const poiName = (params.get("poi") as string) ?? "";

  return (
    <Grid container padding={3} spacing={3}>
      <Grid item xs={12}>
        <SearchResultInfo />
      </Grid>
      <Grid item xs={12}>
        <SearchResultReplies />
      </Grid>
      <Grid item xs={12}>
        <POIStats poi={poiName} />
      </Grid>
    </Grid>
  );
};

export default SearchResultDetails;

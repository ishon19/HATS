import axios from "axios";
import { ISearchRequest } from "../interfaces/interface";
import { SEARCH_ENDPOINT } from "./constants";

const getSearchResults = async (props: ISearchRequest) => {
  const { query, filters, page_number, rows_per_page } = props;

  const url = SEARCH_ENDPOINT;
  const response = await axios.post(url, {
    query,
    filters,
    page_number,
    rows_per_page,
  });

  console.log("[solrSearch]", response);
  return { data: response.data.data, count: response.data.total_data };
};

export { getSearchResults };

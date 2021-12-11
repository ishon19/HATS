import axios from "axios";
import { ISearchRequest } from "../interfaces/interface";
import { APP_ENDPOINT, SEARCH_ENDPOINT } from "./constants";

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

const getTopNPois = async (num_pois: number) => {
  const response = await axios.post(`${APP_ENDPOINT}/get-pois`, {
    num_pois,
  });
  console.log("[getTopNPois] Response: ", response);
  return response.data.pois_data;
};

export { getSearchResults, getTopNPois };

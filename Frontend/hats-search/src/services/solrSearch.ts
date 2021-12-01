import axios from "axios";
import { ISearchResultResponse } from "../interfaces/interface";
import { SEARCH_ENDPOINT } from "./constants";

const getSearchResults = async (query: string) => {
  const url = SEARCH_ENDPOINT;
  const response = await axios.post(url, {
    query,
  });
  return response.data;
};

export { getSearchResults };

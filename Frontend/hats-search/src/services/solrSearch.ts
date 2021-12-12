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

  return { data: response.data.data, count: response.data.total_data };
};

const getTopNPois = async (num_pois: number) => {
  const response = await axios.post(`${APP_ENDPOINT}/get-pois`, {
    num_pois,
  });

  return response.data.pois_data;
};

const getPOITweetCounts = async () => {
  const response = await axios.get(`${APP_ENDPOINT}/get-pois-tweet-count`);
  const POIList = response.data.pois_tweet_count_data;
  const modifiedPOIList = Object.keys(POIList).map((key) => {
    return {
      poi: key,
      count: POIList[key],
    };
  });

  return modifiedPOIList;
};

const getTweetByID = async (tweet_id: string) => {
  const response = await axios.post(`${APP_ENDPOINT}/get-tweet`, {
    tweet_id,
  });
  console.log("getTweetByID ", response);

  return response.data.data;
};

const getTweetRepliesByID = async (tweet_id: string) => {
  const response = await axios.post(`${APP_ENDPOINT}/get-replies`, {
    tweet_id,
  });
  console.log("getTweetRepliesByID ", response);

  return response.data.data;
};

export {
  getSearchResults,
  getTopNPois,
  getPOITweetCounts,
  getTweetByID,
  getTweetRepliesByID,
};

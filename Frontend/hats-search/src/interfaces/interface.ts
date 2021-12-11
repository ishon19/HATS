// This file contains all the interfaces used in the application

import React from "react";

export interface IRootView {
  root: JSX.Element;
  hideFilter?: boolean;
  viewName?: string;
}

export interface ISearchField {
  value: string;
  handleChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
  options?: string[];
}

export interface ISearchResult {
  title: string;
  subtitle: string;
  annotation: ITextAnnotation;
}

export interface IPaginate {
  page: number;
  perPage: number;
  total: number;
  handlePageChange: (event: any, page: number) => void;
  handlePerPageChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export interface ISearchResultResponse {
  _version_?: string;
  tweet_en?: string | string[];
  tweet_es?: string | string[];
  tweet_hi?: string | string[];
  poi_name?: string;
  sentiment?: string;
  country: string;
  id: string;
  mentions: string[];
  tweet_date: string;
  tweet_lang: string;
  tweet_text: string;
  verified: boolean;
}

export interface IFilterMenu {
  filterName: string;
  handleFilterChange: (
    filterName: string,
    name: string,
    checked: boolean
  ) => void;
  title: string;
  options: Array<{ name: string; value: string; checked: boolean }>;
}

export interface ICheckboxWithTitle {
  title: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ITextAnnotation {
  country?: string;
  time?: string;
  verified?: boolean;
  poi_name?: string;
  sentiment?: string;
  id?: string;
  poi_id?: string;
  sentiment_score?: number;
}

export interface IFilterState {
  poi: Array<{
    name: string;
    value: string;
    checked: boolean;
  }>;
  lang: Array<{
    name: string;
    value: string;
    checked: boolean;
  }>;
  country: Array<{
    name: string;
    value: string;
    checked: boolean;
  }>;
}

export interface ISearchRequest {
  query: string;
  filters: { pois: string[]; language: string[]; country: string[] };
  page_number: number;
  rows_per_page: number;
}

export interface ICovidStatsByCountry {
  country: string;
}

// This file contains all the interfaces used in the application

import React from "react";

export interface IRootView {
  root: JSX.Element;
  hideFilter?: boolean;
}

export interface ISearchField {
  value: string;
  handleChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
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
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
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
  handleFilterChange: (filter: string) => void;
  title: string;
  options: string[];
}

export interface ICheckboxWithTitle {
  title: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ITextAnnotation {
  country?: string;
  time?: string;
  verified?: boolean;
  poiName?: string;
  sentiment?: string;
}

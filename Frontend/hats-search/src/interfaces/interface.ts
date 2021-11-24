// This file contains all the interfaces used in the application

import React from "react";

export interface IRootView {
  root: JSX.Element;
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

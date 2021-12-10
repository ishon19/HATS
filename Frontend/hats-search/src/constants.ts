// This file contains the constants used in the application

import { IFilterState } from "./interfaces/interface";

export const SEARCH_IMAGE_URL =
  "https://img.icons8.com/cute-clipart/64/000000/twitter.png";

export const SEARCH_SUGGESTIONS = [
  "covid",
  "vaccine",
  "joe biden",
  "mexico",
  "usa",
  "india",
  "narendra modi",
  "covaxin",
  "hesitant",
  "modi",
  "Modi",
  "Joe",
  "America",
  "Biden",
  "kejriwal",
  "BJP",
  "Health",
  "Corona",
  "Virus",
  "Coronavirus",
];

export const FILTER_OPTIONS: IFilterState = {
  poi: [
    {
      value: "Narendra Modi",
      name: "narendramodi",
      checked: false,
    },
    {
      value: "Joe Biden",
      name: "joebiden",
      checked: false,
    },
  ],
  lang: [
    { value: "English", name: "en", checked: false },
    { value: "Hindi", name: "hi", checked: false },
    { value: "Spanish", name: "es", checked: false },
  ],
  country: [
    { value: "India", name: "in", checked: false },
    { value: "USA", name: "us", checked: false },
    { value: "Mexico", name: "mx", checked: false },
  ],
};

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
      name: "Narendra Modi",
      checked: false,
    },
    {
      value: "Joe Biden",
      name: "Joe Biden",
      checked: false,
    },
    {
      value: "CDC",
      name: "CDC",
      checked: false,
    },
  ],
  lang: [
    { value: "English", name: "en", checked: false },
    { value: "Hindi", name: "hi", checked: false },
    { value: "Spanish", name: "es", checked: false },
  ],
  country: [
    { value: "India", name: "India", checked: false },
    { value: "USA", name: "USA", checked: false },
    { value: "Mexico", name: "Mexico", checked: false },
  ],
};

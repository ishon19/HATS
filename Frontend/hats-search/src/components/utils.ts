import { IFilterState } from "../interfaces/interface";

const getColorBySentiment = (sentiment: string): string => {
  if (sentiment === "positive") {
    return "#26a69a";
  }
  if (sentiment === "negative") {
    return "#ff3d00";
  }
  return "#ffa000";
};

const getFilterString = (filterState: IFilterState): string => {
  let filterString = "";
  filterState.poi.forEach((poi) => {
    if (poi.checked) {
      filterString += `poi=${poi.name}&`;
    }
  });

  filterState.lang.forEach((lang) => {
    if (lang.checked) {
      filterString += `lang=${lang.name}&`;
    }
  });
  filterState.country.forEach((country) => {
    if (country.checked) {
      filterString += `country=${country.name}&`;
    }
  });
  return filterString;
};

const createPOIArr = (response: any) => {
  const modifiedList = response.map((poi: any) => {
    return {
      name: poi,
      value: poi,
      checked: false,
    };
  });
  return modifiedList;
};

export { getColorBySentiment, getFilterString, createPOIArr };

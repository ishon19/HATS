import { createContext } from "react";
import { FILTER_OPTIONS } from "../constants";
import { IFilterState } from "../interfaces/interface";

export const FilterContext = createContext<IFilterState>(FILTER_OPTIONS);

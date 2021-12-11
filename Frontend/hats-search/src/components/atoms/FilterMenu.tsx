import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { FILTER_OPTIONS } from "../../constants";
import { IFilterMenu } from "../../interfaces/interface";
import CheckBoxWithTitle from "./CheckBoxWithTitle";

const FilterMenu = (props: IFilterMenu) => {
  const onCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterName: string
  ) => {
    console.log(
      "FilterName: ",
      filterName,
      "Checkbox ",
      event.target.name,
      event.target.checked
    );
    props.handleFilterChange(
      filterName,
      event.target.name,
      event.target.checked
    );
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5" fontWeight={600}>
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.options.map((option) => {
          const filterName = props.filterName;

          return (
            <CheckBoxWithTitle
              key={option.name}
              name={option.name}
              title={option.value}
              checked={option.checked}
              onChange={(event) => onCheckboxChange(event, filterName)}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterMenu;

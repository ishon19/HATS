import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import themeOptions from "../../theme/theme";
import { IFilterMenu } from "../../interfaces/interface";
import CheckBoxWithTitle from "./CheckBoxWithTitle";

const FilterMenu = (props: IFilterMenu) => {
  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Checkbox ", event.target.name, event.target.checked);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5" fontWeight={600}>
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.options.map((option, index) => {
          return (
            <CheckBoxWithTitle
              key={index}
              name={option}
              title={option}
              onChange={onCheckboxChange}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterMenu;
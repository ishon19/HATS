import { Checkbox, Grid } from "@mui/material";
import React from "react";
import { ICheckboxWithTitle } from "../../interfaces/interface";

const CheckBoxWithTitle = (props: ICheckboxWithTitle) => {
  return (
    <Grid container alignItems="baseline">
      <Grid item>
        <Checkbox name={props.name} onChange={props.onChange} checked={props.checked}/>
      </Grid>
      <Grid item>{props.title}</Grid>
    </Grid>
  );
};

export default CheckBoxWithTitle;

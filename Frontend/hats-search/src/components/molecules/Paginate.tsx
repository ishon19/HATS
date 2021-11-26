import { Grid, TablePagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { IPaginate } from "../../interfaces/interface";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "#eeeeee",
  },
});

const Paginate = (props: IPaginate) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" className={classes.root} flexDirection="row-reverse">
      <Grid item>
        <TablePagination
          component="div"
          count={100}
          page={1}
          onPageChange={() => {}}
          rowsPerPage={10}
          onRowsPerPageChange={() => {}}
        />
      </Grid>
    </Grid>
  );
};

export default Paginate;

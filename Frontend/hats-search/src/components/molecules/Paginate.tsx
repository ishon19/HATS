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
    zIndex: 100,
  },
});

const Paginate = (props: IPaginate) => {
  const classes = useStyles();
  const { page, perPage, total, handlePageChange, handlePerPageChange } = props;

  return (
    <Grid
      container
      direction="row"
      className={classes.root}
      flexDirection="row-reverse"
    >
      <Grid item>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={perPage}
          onRowsPerPageChange={handlePerPageChange}
        />
      </Grid>
    </Grid>
  );
};

export default Paginate;

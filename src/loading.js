import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
  apploading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh"
  }
});
const Loading = props => {
  const { classes } = props;
  return (
    <div className={classes.apploading}>
      <CircularProgress />
    </div>
  );
};

export default withStyles(useStyles)(Loading);

import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";

const Notes = props => {
  const { classes, data } = props;

  return (
    <div className={classes.outerNotesBox}>
      <h2>Notes</h2>
      <div className="innerNotesBox">
        <div className="innerNotesBox">{data ? data : "-"}</div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Notes);

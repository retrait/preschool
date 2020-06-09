import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useStyles } from "../components/students/styles";

const Reports = props => {
  const { classes } = props;

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}></div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    students: state.students,
    meals: state.meals,
    toilet: state.toilet,
    sleep: state.sleep,
    attendance: state.attendance
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(Reports));

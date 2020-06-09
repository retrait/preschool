import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { findNewestRecord } from "../../utils";
import moment from "moment";
import { translateType } from "../../utils";
import { connect } from "react-redux";

const StudentItem = props => {
  const { key, classes, s, activeRoom } = props;

  let attending = faTimesCircle;
  let attendingStyle = classes.notPresentCell;
  if (s) {
    if (s.attendance.length) {
      if (
        findNewestRecord(s.attendance).activityType === "in" &&
        findNewestRecord(s.attendance).roomId === activeRoom
      ) {
        attending = faCheckCircle;
        attendingStyle = classes.presentCell;
      } else {
        attending = faTimesCircle;
        attendingStyle = classes.notPresentCell;
      }
    }

    return (
      <TableRow
        classes={{ root: classes.tableRow }}
        key={key}
        onClick={props.onClick}
      >
        <TableCell
          classes={{ root: classes.nameCell }}
          component="th"
          scope="row"
        >
          {`${s.firstName} ${s.lastName}`}
        </TableCell>
        <TableCell classes={{ root: attendingStyle }}>
          <FontAwesomeIcon icon={attending} />
        </TableCell>
        <TableCell classes={{ root: classes.nameCell }} align="right">
          {s.toilet.length ? translateType(findNewestRecord(s.toilet)) : ""}
          <br />
          {s.toilet.length
            ? moment
                .unix(findNewestRecord(s.toilet).time.seconds)
                .format("h:mma")
            : "-"}
        </TableCell>
        <TableCell classes={{ root: classes.nameCell }} align="right">
          {s.sleep.length ? translateType(findNewestRecord(s.sleep)) : ""}
          <br />
          {s.sleep.length
            ? moment
                .unix(findNewestRecord(s.sleep).time.seconds)
                .format("h:mma")
            : "-"}
        </TableCell>
        <TableCell classes={{ root: classes.nameCell }} align="right">
          {s.meals.length ? translateType(findNewestRecord(s.meals)) : ""}
          <br />
          {s.meals.length
            ? moment
                .unix(findNewestRecord(s.meals).time.seconds)
                .format("h:mma")
            : "-"}
        </TableCell>
      </TableRow>
    );
  }
  return <TableRow></TableRow>;
};

const mapStateToProps = state => {
  return {
    activeRoom: state.activeroom
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(StudentItem));

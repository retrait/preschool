import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import moment from "moment";
import { connect } from "react-redux";
import { findNewestRecord } from "../../utils";

const TeacherAvatar = props => {
  const { classes, teacher, activeRoom } = props;
  if (teacher) {
    const latestRecord = findNewestRecord(teacher.attendance);

    const timeStamp = teacher.attendance.length ? latestRecord.time : "";
    const time = new Date(timeStamp.seconds * 1000);

    const signInTime =
      moment(time).isSame(props.date, "date") &&
      latestRecord.roomId === activeRoom
        ? `${
            latestRecord.activityType === "in" ? "Signed In:" : "Signed Out:"
          } ${moment(time).format("h:mma")}`
        : "Not yet signed in today.";

    return (
      <ListItem
        classes={{
          root:
            latestRecord.activityType === "in" &&
            moment(time).isSame(props.date, "date")
              ? classes.itemRoot
              : classes.itemRootOut,
          gutters: classes.itemGutters
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{
            root: classes.itemTextRoot,
            secondary: classes.itemTextSecondary
          }}
          primary={`${props.teacher.firstName} ${props.teacher.lastName}`}
          secondary={signInTime}
        />
      </ListItem>
    );
  } else {
    return "";
  }
};

const mapStateToProps = state => {
  return {
    date: state.date,
    activeRoom: state.activeroom
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(TeacherAvatar));

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToilet,
  faBed,
  faUtensils,
  faUserCheck,
  faUserTimes
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import moment from "moment";
import { translateType } from "../../utils";

const RoomActivityItem = props => {
  const { classes, teacher, student, activity } = props;
  if (activity) {
    let iconPicker;
    let extraClass = "";

    if (activity.activity === "attendance") {
      iconPicker = activity.activityType === "in" ? faUserCheck : faUserTimes;
      extraClass =
        activity.activityType === "in"
          ? classes.studentArrival
          : classes.studentLeave;
    } else {
      iconPicker =
        activity.activity === "sleep"
          ? faBed
          : activity.activity === "toilet"
          ? faToilet
          : faUtensils;
      extraClass = classes.generalActivity;
    }
    return (
      <ListItem
        classes={{
          root: "activityItem",
          gutters: classes.itemGutters
        }}
      >
        <ListItemAvatar>
          <Avatar classes={{ root: extraClass }}>
            <FontAwesomeIcon icon={iconPicker} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{
            primary: "primaryText",
            secondary: "secondaryText"
          }}
          primary={`${translateType(activity)}`}
          secondary={
            teacher && student && activity.activity !== "attendance"
              ? `Recorded by ${teacher.firstName} ${teacher.lastName} for ${
                  student.firstName
                } ${student.lastName} at ${moment(
                  activity.time.seconds * 1000
                ).format("h:mma")}`
              : `${
                  activity.personType === "teacher"
                    ? `Teacher - ${teacher.firstName} ${teacher.lastName}`
                    : `Student - ${student.firstName} ${student.lastName}`
                } at ${moment(activity.time.seconds * 1000).format("h:mma")}`
          }
        />
      </ListItem>
    );
  } else {
    return "";
  }
};

const mapStateToProps = state => {
  return {
    date: state.date
  };
};

export default connect(mapStateToProps)(
  withStyles(useStyles)(RoomActivityItem)
);

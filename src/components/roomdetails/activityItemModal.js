import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToilet, faBed, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import moment from "moment";
import { translateType } from "../../utils";

const ActivityItemModal = props => {
  const { classes, activity, teacher } = props;
  if (activity) {
    return (
      <ListItem
        classes={{
          root: "activityItemInner",
          gutters: classes.itemGutters
        }}
      >
        <ListItemAvatar>
          <Avatar classes={{ root: classes.activityAvatar }}>
            <FontAwesomeIcon
              icon={
                activity.activity === "sleep"
                  ? faBed
                  : activity.activity === "toilet"
                  ? faToilet
                  : faUtensils
              }
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{
            primary: classes.activityBoxPrimary,
            secondary: classes.activityBoxSecondary
          }}
          primary={translateType(activity)}
          secondary={
            teacher
              ? `Recorded by ${teacher.firstName} ${
                  teacher.lastName
                } at ${moment(activity.time.seconds * 1000).format("h:mma")}`
              : ""
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
  withStyles(useStyles)(ActivityItemModal)
);

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import { findNewestRecord } from "../../utils";

const RoomDetailInfoBox = props => {
  const { classes, data, teachers, students } = props;
  let attendingStudents = [];
  let attendingTeachers = [];
  students.forEach(t => {
    const attending = findNewestRecord(t.attendance);
    if (attending.activityType === "in") {
      attendingStudents.push(findNewestRecord(t.attendance));
    }
  });
  teachers.forEach(t => {
    const attending = findNewestRecord(t.attendance);
    if (attending.activityType === "in") {
      attendingTeachers.push(findNewestRecord(t.attendance));
    }
  });

  return (
    <div className={classes.roomDetailInfoBox}>
      <h2>Details</h2>
      <div className={classes.detailsInner}>
        <div className={classes.detailItem}>
          <h2>
            {attendingStudents.length && attendingTeachers.length
              ? `1:${Math.round(
                  (attendingStudents.length / attendingTeachers.length +
                    Number.EPSILON) *
                    100
                ) / 100}`
              : "-"}
          </h2>
          Current Ratio
        </div>
        <div className={classes.detailItem}>
          <h2>1:{1 / data.requiredRatio}</h2>
          Required Ratio
        </div>
        <div className={classes.detailItem}>
          <h2>{attendingTeachers.length ? attendingTeachers.length : 0}</h2>
          Teachers Present
        </div>
        <div className={classes.detailItem}>
          <h2>{attendingStudents.length ? attendingStudents.length : 0}</h2>
          Students Present
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(RoomDetailInfoBox);

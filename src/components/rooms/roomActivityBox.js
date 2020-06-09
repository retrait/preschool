import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useStyles } from "./styles";
import RoomActivityItem from "./roomActivityItem";
import InputBase from "@material-ui/core/InputBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const RoomActivityBox = (props) => {
  const { classes, teachers, students, activity } = props;
  const [searchTerm, changeSearchTerm] = useState("");
  let activities;
  let filteredActivity = props.activity;
  if (activity.length > 0) {
    filteredActivity.forEach((a) => {
      if (a.activity === "attendance") {
        const person =
          a.personType === "teacher"
            ? teachers.find((t) => t.id === a.personId)
            : students.find((s) => s.id === a.personId);
        a[`${a.personType}Name`] = person;
        a[`${a.personType === "teacher" ? "student" : "teacher"}Name`] = {
          firstName: "",
          lastName: "",
        };
      } else {
        const Teacher = teachers.find((t) => t.id === a.teacherId);
        const Student = students.find((s) => s.id === a.studentId);
        a.teacherName = Teacher;
        a.studentName = Student;
      }
    });

    if (searchTerm.length > 3) {
      filteredActivity = props.activity.filter((a) =>
        a.type
          ? a.type.toLowerCase().includes(searchTerm)
          : false || a.teacherName
          ? `${a.teacherName.firstName.toLowerCase()} ${a.teacherName.lastName.toLowerCase()}`.includes(
              searchTerm
            )
          : false || a.studentName
          ? `${a.studentName.firstName.toLowerCase()} ${a.studentName.lastName.toLowerCase()}`.includes(
              searchTerm
            )
          : false
      );
    }

    activities = filteredActivity
      .sort((a, b) => (a.time > b.time ? -1 : a.time < b.time ? 1 : 0))
      .map((a, i) => {
        return (
          <RoomActivityItem
            key={i}
            activity={a}
            teacher={a.teacherName}
            student={a.studentName}
          />
        );
      });
  } else {
    activities = (
      <div className={classes.noActivities}>No Activities Today</div>
    );
  }
  return (
    <div className={classes.activityContainer}>
      <div className="searchContainer">
        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
        <InputBase
          classes={{ root: "search" }}
          placeholder="Search Activity..."
          onChange={(e) => changeSearchTerm(e.target.value.toLowerCase())}
          value={searchTerm}
        />
        {searchTerm.length ? (
          <FontAwesomeIcon
            className="cancelIcon"
            icon={faTimesCircle}
            onClick={(e) => changeSearchTerm("")}
          />
        ) : (
          ""
        )}
      </div>
      <div className="inner">
        <List>{activities}</List>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(RoomActivityBox);

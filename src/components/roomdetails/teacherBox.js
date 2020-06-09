import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useStyles } from "./styles";
import TeacherAvatar from "./teacherAvatar";

const TeacherBox = props => {
  const { classes } = props;
  return (
    <div className={classes.teacherBox}>
      <h2>Teachers</h2>
      <List className={classes.teacherAvatars}>
        {props.teachers.map((t, i) => (
          <TeacherAvatar key={i} teacher={t} />
        ))}
      </List>
    </div>
  );
};

export default withStyles(useStyles)(TeacherBox);

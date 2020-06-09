import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { findNewestRecord } from "../../utils";

import { useStyles } from "./styles";

const RoomCard = props => {
  const size = useWindowSize();
  const { classes, data, teachers, students, newCard, onClick } = props;
  let cardContent;
  let attendingStudents = [];
  let attendingTeachers = [];
  students.forEach(t => {
    const attending = findNewestRecord(t.attendance);
    if (attending.activityType === "in" && attending.roomId === data.id) {
      attendingStudents.push(findNewestRecord(t.attendance));
    }
  });
  teachers.forEach(t => {
    const attending = findNewestRecord(t.attendance);
    if (attending.activityType === "in" && attending.roomId === data.id) {
      attendingTeachers.push(findNewestRecord(t.attendance));
    }
  });
  if (newCard) {
    cardContent = (
      <div className={classes.newContainer} onClick={onClick}>
        <div>
          <div>Add New</div>
          <div className={classes.newButton}>+</div>
        </div>
      </div>
    );
  } else {
    cardContent = (
      <div>
        <Link
          to={`/rooms/${data.id}`}
          style={{ color: "#172b4d", textDecoration: "none" }}
        >
          <div className={classes.roomNumber}>
            {data.roomNumber ? data.roomNumber : "   "}
          </div>
          <div className={classes.title}>{data.name}</div>
          <div className={classes.ratioContainer}>
            <div className={classes.ratioTag}>Current Ratio</div>
            <div className={classes.innerRatioContainer}>
              <div className={classes.currentContainer}>
                <div
                  className={
                    attendingStudents.length && attendingTeachers.length
                      ? attendingStudents.length / attendingTeachers.length >=
                        data.requiredRatio
                        ? "ratio"
                        : "ratioNotMet"
                      : ""
                  }
                >
                  {attendingTeachers.length && attendingStudents.length
                    ? `1:${Math.round(
                        (attendingStudents.length / attendingTeachers.length +
                          Number.EPSILON) *
                          100
                      ) / 100}`
                    : "-"}
                </div>
              </div>
            </div>
            <div className={classes.avatars}>
              <div className={classes.teachers}>
                Teachers
                {attendingTeachers.length ? (
                  <AvatarGroup
                    classes={{ root: classes.avatarGroup }}
                    max={
                      size.width > 1600
                        ? 5
                        : size.width > 1425
                        ? 4
                        : size.width > 1250
                        ? 3
                        : size.width < 1200
                        ? 3
                        : 2
                    }
                  >
                    {attendingTeachers.map((t, i) =>
                      t ? (
                        <Avatar
                          key={i}
                          alt={t.firstName}
                          src="/static/images/avatar/1.jpg"
                        />
                      ) : (
                        ""
                      )
                    )}
                  </AvatarGroup>
                ) : (
                  <div className="noTeachers">0</div>
                )}
              </div>
              <div className={classes.students}>
                Students
                <div className={classes.studentNumber}>
                  {attendingTeachers.length}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <Grid item xs={size.width > 1200 ? 4 : 6}>
      <Paper className={classes.paper}>{cardContent}</Paper>
    </Grid>
  );
};

function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default withStyles(useStyles)(RoomCard);

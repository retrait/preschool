import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ActivityItemModal from "./activityItemModal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const StudentInfoModal = props => {
  const { classes, student, teachers } = props;
  const [modalStyle] = useState(getModalStyle);

  function getModalStyle() {
    return {
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`
    };
  }
  let activity = [];
  if (student) {
    student.meals.forEach(m => {
      activity.push(m);
    });
    student.toilet.forEach(m => {
      activity.push(m);
    });
    student.sleep.forEach(m => {
      activity.push(m);
    });
  }

  const body = activity.map((a, i) => {
    const selectedTeacher = teachers.find(t => (t.id = a.teacherId));
    return (
      <div key={i} className="activityItem">
        <ActivityItemModal key={i} activity={a} teacher={selectedTeacher} />
      </div>
    );
  });
  const noActivities = (
    <div className="noActivities">
      No activities have been recorded for this student today.
    </div>
  );

  return (
    <div>
      <Modal open={props.open} onClose={e => props.handleClose(e)}>
        <div style={modalStyle} className={classes.modalContainer}>
          <div className="header">
            <h2>
              {student.firstName} {student.lastName}
            </h2>
            <div className="studentinfoheaderbuttons">
              <FontAwesomeIcon
                onClick={e => props.handleClose(e)}
                className="closeIcon"
                icon={faTimesCircle}
              />
            </div>
          </div>

          <div className="studentActivityContainer">
            <List>
              <h3>Activity</h3>
              {activity.length ? body : noActivities}
            </List>
          </div>
          <div className="studentDetailsContainer">
            <h3>Notes</h3>
            <div className="details">
              {student.notes ? student.notes : "No Notes"}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teachers: state.teachers
  };
};

export default connect(mapStateToProps)(
  withStyles(useStyles)(StudentInfoModal)
);

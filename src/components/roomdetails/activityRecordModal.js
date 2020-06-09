import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "../../firebase";
import MenuItem from "@material-ui/core/MenuItem";
import { getActivityAction } from "../../utils";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const ActivityRecordModal = props => {
  const {
    classes,
    open,
    roomId,
    roomTeachers,
    roomStudents,
    activityIdCounter
  } = props;
  const [modalStyle] = useState(getModalStyle);
  const [activityType, changeActivityType] = useState("");
  const [activityAction, changeActivityAction] = useState("");
  const [selectedStudent, changeSelectedStudent] = useState("");
  const [selectedTeacher, changeSelectedTeacher] = useState("");
  const [notes, changeNotes] = useState("");
  const [time, changeTime] = useState(new Date());

  function getModalStyle() {
    return {
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`
    };
  }

  const handleNew = e => {
    const db = firebase.firestore();
    if (activityType === "attendance") {
      db.collection(activityType).add({
        id: activityIdCounter + 1,
        activity: activityType,
        activityType: activityAction,
        note: notes,
        roomId: roomId,
        personId: selectedStudent,
        personType: "student",
        time: time
      });
    } else {
      db.collection(activityType).add({
        id: activityIdCounter + 1,
        activity: activityType,
        type: activityAction,
        notes: notes,
        roomId: roomId,
        teacherId: selectedTeacher,
        studentId: selectedStudent,
        time: time
      });
    }
    props.handleClose(e);
  };

  return (
    <div>
      <Modal open={open} onClose={e => props.handleClose(e)}>
        <div
          style={modalStyle}
          className={`${classes.modalContainer} ${classes.activityContainerWidth}`}
        >
          <div className="header">
            <h2>Record Activity</h2>
            <FontAwesomeIcon
              onClick={e => props.handleClose(e)}
              className="closeIcon"
              icon={faTimesCircle}
            />
          </div>
          <div className="details">
            <div className="nameLine">
              <TextField
                label="Student"
                defaultValue={selectedStudent}
                select
                InputLabelProps={{ shrink: true }}
                className="width"
                onChange={e => {
                  changeSelectedStudent(e.target.value);
                }}
              >
                {roomStudents
                  ? roomStudents.map(s => (
                      <MenuItem
                        value={s.id}
                      >{`${s.firstName} ${s.lastName}`}</MenuItem>
                    ))
                  : ""}
              </TextField>
            </div>
            <div className="detailsLine">
              <TextField
                label="Teacher"
                defaultValue={selectedTeacher}
                select
                InputLabelProps={{ shrink: true }}
                className="width"
                onChange={e => {
                  changeSelectedTeacher(e.target.value);
                }}
              >
                {roomTeachers
                  ? roomTeachers.map(s => (
                      <MenuItem
                        value={s.id}
                      >{`${s.firstName} ${s.lastName}`}</MenuItem>
                    ))
                  : ""}
              </TextField>
            </div>
            <div className="detailsLine">
              <TextField
                label="Activity Type"
                defaultValue={activityType}
                select
                InputLabelProps={{ shrink: true }}
                className="width"
                onChange={e => {
                  changeActivityType(e.target.value);
                  changeActivityAction("");
                }}
              >
                <MenuItem value={"attendance"}>Attendance</MenuItem>
                <MenuItem value={"meals"}>Meals</MenuItem>
                <MenuItem value={"sleep"}>Sleep</MenuItem>
                <MenuItem value={"toilet"}>Toilet</MenuItem>
              </TextField>
            </div>
            <div className="detailsLine">
              <TextField
                className="width"
                label="Action"
                defaultValue={activityAction}
                select
                disabled={activityType === ""}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeActivityAction(e.target.value)}
              >
                {activityType !== ""
                  ? getActivityAction(activityType).map(t => (
                      <MenuItem value={t.value}>{t.label}</MenuItem>
                    ))
                  : ""}
              </TextField>
            </div>
            <div className="detailsLine">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  disableToolbar
                  variant="inline"
                  format="h:mma"
                  margin="normal"
                  label="Time"
                  value={time}
                  onChange={changeTime}
                  className="width"
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="detailsLine">
              <TextField
                className="notes"
                label="Notes"
                multiline
                rows={3}
                defaultValue={""}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="saveButtonContainer">
            <div></div>
            <Button
              classes={{ root: "saveButton" }}
              variant="contained"
              onClick={handleNew}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teachers: state.teachers,
    students: state.students,
    activeRoom: state.activeroom,
    ratioOptions: state.settings.ratios,
    activityIdCounter: state.settings.activityIdCounter
  };
};

export default connect(mapStateToProps)(
  withStyles(useStyles)(ActivityRecordModal)
);

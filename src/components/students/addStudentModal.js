import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import firebase from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const AddStudentModal = props => {
  const { classes, open, studentIdCounter } = props;
  const [modalStyle] = useState(getModalStyle);
  const [dob, handleDateChange] = useState(new Date());
  const [firstName, changeFirstName] = useState("");
  const [lastName, changeLastName] = useState("");
  const [gender, changeGender] = useState("");
  const [notes, changeNotes] = useState("");
  const [attempted, changeAttempted] = useState(false);

  const handleSave = e => {
    if (firstName && lastName && gender) {
      const db = firebase.firestore();
      db.collection("students").add({
        id: studentIdCounter + 1,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        notes: notes,
        DOB: dob
      });
      db.collection("settings")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // Build doc ref from doc.id
            db.collection("settings")
              .doc(doc.id)
              .update({
                studentIdCounter: studentIdCounter + 1
              });
          });
        });
      props.handleClose(e);
    }
  };
  function getModalStyle() {
    return {
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`
    };
  }

  return (
    <div>
      <Modal open={open} onClose={e => props.handleClose(e)}>
        <div style={modalStyle} className={classes.modalContainer}>
          <div className="header">
            <h2>Edit Student</h2>
            <FontAwesomeIcon
              onClick={e => props.handleClose(e)}
              className="closeIcon"
              icon={faTimesCircle}
            />
          </div>
          <div className="details">
            <div className="nameLine">
              <TextField
                label="First Name"
                defaultValue={firstName}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeFirstName(e.target.value)}
                className="width"
                error={attempted && !firstName ? true : false}
              />
              <TextField
                className="regular width"
                label="Last Name"
                defaultValue={lastName}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeLastName(e.target.value)}
                error={attempted && !lastName ? true : false}
              />
            </div>
            <div className="detailsLine">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date of Birth"
                  value={dob}
                  onChange={handleDateChange}
                  className="width"
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </MuiPickersUtilsProvider>
              <TextField
                label="Gender"
                select
                style={{ marginTop: "16px" }}
                className="regular width"
                InputLabelProps={{ shrink: true }}
                defaultValue={gender}
                onChange={e => changeGender(e.target.value)}
                error={attempted && !gender ? true : false}
              >
                <MenuItem value={"m"}>Male</MenuItem>
                <MenuItem value={"f"}>Female</MenuItem>
              </TextField>
            </div>
            <div className="detailsLine">
              <TextField
                className="notes"
                label="Notes"
                multiline
                rows={4}
                defaultValue={notes}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="saveButtonContainer">
            <Button
              classes={{ root: "saveButton" }}
              variant="contained"
              onClick={() => {
                changeAttempted(true);
                handleSave();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return { studentIdCounter: state.settings.studentIdCounter };
};

export default connect(mapStateToProps)(withStyles(useStyles)(AddStudentModal));

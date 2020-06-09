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

const EditStudentModal = props => {
  const { classes, open, data, studentId } = props;
  const [modalStyle] = useState(getModalStyle);
  const [dob, handleDateChange] = useState(new Date(data.DOB.seconds * 1000));
  const [firstName, changeFirstName] = useState(data.firstName);
  const [lastName, changeLastName] = useState(data.lastName);
  const [gender, changeGender] = useState(data.gender);
  const [notes, changeNotes] = useState(data.notes);

  const handleDelete = e => {
    props.handleClose();
    props.handleDeleteOpen();
  };
  const handleSave = e => {
    const db = firebase.firestore();
    db.collection("students")
      .where("id", "==", studentId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // Build doc ref from doc.id
          db.collection("students")
            .doc(doc.id)
            .update({
              firstName: firstName,
              lastName: lastName,
              gender: gender,
              notes: notes
            });
        });
      });
    props.handleClose(e);
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
              />
              <TextField
                className="regular width"
                label="Last Name"
                defaultValue={lastName}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeLastName(e.target.value)}
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
                className="regular width"
                InputLabelProps={{ shrink: true }}
                defaultValue={gender}
                onChange={e => changeGender(e.target.value)}
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
              classes={{ root: "deleteButton" }}
              variant="contained"
              onClick={e => handleDelete(e)}
            >
              Delete
            </Button>
            <Button
              classes={{ root: "saveButton" }}
              variant="contained"
              onClick={handleSave}
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
  return {};
};

export default connect(mapStateToProps)(
  withStyles(useStyles)(EditStudentModal)
);

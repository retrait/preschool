import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import firebase from "../../firebase";
import MenuItem from "@material-ui/core/MenuItem";

const NewRoomModal = props => {
  const {
    classes,
    open,
    teachers,
    students,
    roomIdCounter,
    ratioOptions
  } = props;
  const [modalStyle] = useState(getModalStyle);
  const [selectedRatio, setRatio] = useState("");

  function getModalStyle() {
    return {
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`
    };
  }

  const [teacherValue, changeTeachers] = useState([]);
  const [studentValue, changeStudents] = useState([]);
  const [roomNameValue, changeRoomName] = useState("");
  const [roomNumberValue, changeRoomNumber] = useState("");

  const handleChange = (e, v, type) => {
    let newContacts = [];
    if (v.length) {
      v.forEach(a => newContacts.push(a.id));
    }
    if (type === "teacher") {
      changeTeachers(newContacts);
    } else {
      changeStudents(newContacts);
    }
  };

  const handleSelectRatio = event => {
    setRatio(event.target.value);
  };

  const handleSave = (e, v, type) => {
    const db = firebase.firestore();
    db.collection("rooms").add({
      id: roomIdCounter + 1,
      name: roomNameValue,
      teachers: teacherValue,
      students: studentValue,
      ratio: selectedRatio,
      requiredRatio: 1 / selectedRatio,
      roomNumber: roomNumberValue,
      active: true
    });

    db.collection("settings")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // Build doc ref from doc.id
          db.collection("settings")
            .doc(doc.id)
            .update({
              roomIdCounter: roomIdCounter + 1
            });
        });
      });

    props.handleClose(e);
  };

  return (
    <div>
      <Modal open={open} onClose={e => props.handleClose(e)}>
        <div style={modalStyle} className={classes.modalContainer}>
          <div className="header">
            <h2>Add New Room</h2>
            <FontAwesomeIcon
              onClick={e => props.handleClose(e)}
              className="closeIcon"
              icon={faTimesCircle}
            />
          </div>
          <div className="newRoomContainer">
            <div className="details">
              <h3>Details</h3>
              <div className="inner">
                <div className="roomNumberLine">
                  <TextField
                    label="Room Number"
                    defaultValue={""}
                    onChange={e => changeRoomNumber(e.target.value)}
                  />
                </div>
                <div className="roomNameLine">
                  <TextField
                    classes={{ root: "name" }}
                    label="Room Name"
                    defaultValue={""}
                    onChange={e => changeRoomName(e.target.value)}
                  />
                  <TextField
                    classes={{ root: "ratio" }}
                    label="Ratio"
                    select
                    value={selectedRatio}
                    onChange={handleSelectRatio}
                  >
                    {ratioOptions.length
                      ? ratioOptions.map((r, i) => (
                          <MenuItem key={r.id} value={r.value}>
                            1:{r.value}
                          </MenuItem>
                        ))
                      : ""}
                  </TextField>
                </div>
              </div>
            </div>
            <div className="teachers">
              <h3>Teachers</h3>
              <div className="inner">
                <Autocomplete
                  multiple
                  options={teachers}
                  getOptionLabel={roomTeacher =>
                    `${roomTeacher.firstName} ${roomTeacher.lastName}`
                  }
                  defaultValue={[]}
                  filterSelectedOptions
                  renderInput={params => <TextField {...params} />}
                  onChange={(e, v) => handleChange(e, v, "teacher")}
                />
              </div>
            </div>
            <div className="teachers">
              <h3>Students</h3>
              <div className="inner">
                <Autocomplete
                  multiple
                  options={students}
                  getOptionLabel={r => `${r.firstName} ${r.lastName}`}
                  defaultValue={[]}
                  filterSelectedOptions
                  renderInput={params => <TextField {...params} />}
                  onChange={(e, v) => handleChange(e, v, "students")}
                />
              </div>
            </div>
          </div>
          <div className="saveButtonContainer">
            <Button
              classes={{ root: "saveButton" }}
              variant="contained"
              onClick={e => handleSave(e)}
              disabled={
                roomNameValue.length &&
                selectedRatio > 0 &&
                teacherValue.length > 0 &&
                studentValue.length > 0
                  ? false
                  : true
              }
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
  return {
    teachers: state.teachers,
    students: state.students,
    activeRoom: state.activeroom,
    roomIdCounter: state.settings.roomIdCounter,
    ratioOptions: state.settings.ratios
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(NewRoomModal));

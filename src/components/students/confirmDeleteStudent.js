import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import firebase from "../../firebase";

const ConfirmDeleteStudent = props => {
  const { open, classes, studentId } = props;
  const [modalStyle] = useState(getModalStyle);

  function getModalStyle() {
    return {
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`
    };
  }

  const handleDelete = e => {
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
              active: false
            });
        });
      });
    props.handleClose(e);
  };

  return (
    <div>
      <Modal open={open} onClose={e => props.handleClose(e)}>
        <div style={modalStyle} className={classes.deleteModal}>
          <div className="confirmDeleteMessage">
            You are about to delete this contact. Are you sure you want to
            continue?
          </div>

          <div className="confirmDeleteContainer">
            <Button
              classes={{ root: "deleteButton" }}
              variant="contained"
              onClick={e => handleDelete(e)}
            >
              Confirm
            </Button>
            <Button
              classes={{ root: "cancelButton" }}
              variant="contained"
              onClick={e => props.handleClose(e)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    activeRoom: state.activeroom
  };
};

export default connect(mapStateToProps)(
  withStyles(useStyles)(ConfirmDeleteStudent)
);

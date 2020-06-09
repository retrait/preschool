import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import TextField from "@material-ui/core/TextField";
import firebase from "../../firebase";

const AddContactModal = props => {
  const { classes, open, data, type, contactId, studentId } = props;
  const [modalStyle] = useState(getModalStyle);

  const contactList = data ? JSON.parse(JSON.stringify(data)) : [];

  const contact = data ? data.find(d => d.id === contactId) : {};

  const [firstName, changeFirstName] = useState(
    type === "edit" ? contact.firstName : ""
  );
  const [lastName, changeLastName] = useState(
    type === "edit" ? contact.lastName : ""
  );
  const [relationship, changeRelationship] = useState(
    type === "edit" ? contact.relationship : ""
  );
  const [phone, changePhone] = useState(type === "edit" ? contact.phone : "");
  const [email, changeEmail] = useState(type === "edit" ? contact.email : "");

  const handleAdd = e => {
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
              parent: [
                ...contactList,
                {
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  phone: phone,
                  relationship: relationship,
                  id: data ? data.length + 1 : 1
                }
              ]
            });
        });
      });
    props.handleClose(e);
  };

  const handleDelete = () => {
    props.handleClose();
    props.handleDeleteOpen(true);
  };

  const handleEdit = e => {
    contactList[contactList.findIndex(d => d.id === contactId)] = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      relationship: relationship,
      id: contactList[contactList.findIndex(d => d.id === contactId)].id
    };
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
              parent: contactList
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
            <h2>{type === "add" ? "Add Contact" : "Edit Contact"}</h2>
            <FontAwesomeIcon
              onClick={e => props.handleClose(e)}
              className="closeIcon"
              icon={faTimesCircle}
            />
          </div>
          <div className="details">
            <div className="nameLine">
              <TextField
                label="Relationship"
                defaultValue={relationship}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeRelationship(e.target.value)}
                className="relationship"
              />
            </div>
            <div className="detailsLine">
              <TextField
                InputLabelProps={{ shrink: true }}
                label="First Name"
                placeholder=" "
                defaultValue={firstName}
                onChange={e => changeFirstName(e.target.value)}
                className="width"
              />
              <TextField
                className="regular width"
                label="Last Name"
                defaultValue={lastName}
                onChange={e => changeLastName(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="detailsLine">
              <TextField
                label="Phone Number"
                defaultValue={phone}
                InputLabelProps={{ shrink: true }}
                onChange={e => changePhone(e.target.value)}
                className="width"
              />
              <TextField
                label="Email"
                defaultValue={email}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeEmail(e.target.value)}
                className="regular width"
              />
            </div>
          </div>
          <div className="saveButtonContainer">
            {type === "edit" ? (
              <Button
                classes={{ root: "saveButton" }}
                variant="contained"
                onClick={handleDelete}
              >
                Delete
              </Button>
            ) : (
              ""
            )}
            <Button
              classes={{ root: "saveButton" }}
              variant="contained"
              onClick={type === "edit" ? handleEdit : handleAdd}
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

export default connect(mapStateToProps)(withStyles(useStyles)(AddContactModal));

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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getCountryList, findCountry } from "../../utils";

const AddressModal = props => {
  const { classes, open, data, studentId } = props;
  const [modalStyle] = useState(getModalStyle);

  const [address1, changeAddress1] = useState(data.street1);
  const [address2, changeAddress2] = useState(data.street2);
  const [city, changeCity] = useState(data.city);
  const [state, changeState] = useState(data.state);
  const [code, changeCode] = useState(data.code);
  const [country, changeCountry] = useState(findCountry(data.country));
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
              "address.street1": address1,
              "address.street2": address2,
              "address.city": city,
              "address.country": country.code,
              "address.code": code,
              "address.state": state
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
            <h2>{"Edit Address"}</h2>
            <FontAwesomeIcon
              onClick={e => props.handleClose(e)}
              className="closeIcon"
              icon={faTimesCircle}
            />
          </div>
          <div className="details">
            <div className="nameLine">
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Address Line 1"
                placeholder=" "
                defaultValue={address1}
                style={{ width: 400 }}
                onChange={e => changeAddress1(e.target.value)}
                className="width"
              />
            </div>
            <div className="detailsLine">
              <TextField
                className="width"
                label="Address Line 2"
                defaultValue={address2}
                style={{ width: 400 }}
                onChange={e => changeAddress2(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="detailsLine">
              <TextField
                className="width"
                label="City"
                defaultValue={city}
                onChange={e => changeCity(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="detailsLine">
              <TextField
                className="width"
                label="State"
                defaultValue={state}
                onChange={e => changeState(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                className="regular width"
                style={{ width: 120 }}
                label="Post/Zip Code"
                defaultValue={code}
                onChange={e => changeCode(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="detailsLine">
              <Autocomplete
                className="width"
                options={getCountryList()}
                defaultValue={country}
                classes={{
                  option: classes.option
                }}
                onChange={(e, v) => changeCountry(v)}
                autoHighlight
                getOptionLabel={option => option.label}
                renderOption={option => (
                  <React.Fragment>{option.label}</React.Fragment>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Country"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </div>
          </div>
          <div className="saveButtonContainer">
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

export default connect(mapStateToProps)(withStyles(useStyles)(AddressModal));

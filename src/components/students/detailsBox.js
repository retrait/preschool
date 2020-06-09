import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhoneAlt,
  faPlus,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import AddContactModal from "../../components/students/addContactModal";
import AddressModal from "../../components/students/addressModal";
import ConfirmDeleteParent from "../../components/students/confirmDeleteParent";
import { findCountry } from "../../utils";

const DetailsBox = props => {
  const { type, data, studentId } = props;
  const [modalOpen, changeModalOpen] = useState(false);
  const [deleteOpen, handleDeleteOpen] = useState(false);
  const [modalType, changeModalType] = useState("add");
  const [contactId, changeContactId] = useState("add");
  let displayData;
  if (data) {
    if (type === "parent") {
      displayData = data.map((p, i) => (
        <div className="parent" key={i}>
          <div className="heading">
            <div>
              <h5>{`${p.relationship[0].toUpperCase()}${p.relationship.slice(
                1
              )} - ${p.firstName} ${p.lastName}`}</h5>
            </div>
            <FontAwesomeIcon
              className="editDetail"
              icon={faPencilAlt}
              onClick={e => {
                changeModalOpen(true);
                changeModalType("edit");
                changeContactId(p.id);
              }}
            />
          </div>
          <div className="detailLine">
            <FontAwesomeIcon icon={faEnvelope} /> {p.email}
          </div>
          <div className="detailLine">
            <FontAwesomeIcon icon={faPhoneAlt} /> {p.phone}
          </div>
        </div>
      ));
    } else {
      displayData = (
        <div className="address">
          <div className="heading detailLine">
            <div>{data.street1}</div>
            <FontAwesomeIcon
              className="editDetail"
              icon={faPencilAlt}
              onClick={e => {
                changeModalOpen(true);
                changeModalType("address");
              }}
            />
          </div>
          <div className="detailLine">{data.street2}</div>
          <div className="detailLine">{`${data.city} ${data.code}`}</div>
          <div className="detailLine">{data.state}</div>
          <div className="detailLine">{findCountry(data.country).label}</div>
        </div>
      );
    }
  }
  return (
    <div className="outerDetailsBox">
      <h2>
        {type === "parent" ? "Contacts" : "Address"}
        {type === "parent" ? (
          <FontAwesomeIcon
            className="detailsAdd"
            icon={faPlus}
            onClick={e => {
              changeModalOpen(true);
              changeModalType("add");
            }}
          />
        ) : (
          ""
        )}
      </h2>

      <div
        className={`innerDetailsBox ${type === "address" ? "addressBox" : ""}`}
      >
        {data ? displayData : "-"}
      </div>
      {modalOpen && modalType !== "address" ? (
        <AddContactModal
          open={modalOpen}
          handleClose={() => changeModalOpen(false)}
          handleDeleteOpen={() => handleDeleteOpen(true)}
          data={data}
          type={modalType}
          contactId={contactId}
          studentId={studentId}
        />
      ) : (
        ""
      )}
      {deleteOpen && modalType !== "address" ? (
        <ConfirmDeleteParent
          open={deleteOpen}
          handleClose={() => handleDeleteOpen(false)}
          contactId={contactId}
          studentId={studentId}
          data={data}
        />
      ) : (
        ""
      )}
      {modalOpen && modalType === "address" ? (
        <AddressModal
          open={modalOpen}
          handleClose={() => changeModalOpen(false)}
          data={data}
          type={modalType}
          studentId={studentId}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default withStyles(useStyles)(DetailsBox);

import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmDeleteStudent from "../../components/students/confirmDeleteStudent";
import {
  faCheckCircle,
  faTimesCircle,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import { findNewestRecord, translateType } from "../../utils";
import Notes from "../../components/students/notes";
import DetailsBox from "../../components/students/detailsBox";
import EditStudentModal from "../../components/students/editStudentModal";

const StudentItem = props => {
  const { data, attendance, meals, toilet, sleep, rooms } = props;
  const [isOpen, changeOpen] = useState(false);
  const [modalOpen, changeModalOpen] = useState(false);
  const [deleteOpen, handleDeleteOpen] = useState(false);
  let activity = [];
  const currentAttendance = findNewestRecord(
    // eslint-disable-next-line
    attendance.filter(c => {
      if (c.personType === "student" && c.personId === data.id) {
        return c;
      }
    })
  );
  const attendingRoom = rooms.find(a => currentAttendance.roomId === a.id);

  meals.forEach(b => {
    if (b.studentId === data.id) {
      activity.push(b);
    }
  });
  toilet.forEach(b => {
    if (b.studentId === data.id) {
      activity.push(b);
    }
  });
  sleep.forEach(b => {
    if (b.studentId === data.id) {
      activity.push(b);
    }
  });
  attendance.forEach(b => {
    if (b.personType === "student" && b.personId === data.id) {
      activity.push({
        ...b,
        id: `attendance-${b.id}`
      });
    }
  });
  const latestActivity = findNewestRecord(activity);

  return (
    <div className="studentitem">
      <ExpansionPanel classes={{ root: "studentiteminner" }} expanded={isOpen}>
        <ExpansionPanelSummary
          classes={{ root: "expansionPanelInner" }}
          expandIcon={<ExpandMoreIcon />}
          onClick={e => changeOpen(!isOpen)}
        >
          <Grid container spacing={0}>
            <Grid item xs={3} classes={{ root: "itemRootName" }}>
              <Paper
                className={"paper item"}
              >{`${data.firstName} ${data.lastName}`}</Paper>
            </Grid>
            <Grid item xs={2} classes={{ root: "itemRoot" }}>
              <Paper className={"paper item right"}>
                {data.gender ? (data.gender === "m" ? "Male" : "Female") : ""}
              </Paper>
            </Grid>
            <Grid item xs={2} classes={{ root: "itemRoot" }}>
              <Paper className={"paper item right"}>
                {data.DOB
                  ? moment(new Date(data.DOB.seconds * 1000)).format(
                      "DD MMM YYYY"
                    )
                  : ""}
              </Paper>
            </Grid>
            <Grid item xs={2} classes={{ root: "itemRoot" }}>
              <Paper className={"paper item right"}>
                {latestActivity.time ? (
                  <div>
                    <div>{translateType(latestActivity)}</div>
                    <div>
                      {latestActivity.time
                        ? moment(
                            new Date(latestActivity.time.seconds * 1000)
                          ).format("h:mma")
                        : ""}
                    </div>
                  </div>
                ) : (
                  "No Activity Today"
                )}
              </Paper>
            </Grid>
            <Grid item xs={2} classes={{ root: "itemRoot" }}>
              <Paper className={"paper item right"}>
                {attendingRoom ? attendingRoom.name : "-"}
              </Paper>
            </Grid>
            <Grid item xs={1} classes={{ root: "itemRoot" }}>
              <Paper className={"paper item right"}>
                {currentAttendance ? (
                  currentAttendance.activityType === "in" ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="presentCell"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="presentCell notPresentCell"
                    />
                  )
                ) : (
                  ""
                )}
              </Paper>
            </Grid>
          </Grid>
          <div className="editStudent">
            <FontAwesomeIcon
              icon={faPencilAlt}
              onClick={e => {
                e.stopPropagation();
                changeModalOpen(true);
              }}
            />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: "expansionPanelDetails" }}>
          <div className="studentdetails">
            <div className="studentdetailsinner">
              <Notes data={data.notes} />
            </div>
            <div className="studentdetailsinner">
              <DetailsBox
                type={"parent"}
                data={data.parent}
                studentId={data.id}
              />
              <DetailsBox
                type={"address"}
                data={data.address}
                studentId={data.id}
              />
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {modalOpen ? (
        <EditStudentModal
          open={modalOpen}
          handleClose={() => changeModalOpen(false)}
          handleDeleteOpen={() => handleDeleteOpen(true)}
          data={data}
          studentId={data.id}
        />
      ) : (
        ""
      )}
      {deleteOpen ? (
        <ConfirmDeleteStudent
          open={deleteOpen}
          handleClose={() => handleDeleteOpen(false)}
          studentId={data.id}
        />
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    students: state.students,
    meals: state.meals,
    toilet: state.toilet,
    sleep: state.sleep,
    attendance: state.attendance
  };
};

export default connect(mapStateToProps)(StudentItem);

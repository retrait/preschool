import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "../components/roomdetails/styles";
import Loading from "../loading";
import RoomDetailInfoBox from "../components/roomdetails/roomDetailInfoBox";
import TeacherBox from "../components/roomdetails/teacherBox";
import ActivityBox from "../components/roomdetails/activityBox";
import StudentsInfoBox from "../components/roomdetails/studentsInfoBox";
import RoomEditModal from "../components/roomdetails/roomEditModal";
import { bindActionCreators } from "redux";
import { setActiveRoom } from "../actions/activeroom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import ConfirmDeleteModal from "../components/roomdetails/confirmDeleteModal";
import ActivityRecordModal from "../components/roomdetails/activityRecordModal";
import Button from "@material-ui/core/Button";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";

class RoomDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deleteOpen: false,
      recordOpen: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteOpen = () => {
    this.setState({ deleteOpen: true });
  };
  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  };

  handleRecordOpen = () => {
    this.setState({ recordOpen: true });
  };
  handleRecordClose = () => {
    this.setState({ recordOpen: false });
  };

  render() {
    const { classes } = this.props;
    this.props.onRoomSelect(Number(this.props.match.params.id));
    const data = this.props.rooms
      ? this.props.rooms.find(r => r.id === Number(this.props.match.params.id))
      : {};

    if (data) {
      let teachersList = [];
      let studentsList = [];
      let activity = [];

      data.teachers.forEach(t => {
        const teacher = this.props.teachers.find(at => at.id === t);
        if (teacher) {
          teachersList.push({
            ...teacher,
            // eslint-disable-next-line
            attendance: this.props.attendance.filter(c => {
              if (c.personType === "teacher" && c.personId === t) {
                return c;
              }
            })
          });
        }
      });
      if (data.students) {
        data.students.forEach(s => {
          let student = this.props.students.find(as => as.id === s);
          studentsList.push({
            ...student,
            meals: this.props.meals.filter(m => m.studentId === s),
            toilet: this.props.toilet.filter(a => a.studentId === s),
            sleep: this.props.sleep.filter(b => b.studentId === s),
            // eslint-disable-next-line
            attendance: this.props.attendance.filter(c => {
              if (c.personType === "student" && c.personId === s) {
                return c;
              }
            })
          });
        });
      }

      this.props.meals.forEach(b => {
        if (b.roomId === data.id) {
          activity.push(b);
        }
      });
      this.props.toilet.forEach(b => {
        if (b.roomId === data.id) {
          activity.push(b);
        }
      });
      this.props.sleep.forEach(b => {
        if (b.roomId === data.id) {
          activity.push(b);
        }
      });

      this.props.attendance.forEach(b => {
        if (b.roomId === data.id) {
          activity.push({
            ...b,
            activity: "attendance",
            type: b.activityType,
            id: `attendance-${b.id}`
          });
        }
      });

      return (
        <div className={classes.outerContainer}>
          <div className={classes.innerContainer}>
            <div className={classes.header}>
              <div className="headerText">
                <h1>{data.name}</h1>
                <h2>{data.roomNumber}</h2>
              </div>
              <div>
                <Button
                  classes={{ root: "headerButton" }}
                  variant="contained"
                  startIcon={
                    <FontAwesomeIcon className="editIcon" icon={faFileImport} />
                  }
                  onClick={this.handleRecordOpen}
                >
                  Record
                </Button>
                <Button
                  classes={{ root: "headerButton" }}
                  variant="contained"
                  startIcon={
                    <FontAwesomeIcon className="editIcon" icon={faEdit} />
                  }
                  onClick={this.handleOpen}
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className={classes.detailsOuter}>
              <div className={classes.detailsLeft}>
                <RoomDetailInfoBox
                  data={data}
                  teachers={teachersList}
                  students={studentsList}
                />
                <StudentsInfoBox students={studentsList} />
              </div>
              <div className={classes.detailsRight}>
                <ActivityBox
                  activity={activity.sort((a, b) =>
                    a.time > b.time ? -1 : a.time < b.time ? 1 : 0
                  )}
                  teachers={teachersList}
                  students={studentsList}
                />
                <TeacherBox teachers={teachersList} />
              </div>
            </div>
          </div>
          {this.state.open ? (
            <RoomEditModal
              open={this.state.open}
              handleClose={this.handleClose}
              data={data}
              roomTeachers={teachersList}
              roomStudents={studentsList}
              handleDeleteOpen={this.handleDeleteOpen}
            />
          ) : (
            ""
          )}
          {this.state.recordOpen ? (
            <ActivityRecordModal
              open={this.state.recordOpen}
              handleClose={this.handleRecordClose}
              roomId={data.id}
              roomTeachers={teachersList}
              roomStudents={studentsList}
            />
          ) : (
            ""
          )}
          {this.state.deleteOpen ? (
            <ConfirmDeleteModal
              open={this.state.deleteOpen}
              handleClose={this.handleDeleteClose}
            />
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onRoomSelect: bindActionCreators(setActiveRoom, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    teachers: state.teachers,
    students: state.students,
    meals: state.meals,
    toilet: state.toilet,
    sleep: state.sleep,
    attendance: state.attendance
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(RoomDetails));

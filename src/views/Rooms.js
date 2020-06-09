import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import RoomCard from "../components/rooms/roomCard";
import NewRoomModal from "../components/rooms/newRoomModal";
import RoomActivityBox from "../components/rooms/roomActivityBox";
import { connect } from "react-redux";
import { useStyles } from "../components/rooms/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortAmountUp,
  faSortAmountDown,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      sort: "name",
      sortType: "Descending",
      anchorEl: null
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = (e, type) => {
    this.setState({ sort: type, anchorEl: null });
  };

  render() {
    const { classes, teachers, students, rooms } = this.props;

    let activity = [];

    this.props.meals.forEach(b => {
      activity.push(b);
    });
    this.props.toilet.forEach(b => {
      activity.push(b);
    });
    this.props.sleep.forEach(b => {
      activity.push(b);
    });
    this.props.attendance.forEach(b => {
      activity.push({
        ...b,
        id: `attendance-${b.id}`
      });
    });

    const sortedRooms = rooms.sort((a, b) => {
      if (this.state.sortType === "Descending") {
        return a[this.state.sort] > b[this.state.sort]
          ? -1
          : a[this.state.sort] < b[this.state.sort]
          ? 1
          : 0;
      } else {
        return a[this.state.sort] < b[this.state.sort]
          ? -1
          : a[this.state.sort] > b[this.state.sort]
          ? 1
          : 0;
      }
    });

    const displayRooms = sortedRooms.map((r, i) => {
      let teachersList = [];
      let studentsList = [];
      r.teachers.forEach(t => {
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
      if (r.students) {
        r.students.forEach(s => {
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

      return (
        <RoomCard
          key={i}
          data={r}
          teachers={teachersList}
          students={studentsList}
        />
      );
    });
    return (
      <div className={classes.room}>
        <div className={classes.outerContainer}>
          <div className={classes.innerContainer}>
            <div className="header">
              <Button
                classes={{ root: "headerButton" }}
                variant="contained"
                startIcon={
                  <FontAwesomeIcon className="sortIcon" icon={faPlus} />
                }
                onClick={this.handleOpen}
              >
                New...
              </Button>
              <div className="viewOptionsContainer">
                <Button
                  classes={{ root: "headerButton" }}
                  variant="contained"
                  startIcon={
                    <FontAwesomeIcon className="sortIcon" icon={faSort} />
                  }
                  onClick={this.handleMenuClick}
                >
                  Sort by
                </Button>
                <Menu
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    onClick={e => this.handleMenuClose(e, "id")}
                  >
                    Date Added
                  </MenuItem>
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    onClick={e => this.handleMenuClose(e, "name")}
                  >
                    Name
                  </MenuItem>
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    onClick={e => this.handleMenuClose(e, "roomNumber")}
                  >
                    Room Number
                  </MenuItem>
                </Menu>
                <Button
                  classes={{ root: "headerButton" }}
                  variant="contained"
                  startIcon={
                    <FontAwesomeIcon
                      className="sortIcon"
                      icon={
                        this.state.sortType === "Descending"
                          ? faSortAmountDown
                          : faSortAmountUp
                      }
                    />
                  }
                  onClick={e => {
                    this.state.sortType === "Descending"
                      ? this.setState({ sortType: "Ascending" })
                      : this.setState({ sortType: "Descending" });
                  }}
                >
                  {this.state.sortType}
                </Button>
              </div>
            </div>
            <Grid className={classes.root} container spacing={3}>
              {displayRooms}
            </Grid>
          </div>
          {this.state.open ? (
            <NewRoomModal
              open={this.state.open}
              handleClose={this.handleClose}
            />
          ) : (
            ""
          )}
        </div>

        <RoomActivityBox
          teachers={teachers}
          students={students}
          activity={activity}
        />
      </div>
    );
  }
}

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

export default connect(mapStateToProps)(withStyles(useStyles)(Rooms));

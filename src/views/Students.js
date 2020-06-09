import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useStyles } from "../components/students/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import StudentItem from "../components/students/studentItem";
import AddStudentModal from "../components/students/addStudentModal";
import {
  faPlus,
  faSearch,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

const Students = props => {
  const { classes, students } = props;
  const [searchTerm, changeSearchTerm] = useState("");
  const [modalOpen, changeModalOpen] = useState(false);
  const [sort, changeSort] = useState("firstName");
  const [sortType, changeSortType] = useState("A");

  const sortedStudents = students.sort((a, b) => {
    if (sortType === "Descending") {
      return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0;
    } else {
      return a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0;
    }
  });

  let filteredStudents = sortedStudents;
  if (searchTerm.length > 3) {
    filteredStudents = students.filter(a =>
      `${a.firstName.toLowerCase()} ${a.lastName.toLowerCase()}`.includes(
        searchTerm
      )
    );
  }

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <div className="header">
          <Button
            classes={{ root: "headerButton" }}
            variant="contained"
            startIcon={<FontAwesomeIcon className="sortIcon" icon={faPlus} />}
            onClick={() => changeModalOpen(true)}
          >
            New...
          </Button>
          <div className="viewOptionsContainer">
            <div className="searchContainer">
              <FontAwesomeIcon className="searchIcon" icon={faSearch} />
              <InputBase
                classes={{ root: "search" }}
                placeholder="Search Students..."
                onChange={e => changeSearchTerm(e.target.value.toLowerCase())}
                value={searchTerm}
              />
              {searchTerm.length ? (
                <FontAwesomeIcon
                  className="cancelIcon"
                  icon={faTimesCircle}
                  onClick={e => changeSearchTerm("")}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="tableheaderouter">
          <Grid container classes={{ root: "tableheaderinner" }} spacing={0}>
            <Grid item xs={3}>
              <Paper className={"paper"}>Name</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={"paper right"}>Gender</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={"paper right"}>Date of Birth</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={"paper right"}>Last Activity</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={"paper right"}>Room</Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={"paper right"}>Present</Paper>
            </Grid>
          </Grid>
        </div>
        {filteredStudents.map((s, i) => (
          <StudentItem key={i} data={s} />
        ))}
      </div>
      {modalOpen ? (
        <AddStudentModal
          open={modalOpen}
          handleClose={() => changeModalOpen(false)}
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

export default connect(mapStateToProps)(withStyles(useStyles)(Students));

import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import StudentItem from "./studentItem";
import StudentInfoModal from "./studentInfoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { sortStudents } from "../../utils";

const StudentsInfoBox = props => {
  const { classes, students } = props;

  const [open, setOpen] = useState(false);
  const [selectedStudent, setStudent] = useState({});
  const [sortByDirection, setSortDirection] = useState("asc");
  const [sortByType, setSortType] = useState("firstName");

  let sortedStudents = sortStudents(students, sortByType, sortByDirection);

  const onSort = sortType => {
    if (sortType === sortByType) {
      setSortDirection(sortByDirection === "asc" ? "desc" : "asc");
    }
    setSortType(sortType);
    sortedStudents = sortStudents(students, sortByType, sortByDirection);
  };

  const handleOpen = (e, s) => {
    setStudent(s);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.roomDetailInfoBox}>
      <h2>Students</h2>
      <TableContainer
        classes={{ root: classes.tableContainer }}
        component={Paper}
      >
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell classes={{ head: classes.tableHead }}>
                <span
                  className="tableHeadInner"
                  onClick={e => onSort("firstName")}
                >
                  Name
                  <FontAwesomeIcon
                    className="headSortIcon"
                    icon={sortByDirection === "asc" ? faArrowUp : faArrowDown}
                  />
                </span>
              </TableCell>
              <TableCell
                classes={{
                  root: classes.presentHeader,
                  head: classes.tableHead
                }}
              >
                <span
                  className="tableHeadInner"
                  onClick={e => onSort("attendance")}
                >
                  Present
                  <FontAwesomeIcon
                    className="headSortIcon"
                    icon={sortByDirection === "asc" ? faArrowUp : faArrowDown}
                  />
                </span>
              </TableCell>
              <TableCell classes={{ head: classes.tableHead }} align="right">
                <span
                  className="tableHeadInner"
                  onClick={e => onSort("toilet")}
                >
                  Toilet
                  <FontAwesomeIcon
                    className="headSortIcon"
                    icon={sortByDirection === "asc" ? faArrowUp : faArrowDown}
                  />
                </span>
              </TableCell>
              <TableCell classes={{ head: classes.tableHead }} align="right">
                <span className="tableHeadInner" onClick={e => onSort("sleep")}>
                  Sleep
                  <FontAwesomeIcon
                    className="headSortIcon"
                    icon={sortByDirection === "asc" ? faArrowUp : faArrowDown}
                  />
                </span>
              </TableCell>
              <TableCell classes={{ head: classes.tableHead }} align="right">
                <span className="tableHeadInner" onClick={e => onSort("meals")}>
                  Meals
                  <FontAwesomeIcon
                    className="headSortIcon"
                    icon={sortByDirection === "asc" ? faArrowUp : faArrowDown}
                  />
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StudentItem students={students} />
            {sortedStudents.map((s, i) => (
              <StudentItem key={i} s={s} onClick={e => handleOpen(e, s)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open ? (
        <div>
          <StudentInfoModal
            open={open}
            handleClose={handleClose}
            student={selectedStudent}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withStyles(useStyles)(StudentsInfoBox);

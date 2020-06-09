import React, { Component } from "react";
import Routes from "./routes";
import NavBar from "./components/navbar";
import firebase from "./firebase";
import Login from "./views/Login";
import { loginchecker, fetchSettings } from "./actions/login";
import { getDate } from "./actions/date";
import { saveRooms } from "./actions/rooms";
import { saveTeachers } from "./actions/teachers";
import { saveStudents } from "./actions/students";
import {
  saveMealsToday,
  saveToiletToday,
  saveSleepToday,
  saveAttendance
} from "./actions/activity";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Loading from "./loading";
import moment from "moment";

const useStyles = () => ({
  apploading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh"
  }
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.onLogin(true);
        this.setState({ auth: true });
        if (this.state.auth) {
          const db = firebase.firestore();
          const roomRef = db.collection("rooms");
          const teacherRef = db.collection("teachers");
          const studentRef = db.collection("students");
          const mealsRef = db.collection("meals");
          const toiletRef = db.collection("toilet");
          const sleepRef = db.collection("sleep");
          const attendanceRef = db.collection("attendance");
          const settingsRef = db.collection("settings");

          this.props.onGetDate(moment().format());

          roomRef.where("active", "==", true).onSnapshot(snapshot => {
            let rooms = [];
            snapshot.forEach(c => {
              rooms.push(c.data());
            });
            this.props.onFetchRooms(rooms);
          });
          teacherRef.onSnapshot(snapshot => {
            let teachers = [];
            snapshot.forEach(c => {
              teachers.push(c.data());
            });
            this.props.onFetchTeachers(teachers);
          });
          studentRef.where("active", "==", true).onSnapshot(snapshot => {
            let students = [];
            snapshot.forEach(c => {
              students.push(c.data());
            });
            this.props.onFetchStudents(students);
          });
          settingsRef.onSnapshot(snapshot => {
            let settings = [];
            snapshot.forEach(c => {
              settings.push(c.data());
            });
            this.props.onFetchSettings(settings[0]);
          });

          const startOfDay = new Date(moment().startOf("day"));
          const endOfDay = new Date(moment().endOf("day"));

          mealsRef
            .where("time", ">=", startOfDay)
            .where("time", "<=", endOfDay)
            .onSnapshot(snapshot => {
              let meals = [];
              snapshot.forEach(m => {
                const activityTime = new Date(m.data().time.seconds * 1000);
                if (moment(activityTime).isSame(moment().format(), "day")) {
                  meals.push(m.data());
                }
              });
              this.props.onFetchMeals(meals);
            });
          toiletRef
            .where("time", ">=", startOfDay)
            .where("time", "<=", endOfDay)
            .onSnapshot(snapshot => {
              let toilet = [];
              snapshot.forEach(t => {
                toilet.push(t.data());
              });
              this.props.onFetchToilet(toilet);
            });
          sleepRef
            .where("time", ">=", startOfDay)
            .where("time", "<=", endOfDay)
            .onSnapshot(snapshot => {
              let sleep = [];
              snapshot.forEach(t => {
                sleep.push(t.data());
              });
              this.props.onFetchSleep(sleep);
            });
          attendanceRef
            .where("time", ">=", startOfDay)
            .where("time", "<=", endOfDay)
            .onSnapshot(snapshot => {
              let attendance = [];
              snapshot.forEach(t => {
                attendance.push(t.data());
              });
              this.props.onFetchAttendance(attendance);
            });
        }
      } else {
        this.props.onLogin(false);
        this.setState({ auth: true });
      }
    });
  }

  render() {
    if (this.state.auth === true) {
      if (this.props.loggedIn) {
        return (
          <div>
            <NavBar />
            <Routes />
          </div>
        );
      } else {
        return (
          <div>
            {this.props.loggedIn}
            <Login />
          </div>
        );
      }
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.login,
    teachers: state.teachers,
    students: state.students,
    meals: state.meals,
    toilet: state.toilet,
    sleep: state.sleep,
    attendance: state.attendance
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogin: bindActionCreators(loginchecker, dispatch),
    onFetchRooms: bindActionCreators(saveRooms, dispatch),
    onFetchTeachers: bindActionCreators(saveTeachers, dispatch),
    onFetchStudents: bindActionCreators(saveStudents, dispatch),
    onGetDate: bindActionCreators(getDate, dispatch),
    onFetchMeals: bindActionCreators(saveMealsToday, dispatch),
    onFetchToilet: bindActionCreators(saveToiletToday, dispatch),
    onFetchSleep: bindActionCreators(saveSleepToday, dispatch),
    onFetchAttendance: bindActionCreators(saveAttendance, dispatch),
    onFetchSettings: bindActionCreators(fetchSettings, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(App));

import { combineReducers } from "redux";
import rooms from "./rooms";
import login from "./login";
import teachers from "./teachers";
import students from "./students";
import activeroom from "./activeroom";
import date from "./date";
import meals from "./meals";
import toilet from "./toilet";
import sleep from "./sleep";
import attendance from "./attendance";
import settings from "./settings";

export default combineReducers({
  rooms,
  login,
  teachers,
  students,
  activeroom,
  date,
  meals,
  toilet,
  sleep,
  attendance,
  settings
});

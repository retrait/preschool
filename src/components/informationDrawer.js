import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import StudentCard from "./rooms/childrenCard";
import "../views/styles/Rooms.css";

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    display: "inline-block",
    "& > *": {
      margin: theme.spacing(1),
      textAlign: "center"
    }
  },
  small: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    textAlign: "center"
  },
  centre: {
    display: "inline-block"
  }
}));

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          Full Name: {props.Child.Firstname} {props.Child.Lastname}
        </ListItem>
        <ListItem>Age: {props.Child.Age}</ListItem>
        <ListItem>Sex: {props.Child.Sex}</ListItem>
        <ListItem>Allergies: {props.Child.FoodAllergies}</ListItem>
        <ListItem>Food Preferences: {props.Child.FoodPreferences}</ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          Emergency Contact: {props.Child.Parent1Firstname}{" "}
          {props.Child.Parent1Lastname}
        </ListItem>
        <ListItem>
          Relationship to {props.Child.Firstname}:{" "}
          {props.Child.Parent1Relationship}
        </ListItem>
        <ListItem>Phone: {props.Child.Parent1Contact}</ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("bottom", true)}>
        <StudentCard Child={props.Child} />
      </Button>
      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
      >
        {fullList("bottom")}
      </Drawer>
    </div>
  );
}

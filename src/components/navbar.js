import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ImageAvatar from "./navbar/avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { loginchecker } from "../actions/login";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "../firebase";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0
  },
  title: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  appbar: {
    backgroundColor: "white"
  },
  navbutton: {
    textTransform: "none"
  }
}));

const NavBar = props => {
  const classes = useStyles();
  const navBar = [
    { title: "Rooms", path: "/rooms" },
    { title: "Students", path: "/students" },
    { title: "Reports", path: "/reports" },
    { title: "Settings", path: "/settings" }
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutFirebase = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.onLogin(false);
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  return (
    <div className={classes.root}>
      <AppBar
        classes={{ root: classes.appbar }}
        elevation={2}
        position="static"
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}></Typography>

          {navBar.map(b => (
            <Link style={{ textDecoration: "none" }} to={b.path} key={b.title}>
              <Button key={b.title} classes={{ root: classes.navbutton }}>
                {b.title}
              </Button>
            </Link>
          ))}
          <ImageAvatar onClick={handleClick} />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={signOutFirebase}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.login
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogin: bindActionCreators(loginchecker, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

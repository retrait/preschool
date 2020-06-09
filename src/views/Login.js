import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "../firebase";
import { loginchecker } from "../actions/login";
import { bindActionCreators } from "redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  outerContainer: {
    marginTop: "15vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loginContainer: {
    padding: 40,
    transition: "boxShadow, backgroundColor, padding 100ms",
    boxShadow: "0 15px 30px 0 rgba(0,47,107,0.1)"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  loadingOuter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 15
  },
  error: {
    marginTop: 10
  }
}));

const SignIn = props => {
  const classes = useStyles();
  const [email, changeemail] = useState("");
  const [password, changepassword] = useState("");
  const [AuthFailed, AuthAttempt] = useState(false);
  const [loading, loadingState] = useState(false);
  const executeSignIn = (email, password) => {
    AuthAttempt(false);
    loadingState(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(e => {
        loadingState(false);
        AuthAttempt(true);
      });
  };
  const onEnter = event => {
    if (event.key === "Enter") {
      executeSignIn(email, password);
    }
  };

  const signInButton = (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={e => executeSignIn(email, password)}
    >
      Sign In
    </Button>
  );

  const loginFailedAlert = (
    <div className={classes.error}>
      <Alert severity="error">
        Your email address or password was incorrect.
      </Alert>
    </div>
  );

  const loadingCircle = (
    <div className={classes.loadingOuter}>
      <CircularProgress />
    </div>
  );

  return (
    <div className={classes.outerContainer}>
      <div className={classes.loginContainer}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {AuthFailed ? loginFailedAlert : ""}
            <div className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => changeemail(e.target.value)}
                onKeyPress={e => onEnter(e)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={e => changepassword(e.target.value)}
                onKeyPress={e => onEnter(e)}
                autoComplete="current-password"
              />
              {loading ? loadingCircle : signInButton}

              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </div>
          </div>
        </Container>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import PieChart from "./pieChart";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 160
  },

  pieChart: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 280
  },

  student: {
    margin: 2,
    minHeight: 20,
    width: 18
  },

  teacher: {
    maxWidth: 80,
    border: "2px solid #59e389",
    borderRadius: 6,
    padding: 5,
    margin: 2,
    backgroundColor: "#59e389"
  },

  badRatio: {
    border: "2px solid #ff6363",
    backgroundColor: "#ff6363"
  },

  container: {
    margin: 0
  }
}));

export default function DashItem() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container classes={{ root: classes.container }} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.pieChart}>
              <PieChart></PieChart>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

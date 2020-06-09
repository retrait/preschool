import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ImageAvatar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={props.onClick}>
      <Avatar alt="R" src="/static/images/avatar/1.jpg" />
    </div>
  );
};

export default ImageAvatar;

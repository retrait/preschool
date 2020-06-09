export const useStyles = theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: 200,
    maxWidth: 400,
    transition: "boxShadow, backgroundColor, padding 100ms",
    boxShadow: "0 10px 10px 0 rgba(0,47,107,0.1)",
    borderRadius: 5,
    color: "#172b4d",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0 15px 30px 0 rgba(0,47,107,0.1)"
    }
  },
  roomNumber: { fontSize: 12, opacity: "70%", height: 12 },
  title: {
    fontSize: 20,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  ratioContainer: {
    marginTop: 10,
    padding: 5
  },
  currentContainer: {
    fontSize: 48,
    marginTop: -12,
    marginBottom: 8,
    "& .ratio": {
      color: "#15c39a"
    },
    "& .ratioNotMet": {
      color: "#ff5151"
    }
  },
  targetContainer: {
    fontSize: 20,
    marginLeft: 150,
    marginTop: 5
  },
  innerRatioContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "#bdbdbd 1px solid"
  },
  ratioTag: {
    fontSize: 12
  },
  avatars: {
    marginTop: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "left"
  },
  teachers: {
    fontSize: 12,
    width: "73%",
    borderRight: "#bdbdbd 1px solid",
    textAlign: "left",
    "& .noTeachers": {
      fontSize: 36,
      display: "flex",
      marginLeft: 5
    }
  },
  students: {
    fontSize: 12,
    textAlign: "left",
    marginLeft: 10,
    width: "27%"
  },
  avatarGroup: {
    marginTop: 2,
    marginLeft: 6
  },
  studentNumber: {
    fontSize: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  room: {
    display: "flex",
    justifyContent: "space-between",
    minWidth: 1024
  },
  activityContainer: {
    width: "370px",
    paddingTop: 5,
    backgroundColor: "white",

    "& .inner": { height: "calc(100vh - 102px)", overflow: "auto" },
    "& .searchContainer": {
      display: "flex",
      width: 320,
      marginLeft: 15,
      marginRight: 15,
      borderBottom: "solid #bbbaba 0.5px"
    },
    "& .searchIcon": {
      opacity: "40%",
      marginTop: 8,
      marginRight: 8
    },
    "& .cancelIcon": {
      opacity: "40%",
      marginTop: 8,
      marginRight: 8,
      "&:hover": {
        cursor: "pointer"
      }
    },
    "& .search": {
      width: "100%",
      fontSize: 14
    },
    "& .activityItem": {
      width: "auto",
      borderRadius: 10,
      margin: 15,
      marginTop: 5,
      marginBottom: 5,
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: "#f8f8f8",
      minHeight: 65,
      "& .primaryText": { fontSize: 14 },
      "& .secondaryText": {
        fontSize: 12
      }
    }
  },
  studentArrival: {
    backgroundColor: "#99e2d1 !important"
  },
  studentLeave: { backgroundColor: "#fc9a9a !important" },
  generalActivity: { backgroundColor: "#95c7e0 !important" },
  outerContainer: {
    width: "100%",
    margin: 25,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto"
  },
  innerContainer: {
    paddingLeft: 25,
    paddingRight: 45,
    paddingTop: 0,
    width: 1150,
    minWidth: 500,
    height: "calc(100vh - 124px)",
    "& .header": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 15,
      "& .add": {
        backgroundColor: "#15c39a !important"
      },
      "& .headerButton": {
        backgroundColor: "#57a8d1",
        color: "white",
        padding: "3px 12px",
        textTransform: "none",
        marginRight: 3,
        "& .sortIcon": {
          fontSize: 14
        }
      },
      "& .viewOptionsContainer": {
        display: "flex",
        justifyContent: "flex-end"
      }
    }
  },
  menuItem: {
    fontSize: 14,
    paddingTop: 3
  },
  root: {
    flexGrow: 1
  },
  newContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  newButton: {
    marginTop: 10,
    border: "#e0e0e0 0.5px solid",
    borderRadius: 10,
    width: 90,
    height: 60,
    fontSize: 48,
    fontWeight: 200,
    color: "white",
    backgroundColor: "#e0e0e0",
    "&:hover": {
      color: "#e0e0e0",
      backgroundColor: "white"
    }
  },
  noActivities: {
    backgroundColor: "white",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    borderRadius: 5,
    marginBottom: 5
  },
  modalContainer: {
    position: "absolute",
    borderRadius: 10,
    width: 600,
    minHeight: 300,
    maxHeight: 800,
    backgroundColor: "white",
    padding: theme.spacing(1, 3, 2),
    outline: "none",
    "& .saveButton": {
      textTransform: "none"
    },
    "& .header": {
      display: "flex",
      justifyContent: "space-between",

      "& .closeIcon": {
        marginBlockStart: "0.83em",
        marginBlockEnd: "0.83em",
        fontSize: "1.5em",
        opacity: "70%",
        "&:hover": {
          cursor: "pointer",
          opacity: "90%"
        }
      }
    },
    "& h3": {
      marginBlockStart: "4px",
      marginBlockEnd: "8px"
    },
    "& .saveButtonContainer": {
      marginTop: 10,
      display: "flex",
      justifyContent: "space-between"
    },
    "& .newRoomContainer": {
      "& .details": {
        backgroundColor: "#f8f8f8",
        paddingTop: 10,
        borderRadius: 10,
        padding: 15,
        marginBottom: 5,
        "& .inner": {
          backgroundColor: "white",
          borderRadius: 10,
          padding: 15,
          paddingTop: 5,

          "& .roomNumberLine": {
            width: "100%"
          },
          "& .roomNameLine": {
            marginTop: 5,
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
          },
          "& .name": {
            width: "50%"
          },
          "& .ratio": {
            width: "20%"
          }
        }
      },
      "& .teachers": {
        backgroundColor: "#f8f8f8",
        paddingTop: 10,
        borderRadius: 10,
        padding: 15,
        marginBottom: 5,
        "& .inner": {
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          "& .plusIcon": {
            fontSize: 20,
            marginLeft: 2,
            marginTop: 8,
            color: "#b1b1b1"
          },
          "& .item": {
            margin: 2
          }
        }
      }
    }
  }
});

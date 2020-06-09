export const useStyles = theme => ({
  paper: {
    width: 50,
    color: "#172b4d"
  },
  outerContainer: {
    margin: 25,
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  innerContainer: {
    minWidth: 900,
    width: 1270,
    minHeight: "calc(100vh - 110px)",
    maxHeight: "calc(100vh - 110px)",
    backgroundColor: "white",
    transition: "boxShadow, backgroundColor, padding 100ms",
    boxShadow: "0 5px 5px 0 rgba(0,47,107,0.1)"
  },
  detailsLeft: {
    width: "70%",
    padding: 25,
    paddingRight: 15,
    paddingTop: 0
  },
  detailsRight: {
    width: "30%",
    padding: 10,
    paddingRight: 25,
    paddingTop: 0
  },
  detailsOuter: {
    display: "flex",
    height: "100%"
  },

  teacherBox: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 0,
    borderRadius: 5,
    marginBottom: 15,
    transition: "boxShadow, backgroundColor, padding 100ms",
    boxShadow: "0 3px 3px 0 rgba(0,47,107,0.1)",
    "& h2": {
      fontSize: 18,
      marginBlockStart: "4px",
      marginBlockEnd: "4px"
    }
  },
  roomDetailInfoBox: {
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginBottom: 15,
    paddingTop: 10,
    padding: 15,
    transition: "boxShadow, backgroundColor, padding 100ms",
    boxShadow: "0 3px 3px 0 rgba(0,47,107,0.1)",
    "& h2": {
      fontSize: 18,
      marginBlockStart: "4px",
      marginBlockEnd: "4px"
    }
  },
  detailsInner: {
    marginTop: 8,
    display: "flex",
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 12,
    height: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  detailItem: {
    textAlign: "center",
    width: 100,
    padding: 10,
    "& h2": {
      fontSize: 24,
      fontWeight: 400,
      marginBlockStart: "4px",
      marginBlockEnd: "4px"
    }
  },
  header: {
    paddingLeft: 25,
    paddingRight: 25,
    display: "flex",
    justifyContent: "space-between",
    "& .headerButton": {
      fontSize: "0.875rem",
      height: 30,
      marginTop: 35,
      // padding: "3px 12px",
      backgroundColor: "#57a8d1",
      color: "white",
      padding: "3px 12px",
      textTransform: "none",
      marginRight: 3,
      "& .sortIcon": {
        fontSize: 14
      }
    },
    "& .headerText": {
      marginTop: 20,
      "& h2": {
        fontSize: "1.2em",
        opacity: "40%",
        marginBlockStart: 0
      },
      "& h1": {
        marginBlockStart: 0,
        marginBlockEnd: 0
      }
    },

    "& .editIcon": {
      "&:hover": {
        opacity: "90%",
        cursor: "pointer"
      }
    }
  },
  root: {
    flexGrow: 1,
    color: "#172b4d"
  },
  item: {
    padding: "4px !important"
  },
  itemGutters: {
    padding: 0
  },
  itemRoot: {
    backgroundColor: "#15c39a",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    marginBottom: 5
  },
  itemRootOut: {
    backgroundColor: "#fe6060",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    marginBottom: 5
  },
  itemTextRoot: { color: "white" },
  itemTextSecondary: {
    color: "white",
    fontSize: 12
  },
  studentItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  studentHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 68
  },
  tableHead: {
    "& .tableHeadInner": {
      fontWeight: 600,
      "&:hover": {
        cursor: "pointer",
        "& .headSortIcon": {
          visibility: "visible"
        }
      },
      "& .headSortIcon": {
        visibility: "hidden",
        fontWeight: 400,
        marginLeft: 3
      }
    }
  },
  activityItem: {
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    padding: 3,
    borderRadius: 5,
    marginBottom: 5
  },
  noActivities: {
    backgroundColor: "white",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    borderRadius: 5,
    marginBottom: 5
  },
  activityBoxPrimary: {
    fontSize: 14
  },
  activityBoxSecondary: {
    fontSize: 12
  },
  innerActivityBox: {
    maxHeight: 400,
    overflow: "auto"
  },
  outerActivityBox: {
    maxHeight: 450,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 15,
    transition: "boxShadow, backgroundColor, padding 100ms",
    boxShadow: "0 3px 3px 0 rgba(0,47,107,0.1)",
    "& h2": {
      fontSize: 18,
      marginBlockStart: "4px",
      marginBlockEnd: "4px"
    },
    "& .searchContainer": {
      display: "flex",
      marginBlockEnd: 5,
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
    }
  },
  muiListPadding: {
    paddingBottom: 0
  },
  presentHeader: {
    textAlign: "center"
  },
  nameCell: { fontSize: 14 },
  presentCell: {
    color: "#15c39a",
    fontSize: 22,
    textAlign: "center"
  },
  notPresentCell: {
    color: "#fe6060",
    fontSize: 22,
    textAlign: "center"
  },
  tableContainer: {
    marginTop: 8,
    boxShadow: "none",
    color: "#172b4d"
  },
  activityContainerWidth: {
    width: 300,
    minWidth: "0px !important"
  },
  modalContainer: {
    position: "absolute",
    borderRadius: 5,
    minWidth: 500,
    backgroundColor: "white",
    padding: theme.spacing(1, 3, 2),
    outline: "none",
    "& .studentinfoheaderbuttons": {
      display: "flex",
      alignItems: "center",
      "& .headerButton": {
        fontSize: "0.875rem",
        height: 30,
        backgroundColor: "#57a8d1",
        color: "white",
        padding: "3px 12px",
        textTransform: "none",
        marginRight: 10,
        "& .sortIcon": {
          fontSize: 14
        }
      }
    },
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
      justifyContent: "space-between",
      "& .deleteButton": {
        backgroundColor: "#fe6060",
        color: "white",
        textTransform: "none"
      }
    },
    "& .confirmDeleteMessage": {
      marginTop: 16,
      marginBottom: 16,
      fontSize: 12
    },
    "& .confirmDeleteContainer": {
      marginTop: 10,
      display: "flex",
      justifyContent: "flex-end",
      "& .deleteButton": {
        backgroundColor: "#fe6060",
        color: "white",
        textTransform: "none",
        marginRight: 8
      },
      "& .cancelButton": {
        textTransform: "none"
      }
    },
    "& .details": {
      "& .nameLine": {
        "& .width": { width: 300 },
        "& .regular": { marginLeft: 25 },
        marginTop: 10,
        display: "flex"
      },
      "& .detailsLine": {
        "& .width": { width: 300 },
        "& .notes": {
          width: "100%"
        },
        "& .relationship": {
          width: 200
        },
        "& .regular": { marginLeft: 25 },
        marginTop: 25,
        width: "100%",
        display: "flex"
      }
    },
    "& .editRoomContainer": {
      width: 600,
      minHeight: 300,
      maxHeight: 800,
      "& .details": {
        backgroundColor: "#f8f8f8",
        paddingTop: 10,
        borderRadius: 5,
        padding: 15,
        marginBottom: 5,
        "& .inner": {
          backgroundColor: "white",
          borderRadius: 5,
          padding: 15,
          paddingTop: 10,
          paddingBottom: 20,
          "& .roomNumberLine": {
            width: "100%"
          },
          "& .roomNameLine": {
            marginTop: 10,
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
        borderRadius: 5,
        padding: 15,
        marginBottom: 5,
        "& .inner": {
          backgroundColor: "white",
          borderRadius: 5,
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
    },
    "& .studentDetailsContainer": {
      backgroundColor: "#f8f8f8",
      fontSize: 12,
      height: 100,
      maxHeight: 100,
      transition: "boxShadow, backgroundColor, padding 100ms",
      boxShadow: "0 3px 3px 0 rgba(0,47,107,0.1)",
      borderRadius: 5,
      padding: 15,
      paddingTop: 10,
      marginBottom: 10,
      "& .details": {
        padding: 10,
        borderRadius: 5,
        height: "calc(100% - 50px)",
        backgroundColor: "white",
        overflow: "auto"
      }
    },
    "& .studentActivityContainer": {
      backgroundColor: "#f8f8f8",
      fontSize: 12,
      maxHeight: 600,
      transition: "boxShadow, backgroundColor, padding 100ms",
      boxShadow: "0 3px 3px 0 rgba(0,47,107,0.1)",
      borderRadius: 5,
      padding: 10,
      paddingTop: 5,
      paddingBottom: 0,
      marginBottom: 10,
      "& .activityItem": {
        padding: 5,
        borderRadius: 5,
        height: "calc(100% - 50px)",
        backgroundColor: "white",
        marginBottom: 5,
        "& .activityItemInner": {
          backgroundColor: "white",
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5
        }
      },
      "& .noActivities": {
        padding: 10,
        borderRadius: 5,
        height: "calc(100% - 50px)",
        backgroundColor: "white"
      }
    }
  },
  tableRow: {
    color: "#172b4d",
    "&:hover": {
      cursor: "pointer"
      // outline: "1px solid black;"
    }
  },
  studentArrival: {
    backgroundColor: "#99e2d1 !important"
  },
  studentLeave: { backgroundColor: "#fc9a9a !important" },
  generalActivity: { backgroundColor: "#95c7e0 !important" }
});

export const useStyles = theme => ({
  outerContainer: {
    margin: 25,

    marginBottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto"
  },
  innerContainer: {
    paddingTop: 0,
    width: 1150,
    minWidth: 1000,
    height: "calc(100vh - 124px)",
    "& .paper": {
      padding: 8,
      paddingTop: 16,
      paddingBottom: 16,
      boxShadow: "none",
      "& .presentCell": {
        color: "#15c39a",
        fontSize: 22
      },
      "& .notPresentCell": {
        color: "#fe6060"
      }
    },
    "& .item": {
      padding: 8
    },
    "& .right": {
      textAlign: "right"
    },
    "& .tableheaderouter": {
      backgroundColor: "white",
      paddingLeft: 15,
      paddingRight: 72
    },
    "& .tableheaderinner": { fontWeight: 600, fontSize: "0.875rem" },
    "& .studentitem": {
      fontSize: 14,
      marginTop: 10,
      "& .studentiteminner": {
        boxShadow: "0 3px 3px 0 rgba(0,47,107,0.1)"
      },
      "& .expansionPanelDetails": {},
      "& .studentdetails": {
        padding: 14,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        width: "100%",
        backgroundColor: "#f8f8f8",
        "& .studentdetailsinner": {
          display: "flex",
          justifyContent: "space-between",
          "& .addressBox": {
            paddingRight: "0px !important"
          },
          "& .outerDetailsBox": {
            width: "50%",
            minWidth: 100,
            "& .innerDetailsBox": {
              borderRadius: 5,
              padding: 5,
              paddingLeft: 0,
              paddingRight: 20,
              minHeight: 20,
              // backgroundColor: "white",
              "& .parent": {
                backgroundColor: "white",
                marginBottom: 8,
                padding: 16,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 5,
                "& h5": {
                  fontSize: 14,
                  marginBlockEnd: "0px",
                  marginBlockStart: "0px"
                },
                "& .detailLine": {
                  marginTop: 2,
                  marginBottom: 2
                },
                "& .heading": {
                  display: "flex",
                  justifyContent: "space-between",
                  "& .editDetail": {
                    opacity: "40%",
                    cursor: "pointer",
                    "&:hover": {
                      opacity: "70%"
                    }
                  }
                }
              },
              "& .address": {
                backgroundColor: "white",
                marginBottom: 8,
                padding: 16,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 5,

                "& .detailLine": {
                  marginTop: 2,
                  marginBottom: 2
                },
                "& .heading": {
                  display: "flex",
                  justifyContent: "space-between",
                  "& .editDetail": {
                    opacity: "40%",
                    cursor: "pointer",
                    "&:hover": {
                      opacity: "70%"
                    }
                  }
                }
              }
            },
            "& .address": {},
            "& h2": {
              fontSize: 14,
              marginBlockStart: "4px",
              marginBlockEnd: "4px"
            },
            "& .detailsAdd": {
              opacity: "50%",
              marginLeft: 5,
              cursor: "pointer"
            }
          }
        }
      },
      "& .itemRoot": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end"
      },
      "& .itemRootName": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
      },
      "& .expansionPanelInner": {
        // minHeight: 40
        "& .editStudent": {
          visibility: "hidden",
          marginLeft: 10,
          display: "flex",
          alignItems: "center",
          "&:hover": { opacity: "75%" }
        },
        "&:hover": {
          "& .editStudent": {
            visibility: "visible",
            opacity: "40%"
          }
        }
      }
    },
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
        justifyContent: "flex-end",
        "& .searchContainer": {
          display: "flex",
          width: 320,
          marginLeft: 15,
          marginRight: 15,
          borderBottom: "solid #bbbaba 0.5px",
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
        }
      }
    }
  },
  outerNotesBox: {
    marginTop: 5,
    marginBottom: 15,
    width: "100%",
    minWidth: 100,
    "& .innerNotesBox": {
      marginTop: 5,
      borderRadius: 5,
      padding: 8,
      paddingLeft: 8,
      paddingRight: 16,
      minHeight: 20,
      backgroundColor: "white"
    },
    "& h2": {
      fontSize: 14,
      marginBlockStart: "4px",
      marginBlockEnd: "4px"
    }
  },
  modalContainer: {
    position: "absolute",
    borderRadius: 10,
    // width: 500,
    minHeight: 300,
    maxHeight: 800,
    backgroundColor: "white",
    padding: "8px 36px 36px",
    outline: "none",
    "& .details": {
      marginBottom: 30,

      "& .width": { width: 250 },
      "& .widthAdd": { width: 250 },
      "& .nameLine": {
        "& .regular": { marginLeft: 25 },
        marginTop: 10,
        width: "100%",
        display: "flex"
      },
      "& .detailsLine": {
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
    }
  },
  deleteModal: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "white",
    padding: "8px 36px 36px",
    outline: "none",
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
    }
  }
});

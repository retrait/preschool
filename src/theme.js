import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Noto Sans", "Roboto"].join(",")
  },
  palette: {
    text: {
      primary: "#172b4d"
    }
  }
});

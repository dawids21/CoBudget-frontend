import { createTheme } from "@mui/material";
import { green, pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: green[800],
    },
    secondary: {
      main: pink[900],
    },
    error: {
      main: "#ff5252",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#ffc107",
    },
  },
});

export default theme;

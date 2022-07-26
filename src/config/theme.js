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
    white: {
      main: "#ffffff",
    },
    black: {
      main: "#000000",
    },
  },
});

export default theme;

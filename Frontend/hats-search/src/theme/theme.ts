import { createTheme } from "@mui/material";
import { teal } from "@mui/material/colors";

const themeOptions = createTheme({
  palette: {
    primary: {
      main: teal[500],
      "100": "#f5f5f5",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Source Sans Pro",
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.90rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFilledInput-input": {
            marginBottom: "0.5rem",
          },
          "& .MuiInputBase-root": {
            backgroundColor: "#fafafa",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            borderBottomColor: teal[500],
          },
          "& .MuiInputBase-root:hover": {
            backgroundColor: teal[50],
          },
          "& .MuiFilledInput-underline:before": {
            borderRadius: "0 0 0.25rem 0.25rem",
            borderBottomColor: "#CED0D7",
          },
          "& .MuiFilledInput-underline:after": {
            borderRadius: "0 0 0.25rem 0.25rem",
            borderBottomColor: "#CED0D7",
          },
        },
      },
    },
  },
});

export default themeOptions;

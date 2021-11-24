import { createTheme } from "@mui/material";

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#4467c9",
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
    MuiInputBase: {
      styleOverrides: {
        root: {},
      },
    },
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
          "& .MuiInputBase-root": {
            backgroundColor: "#fafafa",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            borderBottomColor: "#4467c9",
            paddingBottom: "1rem",
          },
          "& .MuiFilledInput-root": {
            paddingBottom: "0.5rem",
          },
          "& .MuiInputBase-root:hover": {
            backgroundColor: "#dbe4fc",
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

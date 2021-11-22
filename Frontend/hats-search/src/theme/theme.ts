import { createTheme } from "@mui/material";

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#1fad91",
      "100":
        "linear-gradient(90deg, rgba(0,0,0,0.8211659663865546) 0%, rgba(0,37,237,1) 0%, rgba(0,255,171,1) 100%)",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Source Sans Pro",
      fontSize: "1.25rem",
      color: "#3d3d3d",
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
        },
      },
    },
  },
});

export default themeOptions;

import { makeStyles } from "@mui/styles";
import themeOptions from "../../theme/theme";

export const cardStyles = makeStyles({
  root: {
    boxShadow: "4px 2px 20px -10px rgba(0,0,0,0.3)",
    textAlign: "left",
    "&:hover": {
      boxShadow: "8px 5px 22px -10px rgba(0,0,0,0.3)",
      backgroundColor: "#fafafa",
    },
  },
  title: {
    fontSize: "1.2rem",
    color: themeOptions.palette.primary.main,
  },
  annotation: {
    fontSize: "0.8rem",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    "&:visited": {
      color: themeOptions.palette.primary.main,
    },
  },
});

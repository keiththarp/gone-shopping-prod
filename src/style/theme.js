import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#ff0000",
    // },
    // secondary: {
    //   main: "#00ff00",
    // },
    disabled: {
      main: "#BDBDBD",
      hover: "#969694",
    },
  },
  overrides: {
    MuiLink: {
      root: {
        textDecoration: "none", // Remove underline
        color: "inherit", // Inherit text color
        "&:hover": {
          textDecoration: "underline", // Add underline on hover
        },
      },
    },
  },
});

export default theme;

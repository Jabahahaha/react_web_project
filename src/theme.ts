import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4fc3f7",
    },
    secondary: {
      main: "#ff7043",
    },
    background: {
      default: "#1a1a2e",
      paper: "#16213e",
    },
  },
  typography: {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    h4: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme

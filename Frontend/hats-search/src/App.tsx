import { ThemeProvider } from "@mui/material";
import "./App.css";
import RootView from "./components/RootView";
import SearchHome from "./components/SearchHome";
import themeOptions from "./theme/theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={themeOptions}>
        <RootView root={<SearchHome />} />
      </ThemeProvider>
    </div>
  );
}

export default App;

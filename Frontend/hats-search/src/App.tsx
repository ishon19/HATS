import { ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import Insights from "./components/molecules/Insights";
import RootView from "./components/RootView";
import SearchHome from "./components/SearchHome";
import SearchResults from "./components/SearchResults";
import themeOptions from "./theme/theme";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={themeOptions}>
          <HashRouter>
            <Routes>
              <Route
                path="/"
                element={<RootView root={<SearchHome />} hideFilter={true} />}
              />
              <Route
                path="/search"
                element={<RootView root={<SearchResults />} />}
              />
              <Route
                path="/insights"
                element={<RootView root={<Insights />} hideFilter={true} />}
              />
            </Routes>
          </HashRouter>
        </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;

import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import RootView from "./components/RootView";
import SearchHome from "./components/SearchHome";
import SearchResults from "./components/SearchResults";
import themeOptions from "./theme/theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={themeOptions}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<RootView root={<SearchHome />} />} />
            <Route
              path="/search"
              element={<RootView root={<SearchResults />} />}
            />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

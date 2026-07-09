/* eslint-disable react-refresh/only-export-components */
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router";
import App from "./App.jsx";
import { HostelHubProvider } from "./context/HostelHubContext";
import "./index.css";

const Router = import.meta.env.VITE_DATA_MODE === "local" ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <Router>
    <HostelHubProvider>
      <App />
    </HostelHubProvider>
  </Router>
);

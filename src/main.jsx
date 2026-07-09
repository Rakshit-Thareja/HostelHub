import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { HostelHubProvider } from "./context/HostelHubContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HostelHubProvider>
      <App />
    </HostelHubProvider>
  </BrowserRouter>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ContentAssistant from "./pages/ContentAssistant";
import AnalyticsDashboard from "./pages/Analytics";
import Login from "./pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App element={<Home />} />,
  },
  {
    path: "/content-assistant",
    element: <App element={<ContentAssistant />} />,
  },
  {
    path: "/analytics",
    element: <App element={<AnalyticsDashboard />} />,
  },
  {
    path: "/login",
    element: <App element={<Login />} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

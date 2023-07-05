import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./root";
import ErrorPage from "./error-page";
import Content from "./components/Content";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./styles/main.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Content />} />
        <Route path="/profile" element={<div>temp</div>} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

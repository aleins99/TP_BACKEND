import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Reserva from "./components/Reserva.jsx";
import GestionConsumo from "./components/GestionConsumo.jsx";
import AddCliente from "./components/AddCliente.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/reserva",
    element: <Reserva />,
  },
  {
    path: "/gestion",
    element: <GestionConsumo />,
  },
  {
    path: "/agregarCliente",
    element: <AddCliente />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

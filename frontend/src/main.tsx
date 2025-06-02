import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./components/CartContext"; // Importa el provider
import Root from "./routes/Root";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutUs from "./pages/AboutUs";
import Catalogo from "./pages/Catalogo";
import RegisterPage from "./pages/Register";

import PagoExitoso from "./pages/PagoExitoso";
import PagoFallido from "./pages/PagoFallido";
import PagoPendiente from "./pages/PagoPendiente";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "catalogo",
        element: <Catalogo />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
        path: "pago-exitoso",
        element: <PagoExitoso />,
      },
      {
        path: "pago-fallido",
        element: <PagoFallido />,
      },
      {
        path: "pago-pendiente",
        element: <PagoPendiente />,
      },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);

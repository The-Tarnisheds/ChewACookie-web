import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Root from "./routes/Root";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutUs from "./pages/AboutUs";
import Catalogo from "./pages/Catalogo";
import RegisterPage from "./pages/Register";
import PagoExitoso from "./pages/PagoExitoso";
import PagoFallido from "./pages/PagoFallido";
import PagoPendiente from "./pages/PagoPendiente";
import { AuthProvider } from "./components/AuthContext";
import Promotions from "./pages/Promotion";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Crud from "./pages/GestionProductos";

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
      {
        path: "promociones",
        element: <Promotions />,
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
        path: "perfil",
        element: <Profile />,
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
      {
        path: "admin-dashboard",
        element: <Dashboard />,
      },
      {
        path: "admin-crud",
        element: <Crud />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  //</React.StrictMode>
);

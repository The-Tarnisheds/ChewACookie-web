import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./components/CartContext"; // Importa el provider
import Root from "./routes/Root";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutUs from "./pages/AboutUs";

const router = createBrowserRouter([
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
    ],
  },
  {
    path: "login", // La ruta login sigue existiendo, pero el acceso es opcional
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);

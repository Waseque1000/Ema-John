import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./Components/Shop/Shop.jsx";
import Home from "./Components/Outlet/Home.jsx";
import Orders from "./Components/Orders/Orders.jsx";
import Inventory from "./Components/Inventory/Inventory.jsx";
import Login from "./Components/LogIn/Login.jsx";
import cartProductsLoader from "./CartProduct/CartProducts.js";
import Checkout from "./Components/Checkout/Checkout.jsx";
import Signup from "./Components/SignUp/Signup.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import PrivateRoute from "./Private Routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
      },
      {
        path: "orders",
        element: <Orders />,
        loader: cartProductsLoader,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

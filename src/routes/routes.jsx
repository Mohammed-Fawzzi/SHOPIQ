import React from "react";
import { createHashRouter } from "react-router-dom";
import {
  Layout,
  Home,
  Products,
  ProductDetails,
  Categories,
  Brands,
  WishList,
  Cart,
  AllOrders,
  UserProfile,
  ProtectedRoute,
  NotFound,
  Register,
  Login,
  ForgetPassword,
  VerifyCode,
  ResetPassword,
} from "@/constants";

export const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "verifyCode", element: <VerifyCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "userProfile", element: <UserProfile /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

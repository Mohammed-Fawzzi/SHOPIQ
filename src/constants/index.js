import React from "react";

export const Layout = React.lazy(() => import("@/components/Layout/Layout"));
export const ProtectedRoute = React.lazy(() =>
  import("@/components/ProtectedRoute/ProtectedRoute")
);

export const Home = React.lazy(() => import("@/pages/Home/Home"));
export const Products = React.lazy(() => import("@/pages/Products/Products"));
export const ProductDetails = React.lazy(() =>
  import("@/pages/ProductDetails/ProductDetails")
);
export const Categories = React.lazy(() =>
  import("@/pages/Categories/Categories")
);
export const Brands = React.lazy(() => import("@/pages/Brands/Brands"));
export const WishList = React.lazy(() => import("@/pages/WishList/WishList"));
export const Cart = React.lazy(() => import("@/pages/Cart/Cart"));
export const UserProfile = React.lazy(() =>
  import("@/pages/UserProfile/UserProfile")
);
export const NotFound = React.lazy(() => import("@/pages/NotFound/NotFound"));

export const Register = React.lazy(() => import("@/pages/Auth/Register"));
export const Login = React.lazy(() => import("@/pages/Auth/Login"));
export const ForgetPassword = React.lazy(() =>
  import("@/pages/Auth/ForgetPassword")
);
export const VerifyCode = React.lazy(() => import("@/pages/Auth/VerifyCode"));
export const ResetPassword = React.lazy(() =>
  import("@/pages/Auth/ResetPassword")
);

export * from "@/api/axiosInstance";
export * from "./navbar";
export * from "./footer";

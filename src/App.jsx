import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./Context/UserContext";
import { Offline, Online } from "react-detect-offline";

// Layout
const Layout = lazy(() => import("./Components/Layout/Layout"));

// Auth Components
const Register = lazy(() => import("./Components/Auth/Register"));
const Login = lazy(() => import("./Components/Auth/Login"));
const ForgetPassword = lazy(() => import("./Components/Auth/ForgetPassword"));
const VerifyCode = lazy(() => import("./Components/Auth/VerifyCode"));
const ResetPassword = lazy(() => import("./Components/Auth/ResetPassword"));

// Landing Pages
const Home = lazy(() => import("./Components/Home/Home"));
const Products = lazy(() => import("./Components/Products/Products"));
const ProductDetails = lazy(() =>
  import("./Components/ProductDetails/ProductDetails")
);
const Categories = lazy(() => import("./Components/Categories/Categories"));
const Brands = lazy(() => import("./Components/Brands/Brands"));
const WishList = lazy(() => import("./Components/WishList/WishList"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const UserProfile = lazy(() => import("./Components/UserProfile/UserProfile"));
const ProtectedRoute = lazy(() =>
  import("./Components/ProtectedRoute/ProtectedRoute")
);

// Not Found
const NotFound = lazy(() => import("./Components/NotFound/NotFound"));

// Loading Component
const Loading = lazy(() => import("./Components/Loading/Loading"));

function App() {
  const { setUserToken, setIsLogin } = useContext(UserContext);

  // State to manage network status display
  const [showNetworkStatus, setShowNetworkStatus] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Save Token to local storage
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
      setIsLogin(localStorage.getItem("userName"));
    }
  }, [setUserToken, setIsLogin]);

  // Handle network status changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNetworkStatus(true);
      setTimeout(() => setShowNetworkStatus(false), 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNetworkStatus(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const routes = createHashRouter([
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

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={routes} />
      </Suspense>
      {showNetworkStatus && (
        <div className="network-mood">
          {isOnline ? (
            <Online>Welcome back! You're online.</Online>
          ) : (
            <Offline>
              <i className="fas fa-wifi me-2"></i>Oops! You are offline
            </Offline>
          )}
        </div>
      )}
    </>
  );
}

export default App;

import React, { useState, useEffect, useContext, Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { UserContext } from "./Context/UserContext";
import { Offline, Online } from "react-detect-offline";
import Loading from "./Components/Loading/Loading";

// Lazy Loading
const Layout = lazy(() => import("./Components/Layout/Layout"));
const Home = lazy(() => import("./Components/Home/Home"));
const Products = lazy(() => import("./Components/Products/Products"));
const ProductDetails = lazy(() =>
  import("./Components/ProductDetails/ProductDetails")
);
const Categories = lazy(() => import("./Components/Categories/Categories"));
const Brands = lazy(() => import("./Components/Brands/Brands"));
const WishList = lazy(() => import("./Components/WishList/WishList"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Register = lazy(() => import("./Components/Register/Register"));
const Login = lazy(() => import("./Components/Login/Login"));
const UserProfile = lazy(() => import("./Components/UserProfile/UserProfile"));
const AllOrders = lazy(() => import("./Components/AllOrders/AllOrders"));
const ForgetPassword = lazy(() =>
  import("./Components/ForgetPassword/ForgetPassword")
);
const VerifyCode = lazy(() => import("./Components/VerifyCode/VerifyCode"));
const ResetPassword = lazy(() =>
  import("./Components/ResetPassword/ResetPassword")
);
const NotFound = lazy(() => import("./Components/NotFound/NotFound"));
const ProtectedRoute = lazy(() =>
  import("./Components/ProtectedRoute/ProtectedRoute")
);

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
      element: (
        <Suspense fallback={<Loading />}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "categories",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "brands",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <Brands />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "forgetPassword",
          element: (
            <Suspense fallback={<Loading />}>
              <ForgetPassword />
            </Suspense>
          ),
        },
        {
          path: "verifyCode",
          element: (
            <Suspense fallback={<Loading />}>
              <VerifyCode />
            </Suspense>
          ),
        },
        {
          path: "resetPassword",
          element: (
            <Suspense fallback={<Loading />}>
              <ResetPassword />
            </Suspense>
          ),
        },
        {
          path: "userProfile",
          element: (
            <Suspense fallback={<Loading />}>
              <UserProfile />
            </Suspense>
          ),
        },
        {
          path: "allorders",
          element: (
            <Suspense fallback={<Loading />}>
              <AllOrders />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
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

import React, { useState, useEffect, useContext, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { Offline, Online } from "react-detect-offline";
import { router } from "@/routes/routes";
import Loading from "@/components/common/ui/Loading";

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

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
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

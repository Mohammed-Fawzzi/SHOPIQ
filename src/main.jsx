import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import UserContextProvider from "@/context/UserContext.jsx";
import { Toaster } from "react-hot-toast";

// RouteMisr/Stripe returns /SHOPIQ/allorders (path), but app uses HashRouter → #/allorders
(() => {
  const { pathname, search, origin } = window.location;
  const normalizedPath = pathname.replace(/\/+/g, "/");
  const isAllOrdersPath = /\/allorders\/?$/i.test(normalizedPath);

  if (isAllOrdersPath && !window.location.hash.includes("/allorders")) {
    const base = import.meta.env.BASE_URL || "/";
    window.location.replace(`${origin}${base}#/allorders${search}`);
  }
})();

let queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <Toaster
        toastOptions={{
          position: "top-center",
          style: {
            marginTop: "70px",
          },
        }}
      />
      <App />
    </UserContextProvider>
  </QueryClientProvider>
);

import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.jsx";
import { ErrorProvider } from "./context/ErrorContext/index.jsx";
import { SmsProvider } from "./context/SmsContext/index.jsx";

createRoot(document.getElementById("root")).render(
  <ErrorProvider>
    <AuthProvider>
      <SmsProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </SmsProvider>
    </AuthProvider>
  </ErrorProvider>
);

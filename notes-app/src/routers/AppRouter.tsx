import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes ";
import { UserContext } from "../auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppRouter = () => {
  const [status, setStatus] = useState("no-authenticated");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.status === "authenticated") {
      toast.success("Te has logueado exitosamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [user?.status]);

  if (status === "checking")
    return <div className="loading">Checking credentials...</div>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          {user?.status === "authenticated" ? (
            <Route path="/home/*" element={<PrivateRoutes />} />
          ) : (
            <Route path="/*" element={<PublicRoutes />} />
          )}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
};

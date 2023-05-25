import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes ";
import { UserContext } from "../auth/AuthContext";

export const AppRouter = () => {
  const [status, setStatus] = useState("no-authenticated");
  const { user } = useContext(UserContext);

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
    </>
  );
};

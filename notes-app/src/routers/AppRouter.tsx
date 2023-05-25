import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes ";

export const AppRouter = () => {
  const [status, setStatus] = useState("no-authenticated");

  if (status === "checking") return <div className="loading">Checking credentials...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {status === "authenticated" ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

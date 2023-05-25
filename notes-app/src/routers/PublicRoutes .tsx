import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/Login";
import { RegisterUsers } from "../components/create-users/RegisterUsers";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<RegisterUsers />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { CreateNotePage } from "../components/create-notes/CreateNotes";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-notes/*" element={<CreateNotePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

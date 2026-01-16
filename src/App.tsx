import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./app/AppShell";
import Login from "./pages/Login";
import RegistroPage from "./features/registro/pages/RegistroPage";
import Recuperar from "./pages/Recuperar";

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<RegistroPage />} />
    <Route path="/recuperar" element={<Recuperar />} />
    <Route path="/" element={<AppShell />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;

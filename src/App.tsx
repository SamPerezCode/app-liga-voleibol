import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./app/AppShell";
import Login from "./pages/Login";
import RegistroPage from "./features/registro/pages/RegistroPage";
import Recuperar from "./pages/Recuperar";

const App = () => {
  const userId = localStorage.getItem("auth:userId");
  const isAuth = Boolean(userId);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route
        path="/"
        element={
          isAuth ? <AppShell /> : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./app/AppShell";
import Login from "./pages/Login";

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<AppShell />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;

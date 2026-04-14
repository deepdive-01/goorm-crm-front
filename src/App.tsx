import { Routes, Route } from "react-router-dom";
import ComponentExample from "./components/example/ComponentExample";
import Signup from "./pages/User/Auth/Signup/Signup";
import DashBoardPage from "./pages/Admin/DashBoardPage";
import Login from "./pages/User/Auth/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ComponentExample />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/reset-password"
        element={<div>비밀번호 재설정 페이지 (추후 구현)</div>}
      />
      <Route path="/admin/dashboard" element={<DashBoardPage />} />
    </Routes>
  );
}

export default App;

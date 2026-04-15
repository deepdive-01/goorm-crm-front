import { Routes, Route } from "react-router-dom";
import ComponentExample from "./components/example/ComponentExample";
import Signup from "./pages/User/Auth/Signup/Signup";
import DashBoardPage from "./pages/Admin/DashBoardPage";
import Login from "./pages/User/Auth/Login/Login";
import ResetPassword from "./pages/User/Auth/ResetPassword/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ComponentExample />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/admin/dashboard" element={<DashBoardPage />} />
    </Routes>
  );
}

export default App;

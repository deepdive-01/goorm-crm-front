import { Route, Routes } from "react-router-dom";
import ComponentExample from "../components/example/ComponentExample";
import Login from "../pages/User/Auth/Login/Login";
import Signup from "../pages/User/Auth/Signup/Signup";
import ResetPassword from "../pages/User/Auth/ResetPassword/ResetPassword";

const User = () => {
  return (
    <div>
      <Routes>
        {/* / -> 해당 라우트는 ComponentExample을 렌더링 */}
        <Route path="/" element={<ComponentExample />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default User;

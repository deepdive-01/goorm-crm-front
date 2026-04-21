import { Route, Routes } from "react-router-dom";
import Main from "../pages/User/Main/Main";
import Login from "../pages/User/Auth/Login/Login";
import Signup from "../pages/User/Auth/Signup/Signup";
import ResetPassword from "../pages/User/Auth/ResetPassword/ResetPassword";
import ProfileEdit from "../pages/User/MyPage/ProfileEdit/ProfileEdit";
import MyPage from "../pages/User/MyPage/MyPage";
import UserNav from "../pages/User/components/UserNav";

const User = () => {
  return (
    <div className="min-h-screen font-sans bg-white">
      <UserNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/profileEdit" element={<ProfileEdit />} />
      </Routes>
    </div>
  );
};

export default User;

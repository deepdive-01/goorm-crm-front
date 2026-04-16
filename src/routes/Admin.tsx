import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/Admin/DashBoardPage/DashBoardPage";
import MemberListPage from "../pages/Admin/MemberListPage/MemberListPage";
import MemberManagementPage from "../pages/Admin/ManagementPage/MemberManagementPage";
import AdminManagementPage from "../pages/Admin/ManagementPage/AdminManagementPage";
import GradeManagementPage from "../pages/Admin/ManagementPage/GradeManagementPage";
import AdminMyPage from "../pages/Admin/MyPage/AdminMyPage";

const Admin = () => {
  return (
    <div>
      <Routes>
        {/* admin/ -> DashBoardPage를 렌더링 */}
        <Route path="/" element={<DashBoardPage />} />
        {/* admin/members -> MemberListPage를 렌더링 */}
        <Route path="/members" element={<MemberListPage />} />
        <Route path="/member-management" element={<MemberManagementPage />} />
        <Route path="/admin-management" element={<AdminManagementPage />} />
        <Route path="/grade-management" element={<GradeManagementPage />} />
        <Route path="/my-page" element={<AdminMyPage />} />
      </Routes>
    </div>
  );
};

export default Admin;

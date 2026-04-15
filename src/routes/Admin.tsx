import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/Admin/DashBoardPage/DashBoardPage";
import MemberListPage from "../pages/Admin/MemberListPage/MemberListPage";
import MemberManagementPage from "../pages/Admin/ManagementPage/MemberManagementPage";
import AdminManagementPage from "../pages/Admin/ManagementPage/AdminManagementPage";

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
      </Routes>
    </div>
  );
};

export default Admin;

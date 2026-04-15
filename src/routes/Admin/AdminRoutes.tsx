import { Route } from "react-router-dom";
import DashBoardPage from "../../pages/Admin/DashBoardPage/DashBoardPage";
import MemberListPage from "../../pages/Admin/MemberListPage/MemberListPage";

// 관리자 페이지 라우트 정의
const AdminRoutes = [
  <Route key="dashboard" path="/admin/dashboard" element={<DashBoardPage />} />,
  <Route key="members" path="/admin/members" element={<MemberListPage />} />,
];

export default AdminRoutes;

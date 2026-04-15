import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/Admin/DashBoardPage/DashBoardPage";
import MemberListPage from "../pages/Admin/MemberListPage/MemberListPage";

const Admin = () => {
  return (
    <div>
      <Routes>
        {/* admin/ -> DashBoardPage를 렌더링 */}
        <Route path="/" element={<DashBoardPage />} />
        {/* admin/members -> MemberListPage를 렌더링 */}
        <Route path="/members" element={<MemberListPage />} />
      </Routes>
    </div>
  );
};

export default Admin;

import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/Admin/DashBoardPage";

const Admin = () => {
  return (
    <div>
      <Routes>
        {/* admin/ -> DashBoardPage를 렌더링 */}
        <Route path="/" element={<DashBoardPage />} />
      </Routes>
    </div>
  );
};

export default Admin;

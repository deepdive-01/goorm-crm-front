import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/Admin/DashBoardPage";

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashBoardPage />} />
      </Routes>
    </div>
  );
};

export default Admin;

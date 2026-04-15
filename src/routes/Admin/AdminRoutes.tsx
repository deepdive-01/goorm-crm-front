import { Route } from "react-router-dom";
import DashBoardPage from "../../pages/Admin/DashBoardPage/DashBoardPage";

export default function AdminRoutes() {
  return (
    <Route path="/admin">
      <Route path="dashboard" element={<DashBoardPage />} />
    </Route>
  );
}

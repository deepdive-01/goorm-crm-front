import { Routes, Route } from "react-router-dom";
import User from "./routes/User";
import Admin from "./routes/Admin";
import AdminGuard from "./components/common/AdminGuard/AdminGuard";

function App() {
  return (
    <Routes>
      {/* User 안에 있는 파일은 /의 경로로 시작 */}
      <Route path="/*" element={<User />} />

      {/* Admin 안에 있는 파일은 /admin의 경로로 시작 */}
      <Route
        path="/admin/*"
        element={
          <AdminGuard>
            <Admin />
          </AdminGuard>
        }
      />
    </Routes>
  );
}

export default App;

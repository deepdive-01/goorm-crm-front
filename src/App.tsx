import { Routes, Route } from "react-router-dom";
import User from "./routes/User";
import Admin from "./routes/Admin";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* User 안에 있는 파일은 /의 경로로 시작 */}
        <Route path="/*" element={<User />} />

        {/* Admin 안에 있는 파일은 /admin의 경로로 시작 */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import ComponentExample from "./components/example/ComponentExample";
import Signup from "./pages/User/Auth/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ComponentExample />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<div>로그인 페이지 (미구현)</div>} />
    </Routes>
  );
}

export default App;

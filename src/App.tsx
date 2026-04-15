import { Routes, Route } from "react-router-dom";
import User from "./routes/User";
import Admin from "./routes/Admin";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<User />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}

export default App;

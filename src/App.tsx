import { Routes, Route } from "react-router-dom";
import ComponentExample from "./components/Example/ComponentExample";
import Signup from "./pages/User/Auth/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ComponentExample />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;

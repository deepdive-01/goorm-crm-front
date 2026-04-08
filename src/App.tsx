import { Routes, Route } from "react-router-dom";
import VaporExample from "./VaporExample";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VaporExample />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import ComponentExample from "./components/ComponentExample";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ComponentExample />} />
    </Routes>
  );
}

export default App;

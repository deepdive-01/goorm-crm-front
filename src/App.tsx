import { Routes, Route } from "react-router-dom";
import InputExample from "./components/Example/InputExample";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InputExample />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Validate from "./Validation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/validate" element={<Validate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

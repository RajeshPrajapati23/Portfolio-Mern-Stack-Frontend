import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import LoginAdmin from "./admin/LoginAdmin";
import DashboardAdmin from "./admin/DashboardAdmin";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<DashboardAdmin />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

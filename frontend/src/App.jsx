import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import Sidebar from './components/Sidebar';
import Dash from './Pages/Dash';
import Projectspage from "./Pages/ProjectsPage";
import Taskspage from "./Pages/Taskspage";
import Project from './Pages/Project';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex h-screen">
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dash />} />
        <Route path="/ProjectsPage" element={<Projectspage />} />
        <Route path="/TasksPage" element={<Taskspage />} />
        {/* <Route path="/:Title" element={<Project />} /> */}
      </Routes>
    </div>
  );
}

export default App;

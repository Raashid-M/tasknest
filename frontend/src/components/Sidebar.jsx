import { Link, NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ Clear user data
    navigate("/login");              // ✅ Redirect to login
  };
  return (
    <nav className="sidebar flex flex-col gap-20 w-[280px] px-[10px] pb-5 bg-[#f9f9f9] shadow">
      <div className="logo flex items-center gap-[6px] mt-5 justify-center">
        {/* <i className="bi bi-stickies-fill text-[30px] text-orange-600"></i> */}
        <h2 className="text-3xl font-mono">Task-nest</h2>
      </div>

      <ul className="p-0 list-none text-lg">
        {[
          { label: "Dashboard", icon: "bi bi-grid-1x2-fill",path:'/Dashboard' },
          { label: "Projects", icon: "bi bi-collection-fill",path:'/ProjectsPage' },
          { label: "Tasks", icon: "bi bi-folder-fill",path:'/Taskspage' },
          { label: "Dump", icon: "bi bi-envelope-exclamation-fill",path:'Dump' },
        ].map((item, idx) => (
          <li
            className={`my-5  text-gray-800 bg-[#f9f9f9]`}
            key={item.label}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors duration-300 ${
                  isActive ? "bg-black text-white" : "hover:text-orange-600 hover:bg-[#f3f3f3]" 
                }`
              }
            >
              <i className={`${item.icon} text-[18px]`}></i>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
       {/* Bottom Section: Logout Button */}
      <button
        onClick={handleLogout}
        className="mx-3 mt-10 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
      >
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </nav>
  );
};

export default Sidebar;



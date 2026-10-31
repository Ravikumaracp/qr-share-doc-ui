import {
  LayoutDashboard,
  Files,
  QrCode,
  Settings,
  LogOut,
  Upload
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "My Documents",
      path: "/dashboard",
      icon: Files
    },
    {
      name: "QR Shares",
      path: "/dashboard",
      icon: QrCode
    }
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">QR</div>

        <div>
          <h2>QRShare</h2>
          <span>Secure sharing</span>
        </div>
      </div>

      <nav>

        <p className="menu-title">MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={
                location.pathname === item.path
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <Link to="/upload" className="sidebar-link">
          <Upload size={19} />
          <span>Upload Document</span>
        </Link>

        <p className="menu-title settings-title">ACCOUNT</p>

        <Link to="/dashboard" className="sidebar-link">
          <Settings size={19} />
          <span>Settings</span>
        </Link>

      </nav>

      <div className="sidebar-bottom">
        <button className="logout-button">
          <LogOut size={19} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
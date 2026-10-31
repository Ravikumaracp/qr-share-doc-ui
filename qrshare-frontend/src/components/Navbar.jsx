import { Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="mobile-logo">
        <div className="small-logo">QR</div>
        <span>QRShare</span>
      </div>

      <div className="navbar-right">
        <button className="icon-button">
          <Bell size={20} />
        </button>

        <div className="user-profile">
          <UserCircle size={32} />

          <div>
            <strong>Ravi Kumar</strong>
            <span>Free Account</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
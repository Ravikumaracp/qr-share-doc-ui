import "../App.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="logo-section">
          <div className="logo-icon">QR</div>

          <h1>QRShare</h1>

          <p>Secure document sharing made simple</p>
        </div>

        <form>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>
        </form>

        <div className="register-section">
          <p>
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
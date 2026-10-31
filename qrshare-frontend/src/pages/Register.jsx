import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="logo-section">
          <div className="logo-icon">QR</div>

          <h1>Create Account</h1>

          <p>Start sharing your documents securely</p>
        </div>

        <form>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Create Account
          </button>

        </form>

        <div className="register-section">
          <p>
            Already have an account?{" "}
            <Link to="/">Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;
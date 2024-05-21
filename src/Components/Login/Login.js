import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("buyer");

  const handleLogin = () => {
    // Perform login logic
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <Link to="/" className="text-primary text-decoration-none">
            <h3>Rentify</h3>
          </Link>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-3">Login</h2>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-sm py-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control form-control-sm py-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select form-select-sm py-2"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="buyer">Login as Buyer</option>
                    <option value="seller">Login as Seller</option>
                  </select>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm w-100 py-2"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

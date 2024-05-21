import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";



function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("buyer");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuth(true, userType, data.token);
        navigate("/");
      } else {
        console.error("Error signing up:", data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
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
              <h2 className="card-title text-center mb-3">Signup</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-sm py-2"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-sm py-2"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
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
                  <input
                    type="tel"
                    className="form-control form-control-sm py-2"
                    placeholder="Phone Number"
                    pattern="[6-9]{1}[0-9]{9}"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select form-select-sm py-2"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  >
                    <option value="buyer">Signup as Buyer</option>
                    <option value="seller">Signup as Seller</option>
                  </select>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm w-100 py-2"
                  type="submit"
                >
                  Signup
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

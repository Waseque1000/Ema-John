import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  // state
  const [error, setError] = useState("");
  // ? navigate
  const navigate = useNavigate();
  //
  const from = location.state?.from?.pathname || "/";

  const { logIn } = useContext(AuthContext);
  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password)
      .then((result) => {
        const loguser = result.user;
        console.log(loguser);
        form.reset();
        // navigate("/");
        navigate(from);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
    console.log(email, password);
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Log in</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            // onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            // value={password}
            // onChange={handlePasswordChange}
            required
          />
        </div>
        <span className="error">{error}</span>
        <button type="submit">Login</button>
        <p>
          New to Ema-john? <Link to={"/signup"}> Create New Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

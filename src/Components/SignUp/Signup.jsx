import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { AuthContext } from "../../Providers/AuthProvider";

const Signup = () => {
  // `
  const { createUser, num2 } = useContext(AuthContext);

  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    setError("");
    if (password !== confirmPassword) {
      setError("incorrect password");
      alert(" incorrect password");
      return;
    } else if (password.length < 6) {
      setError("Password must be 6 character");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const logedUser = result.user;
        console.log(logedUser);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    form.reset();
    console.log(email, password, confirmPassword);
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Enter your password"
            // value={password}
            // onChange={handlePasswordChange}
            required
          />
        </div>
        <p>
          {" "}
          <span className="error">{error}</span>{" "}
        </p>
        <button type="submit">Sign up</button>
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;

import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  // handleLogout
  const handleLogout = () => {
    logOut()
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="header">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="link">
        <Link to={"/"}> Shop</Link>
        <Link to={"/orders"}>Order</Link>
        <Link to={"/inventory"}> Inventory</Link>
        <Link to={"/login"}>Login </Link>
        <Link to={"/signup"}>Sign Up </Link>
        {user && (
          <span className="span">
            Welcome {user.email}{" "}
            <button onClick={handleLogout}>Sign Out</button>{" "}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;

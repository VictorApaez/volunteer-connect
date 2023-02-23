import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "../styles/Navbar.css";

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <div className="navbar">
      <h1 className="navbar__title">Volunteer Connect</h1>
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to="/" className="navbar__link">
            Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/about" className="navbar__link">
            About
          </Link>
        </li>
        {user ? (
          <>
            <li className="navbar__item">
              <Link to="/profile" className="navbar__link">
                {user.username}
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/login" className="navbar__link" onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="navbar__item">
              <Link to="/login" className="navbar__link">
                Login
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/signup" className="navbar__link">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

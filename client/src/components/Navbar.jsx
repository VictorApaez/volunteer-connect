import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navbar, Nav } from "react-bootstrap";

import "../styles/Navbar.css";

function Header() {
  const { user, setUser } = useContext(UserContext);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <Navbar expand="lg" className="navbar">
      <Navbar.Brand className="navbar__title">Volunteer Connect</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="navbar__link">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="navbar__link">
            About
          </Nav.Link>
        </Nav>
        {user ? (
          <Nav className="navbar__list">
            <Nav.Link as={Link} to="/profile" className="navbar__link">
              {user.username}
            </Nav.Link>
            <Nav.Link as={Link} to="/feed" className="navbar__link">
              Feed
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              className="navbar__link"
              onClick={logout}
            >
              Logout
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="navbar__list">
            <Nav.Link as={Link} to="/login" className="navbar__link">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" className="navbar__link">
              Sign Up
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

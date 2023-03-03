import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/Login.css";
import { UserContext } from "../context/userContext";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(UserContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validationErrors = {};
    if (!formData.username) {
      validationErrors.username = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await login(formData);
        if (response.success) {
          localStorage.setItem("token", response.token);
          setUser({ username: formData.username });
          navigate("/");
        } else {
          setErrors({ other: response.error });
        }
      } catch (err) {
        setErrors({
          username: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Login</h1>
        {errors.other && <div className="login__error">{errors.other}</div>}
        <div className="login__form-group">
          <label htmlFor="username" className="login__label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="login__input"
            placeholder="Type your username"
          />
          {errors.username && (
            <div className="login__error">{errors.username}</div>
          )}
        </div>
        <div className="login__form-group">
          <label htmlFor="password" className="login__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="login__input"
            placeholder="Type your password"
          />
          {errors.password && (
            <div className="login__error">{errors.password}</div>
          )}
        </div>
        <button type="submit" className="login__button">
          Login
        </button>
        <p className="login__signup">
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
